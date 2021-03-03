'use strict'

const Database = use('Database')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ClientSeeder {
  async run () {
    
    const client = await Database.table('clients').insert(
        [
            {
                "id": '1',
                "user_id": '1',
                "name": "LAURA",
                "name2": "NELLY",
                "first_last_name": "ESPARZA",
                "sec_last_name": "TORRES",
                "gender": "F",
                "civil_status": "CASADA",
                "nacionality": "MEXICANA",
                "country": "MEXICO",
                "state": "HIDALGO",
                "birth": "1969-11-22",
                "type_housing": "RENTA",
                "living_there_y": "13",
                "living_there_m": "6",
                "cellphone": "5566998877",
                "phone": "7788994455",
                "email": "lnellyet@gmail.com",
                "contact_schedule": "TODO EL DIA",
                "rfc": "QAWSEDRFTGYHU",
                "curp": "QAWSEDRFTGYHUJIKOL"
            }
      ]
      );
      const job = await Database.table('jobs').insert(
        [
            {
                "id": '1',
                "client_id": '1',
                "place": "TELESECURNDARIA 23K",
                "dependence": "SECRETARIA DE EDUCACION PUBLICA",
                "occupation": "DOCENTE",
                "job": "DOCENTE",
                "time_working_y": "25",
                "time_working_m": "0",
                "type": "B",
                "phone": "4455886633",
                "payroll": "NOMINA1234",
                "income": "15000"
            }
      ]
      );
      const adress = await Database.table('adresses').insert(
        [
            {
                "id": '1',
                "client_id": '1',
                "street": "SANTA MATILDE",
                "number": "534",
                "suburb": "SANTA MATILDE",
                "crosses": "SAN CHISPITO Y SAN ALEJANDRO",
                "state": "HIDALGO",
                "town": "ZEMPOALA",
                "contry": "MEXICO",
                "postal_code": "43845"
            },
            {
                "id": '2',
                "job_id": '1',
                "street": "LEY AGRARIA",
                "number": "10",
                "suburb": "MATILDE",
                "crosses": "NO TIENE",
                "state": "HIDALGO",
                "town": "PACHUCA DE SOTO",
                "contry": "MEXICO",
                "postal_code": "42084"
            }
      ]
      );
      const reference = await Database.table('references').insert(
        [
            {
                "id": '1',
                "client_id": '1',
                "name": "JESUS",
                "name2": "FRANISCO",
                "first_last_name": "GARCIA",
                "sec_last_name": "MOLAR",
                "nacionality": "MEXICANA",
                "birth": "52",
                "phone": "7788996655",
                "relationship": "CONYUGE",
                "known": "30",
                "status": '1'
            },
            {
                "id": '2',
                "client_id": '1',
                "name": "JUAN",
                "name2": "ANTONIO",
                "first_last_name": "LOPEZ",
                "sec_last_name": "HERNANDEZ",
                "nacionality": "MEXICANA",
                "birth": "30",
                "phone": "1234567890",
                "relationship": "AMISTAD",
                "known": "5",
                "status": '1'
            },
            {
                "id": '3',
                "client_id": '1',
                "name": "MARIA",
                "name2": "JULIETA",
                "first_last_name": "TORRES",
                "sec_last_name": "SANCHEZ",
                "nacionality": "MEXICANA",
                "birth": "33",
                "phone": "1234567891",
                "relationship": "FAMILIAR",
                "known": "40",
                "status": '1'
            }
      ]
      );

      const credit = await Database.table('credits').insert(
        [
            {
                "id": '4',
                "client_id": '1',
                "product_id": '1',
                "promotor_code": "1234567",
                "promotor_name": "JESUS FRANCISCO GARCIA ESPARZA",
                "branch_office": "ATN000",
                "amount": "3000",
                "disposing": "Orden de pago",
                "debt": "Propia",
                "city": "PACHUCA DE SOTO, HIDALGO",
                "date": "2021-03-02",
                "destination": "Pago de deuda",
                "periodicity": "Quincenal",
                "question": "NO",
                "status": '1'
            }
      ]
      );

      const bank = await Database.table('banks').insert(
        [
            {
                "id": '1',
                "client_id": '1',
                "clabe": "123456789123456780",
                "bank": "BANAMEX",
                "account": "1230123012"
            }
      ]
      );
      

  }
}

module.exports = ClientSeeder
