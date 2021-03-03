'use strict'

class CreateClient {
  get rules() {
    return {
      'name': 'required',
      'first_last_name': 'required',
      'sec_last_name': 'required',
      'civil_status': 'required',
      'nacionality': 'required',
      'country': 'required',
      'state': 'required',
      'birth': 'required',
      'type_housing': 'required',
      'living_there_y': 'required',
      'living_there_m': 'required',
      'cellphone': 'required',
      'phone': 'required',
      'email': 'required',
      'contact_schedule': 'required',
      'rfc': 'required',
      'curp': 'required'
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

module.exports = CreateClient
