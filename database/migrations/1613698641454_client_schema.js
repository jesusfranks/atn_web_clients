'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80 ).notNullable()
      table.string('name2', 80 )
      table.string('first_last_name', 80).notNullable()
      table.string('sec_last_name', 80)
      table.string('gender', 10)
      table.string('civil_status', 80 ).notNullable()
      table.string('nacionality', 90).notNullable()
      table.string('country', 90).notNullable()
      table.string('state', 90).notNullable()
      table.string('birth', 90).notNullable()
      table.string('type_housing', 80 ).notNullable()
      table.string('living_there_y', 10 )
      table.string('living_there_m', 10 )
      table.string('cellphone', 11 ).notNullable()
      table.string('phone', 11 ).notNullable()
      table.string('email', 80 ).notNullable()
      table.string('contact_schedule', 80).notNullable()
      table.string('rfc', 80 ).notNullable()
      table.string('fiel', 90)
      table.string('curp', 80 ).notNullable()
      table.timestamps()
      //
    });
    this.raw("ALTER TABLE clients ADD FULLTEXT name_fulltext (name, name2, first_last_name, sec_last_name);")
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
