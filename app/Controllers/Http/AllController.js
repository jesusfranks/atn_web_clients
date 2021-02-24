'use strict'

const Client = use('App/Models/Client')
const Credit = use('App/Models/Credit')

class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const bank = await client.bank().fetch();
        const adressC = await client.adress().fetch();
        const references = await client.references().fetch();
        if (job != null){
            const adressJ = await job.adress().fetch();
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, adressJ: adressJ, references: references.toJSON(), bank: bank });
        }else{
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, references: references.toJSON(), bank: bank });
        }
    }
    async getCredit({ params, view }) {
        const client = await Client.find(params.id);
        const credit  = await client.credit().fetch();
        return view.render('pages.creditClientInfo', { client: client, credit: credit });
    }
}

module.exports = AllController
