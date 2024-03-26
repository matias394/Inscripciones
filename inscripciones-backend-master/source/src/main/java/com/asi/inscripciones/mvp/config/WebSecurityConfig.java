package com.asi.inscripciones.mvp.config;

import com.asi.inscripciones.mvp.filter.JwtAuthorizationFilter;
import com.asi.inscripciones.mvp.service.UsuarioDetalleService;
import com.asi.inscripciones.mvp.util.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(2)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${cors.url}")
    private String corsUrl;

    @Autowired
    private JwtAuthorizationFilter jwtAuthorizationFilter;

    @Autowired
    private UsuarioDetalleService myUserDetails;


    private static final String[] AUTH_WHITELIST = {
        "/api/formularios",
        "/authenticate",
        "/swagger-resources/**",
        "/swagger-ui/**",
        "/v3/api-docs",
        "/webjars/**"
    };
    

    @Override
    protected void configure( AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetails);
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
       web.ignoring().antMatchers("/swagger-ui/**", "/v3/api-docs/**");
    }

    
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        String[] rutas = {
            Url.API+Url.LOGIN+"/**",
            Url.API+Url.EXTERNO+"/**",
            Url.ACTUATOR+"/**"

            // Url.API+Url.FORMULARIO+"/**"
        };

        httpSecurity
            .headers().frameOptions().deny()
            .and()
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
            .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
            .requiresChannel(channel -> channel.anyRequest())
            .authorizeRequests()
            .antMatchers(rutas).permitAll()
            .anyRequest().authenticated();        
    }



    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configCors = new CorsConfiguration();
        configCors.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        String[] allowedOrigins = corsUrl.split(",");
        for (String origin : allowedOrigins) {
            origin = origin.trim();
            configCors.addAllowedOrigin(origin);
        }
        //configCors.addAllowedOriginPattern(corsUrl);
        configCors.addAllowedHeader("*");
        configCors.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configCors);
        return source;
    }
    
}
