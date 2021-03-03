'use strict'

const Client = use('App/Models/Client')
const Database = use('Database')


class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const bank = await client.bank().fetch();
        const adressC = await client.adress().fetch();
        const references = await client.references().fetch();
        if (job != null) {
            const adressJ = await job.adress().fetch();
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, adressJ: adressJ, references: references.toJSON(), bank: bank });
        } else {
            return view.render('pages.clientInfo', { client: client, job: job, adressC: adressC, references: references.toJSON(), bank: bank });
        }
    }
    async getCredit({ params, view }) {
        const client = await Client.find(params.id);
        const credit = await client.credit().fetch();
        return view.render('pages.creditClientInfo', { client: client, credit: credit });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////// API

    async getClientJSON({ params, response }) {
        const client = await Client.find(params.id);
        const adressC = await client.adress().fetch();
        const job = await client.job().fetch();
        const adressJ = await job.adress().fetch();
        const references = await client.references().fetch();
        const credit = await client.credit().fetch();
        const bank = await client.bank().fetch();
        const producttt = await Database.raw(`SELECT products.id, products.promotion, products.term, products.cat, products.tasa, agreements.factor FROM products INNER JOIN credits ON products.id = ${credit.product_id} INNER JOIN agreements ON agreement_id = agreements.id`);
        const productt = JSON.parse(JSON.stringify(producttt));
        const [id] = productt[0];
        const {promotion, term, cat, tasa, factor} = id;
        const product = {
            promotion,
            term,
            cat,
            tasa,
            factor
        }
        const clientJSON = {
            client,
            adressC,
            job,
            adressJ,
            references,
            credit,
            product,
            bank
        };
        return response.json(clientJSON);
    }
}

module.exports = AllController
