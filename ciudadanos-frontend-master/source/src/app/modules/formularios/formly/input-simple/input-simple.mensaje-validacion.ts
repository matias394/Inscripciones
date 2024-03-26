export function MininimoMensajeValidacion(err, field) {
    return `Longitud mínima requerida: ${field.templateOptions.minLength}`;
  }

  export function MaximoMensajeValidacion(err, field) {
    return `Longitud máxima permitida: ${field.templateOptions.maxLength}`;
  }

  export function InputCodigoHTMLNoValido(err, field) {
    return `No se permite el ingreso de caracteres especiales`;
  }
