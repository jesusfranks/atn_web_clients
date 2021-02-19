'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    credit() {
        return this.hasOne('App/Models/Credit')
    }
}

module.exports = Product
