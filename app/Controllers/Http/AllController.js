'use strict'

const Client = use('App/Models/Client')
const Job = use('App/Models/Job')

class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const adressC = await client.adress().fetch();
        const adressJ = await job.adress().fetch();
        return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, adressJ: adressJ });
    }
}

module.exports = AllController
