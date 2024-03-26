package ar.inscripcion.ciudadano.lectura.filter;


import com.asi.inscripcion.jwt.TokenService;
import io.quarkus.security.AuthenticationFailedException;
import io.quarkus.security.identity.IdentityProviderManager;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.request.AuthenticationRequest;
import io.quarkus.security.identity.request.TokenAuthenticationRequest;
import io.quarkus.security.runtime.QuarkusPrincipal;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.quarkus.vertx.http.runtime.security.ChallengeData;
import io.quarkus.vertx.http.runtime.security.HttpAuthenticationMechanism;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import java.util.Set;

@Priority(1)
@ApplicationScoped
public class BasicAuthenticationMechanism implements HttpAuthenticationMechanism {

    protected final Logger logger = Logger.getLogger(getClass());
    @Inject
    TokenService tokenService;

    @Override
    public Uni<SecurityIdentity> authenticate(RoutingContext context, IdentityProviderManager identityProviderManager) {

        logger.info("contex = " + context.request().path());

        String token = tokenService.getTokenHeader(context.request().getHeader("Authorization"));

        if(token==null){
            return Uni.createFrom().nullItem();
        } else {
            return authetication(token);
        }
    }

    @Override
    public Uni<ChallengeData> getChallenge(RoutingContext context) {
        // Retorna un desafío si la autenticación falla (por ejemplo, solicitar autenticación)
        return Uni.createFrom().item(new ChallengeData(401, "WWW-Authenticate", "Bearer"));
    }

    @Override
    public Set<Class<? extends AuthenticationRequest>> getCredentialTypes() {
        // Retorna los tipos de credenciales que tu mecanismo soporta
        return Set.of(TokenAuthenticationRequest.class);
    }


    private  Uni<SecurityIdentity> authetication(String token){

        if (tokenService.validate(token)) {

            QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder();

            builder.setPrincipal(new QuarkusPrincipal(tokenService.getUserFromToken(token)));
            builder.addRole("rol1");

            SecurityIdentity securityIdentity = builder.build();
            return Uni.createFrom().item(securityIdentity);
        } else {
            throw new AuthenticationFailedException();
        }
    }
}
