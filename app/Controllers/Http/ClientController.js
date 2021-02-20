'use strict'

const Client = use('App/Models/Client')

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

    async redirectForm({ view }) {
        return view.render('pages.clientsForm');
    }

    async create({ auth, request, session, response }) {
        const user = await auth.getUser();
        const {
            name,
            first_last_name,
            sec_last_name,
            civil_status,
            nacionality,
            birth,
            type_housing,
            living_there,
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
            first_last_name,
            sec_last_name,
            civil_status,
            nacionality,
            birth,
            type_housing,
            living_there,
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
            'first_last_name',
            'sec_last_name',
            'civil_status',
            'nacionality',
            'birth',
            'type_housing',
            'living_there',
            'email',
            'cellphone',
            'phone',
            'contact_schedule',
            'rfc',
            'curp'
        ]));
        await client.save();
        session.flash({ message: 'Se ha editado la info del cliente' });
        return response.redirect('/clients');
    }

    async delete({params, session, response}){
        const client = await Client.find(params.id);
        await client.delete();
        session.flash({ message: 'Se ha editado la info del cliente' });
        return response.redirect('/clients');
    }

}

module.exports = ClientController
