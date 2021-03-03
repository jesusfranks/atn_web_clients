'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankSchema extends Schema {
  up () {
    this.create('banks', (table) => {
      table.increments()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.string('clabe', 90).notNullable()
      table.string('bank', 90).notNullable()
      table.string('account', 90)
      table.timestamps()
    })
  }

  down () {
    this.drop('banks')
  }
}

module.exports = BankSchema
