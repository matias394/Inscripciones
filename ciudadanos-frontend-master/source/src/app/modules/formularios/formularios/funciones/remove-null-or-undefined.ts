export function removeNullOrUndefined(obj: object) {
  return Object.keys(obj).reduce((_obj, key) => {
    // salteamos la propiedad
    if (obj[key] == null) { return _obj; }

    // chequeamos los subobjetos
    if (typeof (obj[key]) === 'object' && !Array.isArray(obj[key])) {
      _obj[key] = removeNullOrUndefined(obj[key]);
    } else {
      _obj[key] = obj[key];
    }

    return _obj;
  }, {});
}
