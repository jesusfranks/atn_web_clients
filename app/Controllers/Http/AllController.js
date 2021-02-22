'use strict'

const Client = use('App/Models/Client')

class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const adressC = await client.adress().fetch();
        const references = await client.references().fetch();
        if (job != null){
            const adressJ = await job.adress().fetch();
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, adressJ: adressJ, references: references.toJSON() });
        }else{
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, references: references.toJSON() });
        }
    }
}

module.exports = AllController
