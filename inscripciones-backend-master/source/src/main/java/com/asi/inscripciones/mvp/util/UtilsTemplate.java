package com.asi.inscripciones.mvp.util;

import java.util.Locale;

public class UtilsTemplate {
    
    public static String getTokenWithoutBearer(String token){
        return token.toUpperCase(Locale.ROOT).contains("BEARER")?
                token.substring(7): token;
    }
}
