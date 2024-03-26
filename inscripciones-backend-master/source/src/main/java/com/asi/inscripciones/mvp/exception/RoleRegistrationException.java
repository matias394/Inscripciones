package com.asi.inscripciones.mvp.exception;


public class RoleRegistrationException extends RuntimeException {
    public RoleRegistrationException(String message) {
        super(message);
    }

    public RoleRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
