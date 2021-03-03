'use strict'

class CreateReference {
  get rules() {
    return {
        'name': 'required',
        'first_last_name': 'required',
        'sec_last_name': 'required',
        'phone': 'required',
        'relationship': 'required',
        'known': 'required',
        'status': 'required'
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

module.exports = CreateReference
