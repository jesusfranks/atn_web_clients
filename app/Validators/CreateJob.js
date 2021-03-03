'use strict'

class CreateJob {
  get rules() {
    return {
      'place': 'required',
      'dependence': 'required',
      'occupation': 'required',
      'job': 'required',
      'time_working_y': 'required',
      'time_working_m': 'required',
      'type': 'required',
      'payroll': 'required',
      'income': 'required'
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

module.exports = CreateJob
