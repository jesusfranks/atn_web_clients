'use strict'

class CreateCredit {
  get rules() {
    return {
      'promotor_code': 'required',
      'promotor_name': 'required',
      'branch_office': 'required',
      'amount': 'required',
      'disposing': 'required',
      'debt': 'required',
      'city': 'required',
      'date': 'required',
      'destination': 'required',
      'periodicity': 'required'
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

module.exports = CreateCredit
