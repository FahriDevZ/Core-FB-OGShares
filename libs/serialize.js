'use strict';

class Serialize {

  constructor() {
    this.session = [];
  }

  add(key, value) {
    value = typeof value === 'function' ? value() : value;
    value = value === null ? '' : value === undefined ? '' : value;
    this.session[this.session.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }

  build(prefix, obj) {

    let index = 0,
      length = 0,
      key = null;

    if (prefix) {
      if (Array.isArray(obj)) {
        for (index = 0, length = obj.length; index < length; index++) {
          this.build(
            prefix + '[' + (typeof obj[index] === 'object' && obj[index] ? index : '') + ']',
            obj[index]
          );
        }
      }
      else if (String(obj) === '[object Object]') {
        for (key in obj) {
          this.build(prefix + '[' + key + ']', obj[key]);
        }
      }
      else {
        this.add(prefix, obj);
      }
    }
    else if (Array.isArray(obj)) {
      for (index = 0, length = obj.length; index < length; index++) {
        this.add(obj[index].name, obj[index].value);
      }
    }
    else {
      for (key in obj) {
        this.build(key, obj[key]);
      }
    }

    return this.session;
  }

}

module.exports = function(parameter) {
  const serialize = new Serialize();
  return serialize.build('', parameter).join('&');
};