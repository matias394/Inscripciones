package com.asi.inscripciones.mvp.service;

import com.asi.inscripciones.mvp.entity.Usuario;
import com.asi.inscripciones.mvp.exception.GenericException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import static com.asi.inscripciones.mvp.util.UtilsTemplate.getTokenWithoutBearer;

@Service
@Log4j2
@RequiredArgsConstructor
public class TokenService {


	@Value("${jwt.token.secret}")
    private String jwtSecret;

    @Value("${jwt.token.timeValidation}")
    private Long timeValidation;

    @Value("${jwt.token.nameApplication}")
    private String nameApplication;


	

	public String generateToken(Usuario usuario,  Map<String, Object> claims_) {

		byte[] keyBytes = jwtSecret.getBytes();
		Key key = Keys.hmacShaKeyFor(keyBytes);
        
		Map<String, Object> claims = new HashMap<>();
        if( claims_ != null )
            claims = claims_;

        claims.put("usuario", usuario.getId());
        claims.put("username", usuario.getCuil());
        claims.put("nombre", usuario.getNombre() + " " + usuario.getApellido());
        claims.put("timeValidation", timeValidation);

       return
         Jwts.builder()
                .setClaims(claims)
                .setId(nameApplication)
                .setSubject(usuario.getCuil())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + timeValidation * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

    }


	public void validate(String token) {

        try {

			Jwts.parserBuilder().setSigningKey(jwtSecret.getBytes()).build().parseClaimsJws(token);

        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token - {}", ex.getMessage());
            throw new GenericException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token - {}");
            throw new GenericException("Expired JWT token - {}"+ ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token - {}", ex.getMessage());
            throw new GenericException("Unsupported JWT token - {}"+ ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty - {}", ex.getMessage());
            throw new GenericException("JWT claims string is empty - {}"+ ex.getMessage());
        }
    }


	public String getUserFromHeaderToken(){
		return getClaimFromToken(getTokenHeader(), Claims::getSubject);
	}
	
	public String getTokenHeader() {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        return getTokenWithoutBearer(request.getHeader("Authorization") );
    }

	

	private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret.getBytes())
                .parseClaimsJws(token)//Valida el token
                .getBody();
    }

    

    public String getUserFromToken(String token){
        return getClaimFromToken(token, Claims::getSubject);
    }



    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }


    
}
