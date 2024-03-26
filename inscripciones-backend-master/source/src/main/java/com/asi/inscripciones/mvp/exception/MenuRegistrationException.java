package com.asi.inscripciones.mvp.exception;


public class MenuRegistrationException extends RuntimeException {
    public MenuRegistrationException(String message) {
        super(message);
    }

    public MenuRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
