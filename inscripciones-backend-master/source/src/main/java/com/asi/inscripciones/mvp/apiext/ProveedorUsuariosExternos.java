package com.asi.inscripciones.mvp.apiext;

import com.asi.inscripciones.mvp.entity.Usuario;

public abstract class ProveedorUsuariosExternos {
    
    public abstract Usuario getUser(String username);

    public abstract void getStatus();

    public abstract void authenticate(String username, String password);
    
}
