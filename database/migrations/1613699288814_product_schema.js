'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.integer('agreement_id').unsigned().references('id').inTable('agreements')
      table.string('promotion', 9).notNullable()
      table.string('term', 9).notNullable()
      table.string('cat', 9).notNullable()
      table.string('tasa', 9).notNullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
