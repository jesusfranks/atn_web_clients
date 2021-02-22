'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Credit extends Model {
    Client() {
        return this.belongsTo('App/Models/Credit')
    }
}

module.exports = Credit
