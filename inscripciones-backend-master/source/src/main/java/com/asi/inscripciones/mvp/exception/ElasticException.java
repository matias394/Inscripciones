package com.asi.inscripciones.mvp.exception;

public class ElasticException extends RuntimeException {
    public ElasticException(String message) {
        super(message);
    }

    public ElasticException(String message, Throwable cause) {
        super(message, cause);
    }
}
