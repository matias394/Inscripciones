package com.asi.inscripciones.mvp.exception;

public enum CodigoError {

    E001("E001", "El usuario esta inactivo en el sistema"),
    E002("E002", "Un elemento para agregar no puede llevar ID"),
    E003("E003", "AD: Fallo Autenticacion de Usuario"),
    E004("E004", "AD: Error al obtener información del usuario."),
    E005("E005", "AD: No se tiene respuesta del servicio de autenticación."),
    E006("E006", "No existe feridao"),
    E007("E007", "No existe cuposGrupales"),
    E008("E008", "No existe loginMiba"),
    E009("E009", "No existe cantidadMaxima"),
    E010("E010", "No existe limiteInscripcion"),
    E011("E011", "No existe duracionSemana"),
    E012("E012", "No existe cuposInscripcion"),
    E013("E013", "No existe nombre"),
    E014("E014", "No existe vigenciaDesde"),
    E015("E015", "No existe vigenciaHasta"),
    E016("E016", "No existe organismo"),
    E017("E017", "No existe sede"),
    E018("E018", "No existe correo"),
    E019("E019", "No existe notificacion"),
    E020("E020", "No existe modalidad"),
    E021("E021", "No existe tipo"),
    E022("E022", "No existe estado"),
    E023("E023", "No existe lunes"),
    E024("E024", "No existe martes"),
    E025("E025", "No existe miercoles"),
    E026("E026", "No existe jueves"),
    E027("E027", "No existe viernes"),
    E028("E028", "No existe sabado"),
    E029("E029", "No existe domingo"),
    E030("E030", "No existe horaInicio"),
    E031("E031", "No existe horaFin"),
    E032("E032", "No existe fechaInicio"),
    E033("E033", "No existe fechaFin"),
    E034("E034", "No existe usuario"),
    E035("E035", "Fechas no correspondientes"),
    E036("E036", "Not Found"),
    E037("E037", "Campo Vacio"),
    E038("E038", "Fallo Autenticacion de Usuario"),
    E039("E039","El usuario ha sido bloqueado por sobrepasar la cantidad de intentos"),
    E040("E040", "Usuario no existente en la Base de Datos"),
    E041("E041", "Existen usuarios o inscripciones vigentes asociados a esta categoría");

    ;

    private String mensaje;
    private String codigo;
 
    CodigoError(String codigo, String mensaje) {
        this.mensaje = mensaje;
        this.codigo = codigo;
    }
 
    public String getMensaje() {
        return this.mensaje;
    }
    public String getCodigo() {
        return this.codigo;
    }
}
