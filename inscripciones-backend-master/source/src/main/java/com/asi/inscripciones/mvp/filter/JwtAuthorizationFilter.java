package com.asi.inscripciones.mvp.filter;

import com.asi.inscripciones.mvp.exception.GenericException;
import com.asi.inscripciones.mvp.service.TokenService;
import com.asi.inscripciones.mvp.service.UsuarioDetalleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;


    @Autowired
    private UsuarioDetalleService myUserDetails;


    private UserDetails userAuthenticated;




    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
        throws ServletException, IOException {

        try{
            String requestTokenHeader = request.getHeader("Authorization");
            if( StringUtils.isNotBlank(requestTokenHeader)){
                setUserAuthenticated(request);
                setAuthorization(request);
            }

        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
            logger.warn(ex.getMessage(), ex);
        }

        filterChain.doFilter(request, response);
        
    }


    private void setUserAuthenticated(HttpServletRequest request){
        String username = tokenService.getUserFromToken(getTokenFromRequest(request));
        userAuthenticated = myUserDetails.loadUserByUsername(username);
    }


    private void setAuthorization(HttpServletRequest request){
        if (  SecurityContextHolder.getContext().getAuthentication() == null) {

            UsernamePasswordAuthenticationToken authorizationUser = new UsernamePasswordAuthenticationToken(userAuthenticated, null, userAuthenticated.getAuthorities());

            authorizationUser.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authorizationUser);
        }
    }


    private String getTokenFromRequest(HttpServletRequest request){
        final String requestTokenHeader = request.getHeader("Authorization");

        if ( requestTokenHeader == null  || !requestTokenHeader.startsWith("Bearer "))
            throw new GenericException("JWT Token does not begin with Bearer String");

        return request.getHeader("Authorization").substring(7);
    }

}
