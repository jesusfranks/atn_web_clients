'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80 ).notNullable()
      table.string('first_last_name', 80).notNullable()
      table.string('sec_last_name', 80)
      table.string('civil_status', 80 ).notNullable()
      table.string('nacionality', 90).notNullable()
      table.string('birth', 90).notNullable()
      table.string('type_housing', 80 ).notNullable()
      table.string('living_there', 80 ).notNullable()
      table.string('cellphone', 80 ).notNullable()
      table.string('phone', 80 ).notNullable()
      table.string('email', 80 ).notNullable()
      table.string('contact_schedule', 80).notNullable()
      table.string('rfc', 80 ).notNullable()
      table.string('curp', 80 ).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
