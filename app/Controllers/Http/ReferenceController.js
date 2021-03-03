'use strict'

const Reference = use('App/Models/Reference')
const Client = use('App/Models/Client')

class ReferenceController {
    async redirectForm({ view, params }) {
        return view.render('pages.referenceForm', {client_id: params.client_id});
    }

    async create({ params, request, session, response }) {
        const id = params.client_id;
        const client = await Client.find(id)
        const {
            name,
            name2,
            first_last_name,
            sec_last_name,
            nacionality,
            birth,
            phone,
            relationship,
            known,
            status
        } = request.all();
        const ref = new Reference();
        ref.fill({
            name,
            name2,
            first_last_name,
            sec_last_name,
            nacionality,
            birth,
            phone,
            relationship,
            known,
            status
        });
        await client.references().save(ref);
        session.flash({ message: 'Se ha creado nueva referencia del cliente, continuemos!' });
        return response.redirect('/clients/getClient/'+ client.id);
    }

    async redirectFormEdit({ params, view }) {
        const reference = await Reference.find(params.id);
        return view.render('pages.referenceForm', { reference: reference });
    }

    async edit({ request, session, response, params }) {
        const refe = await Reference.find(params.id);
        refe.merge(request.only([
            'name',
            'name2',
            'first_last_name',
            'sec_last_name',
            'nacionality',
            'birth',
            'phone',
            'relationship',
            'known',
            'status'
        ]));
        await refe.save();
        session.flash({ message: 'Se ha editado la info del cliente: Referencia' });
        return response.redirect('/clients/getClient/'+ refe.client_id);
    }
}

module.exports = ReferenceController
