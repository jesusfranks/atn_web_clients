'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreditSchema extends Schema {
  up () {
    this.create('credits', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.string('promotor_code', 90).notNullable()
      table.string('promotor_name', 254).notNullable()
      table.string('branch_office', 90).notNullable()
      table.string('amount', 90).notNullable()
      table.string('disposing', 90).notNullable()
      table.string('debt', 90).notNullable()
      table.string('city', 90).notNullable()
      table.string('date', 90).notNullable()
      table.string('destination', 90).notNullable()
      table.string('periodicity', 90).notNullable()
      table.string('question', 90)
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('credits')
  }
}

module.exports = CreditSchema
