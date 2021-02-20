'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('first_last_name', 80).notNullable()
      table.string('sec_last_name', 80)
      table.string('password', 60).notNullable()
      table.string('code', 80)
      table.boolean('promotor').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
