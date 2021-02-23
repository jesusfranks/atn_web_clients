'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgreementSchema extends Schema {
  up () {
    this.create('agreements', (table) => {
      table.increments()
      table.string('factor', 10).notNullable()
    })
  }

  down () {
    this.drop('agreements')
  }
}

module.exports = AgreementSchema
