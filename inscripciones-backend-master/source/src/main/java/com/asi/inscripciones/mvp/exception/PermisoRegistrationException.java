package com.asi.inscripciones.mvp.exception;


public class PermisoRegistrationException extends RuntimeException {
    public PermisoRegistrationException(String message) {
        super(message);
    }

    public PermisoRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
