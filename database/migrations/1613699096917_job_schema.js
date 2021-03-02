'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.string('place', 90).notNullable()
      table.string('dependence', 90).notNullable()
      table.string('occupation', 90).notNullable()
      table.string('job', 90).notNullable()
      table.string('time_working_y', 90).notNullable()
      table.string('time_working_m', 90).notNullable()
      table.string('type', 90).notNullable()
      table.string('phone', 90)
      table.string('extension', 90)
      table.string('payroll', 90).notNullable()
      table.string('income', 90).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('jobs')
  }
}

module.exports = JobSchema
