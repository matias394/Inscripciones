package com.asi.inscripciones.mvp.exception;


public class UsuarioRegistrationException extends RuntimeException {
    public UsuarioRegistrationException(String message) {
        super(message);
    }

    public UsuarioRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
