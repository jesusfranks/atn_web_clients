'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
    references() {
        return this.hasMany('App/Models/Reference')
    }
    job() {
        return this.hasOne('App/Models/Job')
    }
    adress() {
        return this.hasOne('App/Models/Adress')
    }
    bank() {
        return this.hasOne('App/Models/Bank')
    }
    credit() {
        return this.hasOne('App/Models/Credit')
    }
}

module.exports = Client
