'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agreement extends Model {
    product() {
        return this.hasOne('App/Models/Product')
    }
}

module.exports = Agreement
