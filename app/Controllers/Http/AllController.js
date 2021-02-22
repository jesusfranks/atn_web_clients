'use strict'

const Client = use('App/Models/Client')

class AllController {
    async getClient({ params, view }) {
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        return view.render('pages.clientInfo', { client: client, job: job });
    }
}

module.exports = AllController
