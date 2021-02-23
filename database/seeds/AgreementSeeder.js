'use strict'

const Database = use('Database')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AgreementSeeder {
  async run () {
    const agreements = await Database.table('agreements').insert(
      [
        {
          "id" : "1",
          "factor": "2.50"
        },
        {
          "id" : "2",
          "factor" :  "3.00" 
        },
        {
          "id" :  "3" ,
          "factor" :  "3.50" 
        }
    ]
    );
    console.log(agreements)

    const products = await Database.table('products').insert(
      [
        
        {
          "id" : "1",
          "agreement_id" : "1",
          "promotion" : "AN0724",
          "cat" : "69.2",
          "tasa" : "60.99"
        },
        {
          "id" : "2",
          "agreement_id" : "1",
          "promotion" : "AN0736",
          "cat" : "67.2",
          "tasa" : "59.36"
        },
        {
          "id" : "3",
          "agreement_id" : "1",
          "promotion" : "AN0748",
          "cat" : "65.1",
          "tasa" : "57.68"
        },
        {
          "id" : "4",
          "agreement_id" : "1",
          "promotion" : "AN0772",
          "cat" : "61.2",
          "tasa" : "54.67"
        },
        {
          "id" : "5",
          "agreement_id" : "1",
          "promotion" : "AN0796",
          "cat" : "58.0",
          "tasa" : "52.23"
        },
        {
          "id" : "6",
          "agreement_id" : "2",
          "promotion" : "AN0124",
          "cat" : "86.1",
          "tasa" : "72.07"
        },
        {
          "id" : "7",
          "agreement_id" : "2",
          "promotion" : "AN0136",
          "cat" : "83.0",
          "tasa" : "69.79"
        },
        {
          "id" : "8",
          "agreement_id" : "2",
          "promotion" : "AN0148",
          "cat" : "79.8",
          "tasa" : "67.55"
        },
        {
          "id" : "9",
          "agreement_id" : "2",
          "promotion" : "AN0172",
          "cat" : "74.4",
          "tasa" : "63.71"
        },
        {
          "id" : "10",
          "agreement_id" : "2",
          "promotion" : "AN0196",
          "cat" : "70.1",
          "tasa" : "60.69"
        },
        {
          "id" : "11",
          "agreement_id" : "3",
          "promotion" : "AN0312",
          "cat" : "105.1",
          "tasa" : "84.59"
        },
        {
          "id" : "12",
          "agreement_id" : "3",
          "promotion" : "AN0324",
          "cat" : "102.2",
          "tasa" : "82.88"
        },
        {
          "id" : "13",
          "agreement_id" : "3",
          "promotion" : "AN0336",
          "cat" : "97.2",
          "tasa" : "79.89"
        },
        {
          "id" : "14",
          "agreement_id" : "3",
          "promotion" : "AN0348",
          "cat" : "92.6",
          "tasa" : "77.07"
        },
        {
          "id" : "15",
          "agreement_id" : "3",
          "promotion" : "AN0372",
          "cat" : "85.2",
          "tasa" : "72.40"
        }
    ]
    );
    console.log(products)
  }
}

module.exports = AgreementSeeder
