'use strict'

class CreateBank {
  get rules() {
    return {
      'clabe': 'required',
      'bank': 'required',
      'arrangement': 'required',
      'account': 'required'
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

module.exports = CreateBank
