package com.asi.inscripciones.mvp.exception;

public class GenericException extends RuntimeException{

    private String codigoError;

    public GenericException() {
        super();
    }

    public GenericException(String message) {
        super(message);
    }

    public GenericException(String codigoError, String message) {
        super(message);
        this.codigoError = codigoError;
    }


    public String getCodigoError() {
        return this.codigoError;
    }

}