package com.asi.inscripciones.mvp.util;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;

import java.util.Date;

@Log4j2
public class PruebasTest {

    @Test
    public void main(){
        System.out.println("probando");
        System.out.println(new Date(System.currentTimeMillis()));
    }

}
