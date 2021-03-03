'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferenceSchema extends Schema {
  up () {
    this.create('references', (table) => {
      table.increments()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.string('name', 80 ).notNullable()
      table.string('name2', 80 )
      table.string('first_last_name', 80).notNullable()
      table.string('sec_last_name', 80)
      table.string('nacionality', 90)
      table.string('birth', 90)
      table.string('phone', 90).notNullable()
      table.string('relationship', 90).notNullable()
      table.string('known', 90).notNullable()
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('references')
  }
}

module.exports = ReferenceSchema
