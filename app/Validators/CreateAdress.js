'use strict'

class CreateAdress {
  get rules() {
    return {
        'street': 'required',
        'number': 'required',
        'suburb': 'required',
        'crosses': 'required',
        'state': 'required',
        'town': 'required',
        'contry': 'required'
    }
  }

get messages() {
  return {
    'required': 'Espera {{ field }} es Necesario.',
    'unique': 'Espera un segundo, el {{ field }} ya existe'
  }
}

async fails(error) {
  this.ctx.session.withErrors(error)
    .flashAll();

  return this.ctx.response.redirect('back');
}
}

module.exports = CreateAdress
