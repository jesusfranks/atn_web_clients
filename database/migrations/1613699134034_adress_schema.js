'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressSchema extends Schema {
  up () {
    this.create('adresses', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('job_id').unsigned().references('id').inTable('jobs')
      table.string('street', 90).notNullable()
      table.string('number', 90).notNullable()
      table.string('int_number', 90)
      table.string('suburb', 90).notNullable()
      table.string('crosses', 90)
      table.string('state', 90).notNullable()
      table.string('town', 90).notNullable()
      table.string('contry', 90).notNullable()
      table.string('postal_code', 90)
      table.timestamps()
    })
  }

  down () {
    this.drop('adresses')
  }
}

module.exports = AdressSchema
