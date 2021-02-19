'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreditSchema extends Schema {
  up () {
    this.create('credits', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('promotor_code').notNullable()
      table.string('promotor_name').notNullable()
      table.string('branch_office', 90).notNullable()
      table.string('amount', 90).notNullable()
      table.string('reference', 90)
      table.string('disposing', 90).notNullable()
      table.string('debt', 90).notNullable()
      table.string('date', 90).notNullable()
      table.string('product', 90).notNullable()
      table.string('agreement', 90).notNullable()
      table.string('destination', 90).notNullable()
      table.string('periodicity', 90).notNullable()
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('credits')
  }
}

module.exports = CreditSchema
