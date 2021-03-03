'use strict'

const Client = use('App/Models/Client')
const Reference = use('App/Models/Reference')
const Database = use('Database')


class ClientController {

    async index({ auth, view }) {
        const user = await auth.getUser();
        if (user.promotor) {
            const clients = await user.clients().fetch();
            return view.render('pages.clientsPage', { clients: clients.toJSON() })
        } else {
            const clients = await Client.all();
            return view.render('pages.clientsPage', { clients: clients.toJSON() })
        }
    }
    async indexSearch({ request, auth, view }) {
        const user = await auth.getUser();
        const { search } = request.all();
        if (user.promotor) {
            const cliensss = await Database.raw(`SELECT * FROM clients WHERE MATCH(name, name2, first_last_name, sec_last_name) AGAINST ("*${search}" IN BOOLEAN MODE) AND clients.user_id = ${user.id}`);
            const clients = JSON.parse(JSON.stringify(cliensss))
            return view.render('pages.clientsPage', { clients: clients[0] })
        } else {
            const cliensss = await Database.raw(`SELECT * FROM clients WHERE MATCH(name, name2, first_last_name, sec_last_name) AGAINST ("*${search}" IN BOOLEAN MODE)`);
            const clients = JSON.parse(JSON.stringify(cliensss))
            return view.render('pages.clientsPage', { clients: clients[0] })
        }
    }

    async redirectForm({ view }) {
        return view.render('pages.clientsForm');
    }

    async create({ auth, request, session, response }) {
        const user = await auth.getUser();
        const {
            name,
            name2,
            first_last_name,
            sec_last_name,
            civil_status,
            nacionality,
            country,
            state,
            gender,
            fiel,
            birth,
            type_housing,
            living_there_y,
            living_there_m,
            email,
            cellphone,
            phone,
            contact_schedule,
            rfc,
            curp
        } = request.all();
        const client = new Client();
        client.fill({
            name,
            name2,
            first_last_name,
            sec_last_name,
            civil_status,
            nacionality,
            country,
            state,
            gender,
            fiel,
            birth,
            type_housing,
            living_there_y,
            living_there_m,
            email,
            cellphone,
            phone,
            contact_schedule,
            rfc,
            curp
        });
        await user.clients().save(client);
        session.flash({ message: 'Se ha creado nuevo cliente, continuemos!' });
        return response.redirect('/clients'); //debe redirigir a la otra pagina de datos
    }

    async redirectFormEdit({ params, view }) {
        const client = await Client.find(params.id);
        return view.render('pages.clientsForm', { client: client });
    }

    async edit({ request, session, response, params }) {
        const client = await Client.find(params.id);
        client.merge(request.only([
            'name',
            'name2',
            'first_last_name',
            'sec_last_name',
            'civil_status',
            'nacionality',
            'country',
            'state',
            'gender',
            'fiel',
            'birth',
            'type_housing',
            'living_there_y',
            'living_there_m',
            'email',
            'cellphone',
            'phone',
            'contact_schedule',
            'rfc',
            'curp'
        ]));
        await client.save();
        session.flash({ message: 'Se ha editado la info del cliente' });
        return response.redirect('/clients/getClient/'+ client.id);
    }

    async delete({params, session, response}){
        const client = await Client.find(params.id);
        const job = await client.job().fetch();
        const adressC = await client.adress().fetch();
        const references = await client.references().fetch();
        const referencias = references.toJSON()
        const bank = await client.bank().fetch();
        await bank.delete();
        if (job != null){
            const adressJ = await job.adress().fetch();
            if(adressJ != null)
                await adressJ.delete();
            await job.delete();
        }
        if(referencias.length > 0){
            for (const reference of referencias) {
                const refe = await Reference.find(reference.id)
                await refe.delete();
              }
        }
        if(adressC != null)
            await adressC.delete();
        await client.delete();
        session.flash({ message: 'Se ha editado la info del cliente' });
        return response.redirect('/clients');
    }

}

module.exports = ClientController
