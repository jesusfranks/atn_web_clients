'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {
    adress() {
        return this.hasOne('App/Models/Adress')
    }
}

module.exports = Job
