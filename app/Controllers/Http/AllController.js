'use strict'

const Client = use('App/Models/Client')

class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const adressC = await client.adress().fetch();
        if (job != null){
            const adressJ = await job.adress().fetch();
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, adressJ: adressJ });
        }else{
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC });
        }
    }
}

module.exports = AllController
