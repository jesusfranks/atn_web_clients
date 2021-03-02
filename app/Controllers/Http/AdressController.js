'use strict'

const Job = use('App/Models/Job')
const Client = use('App/Models/Client')
const Adress = use('App/Models/Adress')

class AdressController {

    async redirectFormC({ view, params }) {
        return view.render('pages.adressForm', {client_id: params.client_id});
    }

    async createC({ params, request, session, response }) {
        const id = params.client_id;
        const client = await Client.find(id)
        const {
            street,
            number,
            int_number,
            suburb,
            crosses,
            state,
            town,
            contry,
            postal_code
        } = request.all();
        const dire = new Adress();
        dire.fill({
            street,
            number,
            int_number,
            suburb,
            crosses,
            state,
            town,
            contry,
            postal_code
        });
        await client.adress().save(dire);
        session.flash({ message: 'Se ha creado nueva información de empleo del cliente, continuemos!' });
        return response.redirect('/clients/getClient/'+ client.id);
    }

    async redirectFormJ({ view, params }) {
        return view.render('pages.adressForm', {job_id: params.job_id});
    }

    async createJ({ params, request, session, response }) {
        const id = params.job_id;
        const job = await Job.find(id)
        const {
            street,
            number,
            int_number,
            suburb,
            crosses,
            state,
            town,
            contry,
            postal_code
        } = request.all();
        const dir = new Adress();
        dir.fill({
            street,
            number,
            int_number,
            suburb,
            crosses,
            state,
            town,
            contry,
            postal_code
        });
        await job.adress().save(dir);
        session.flash({ message: 'Se ha creado nueva información de empleo del cliente, continuemos!' });
        return response.redirect('/clients/getClient/'+ job.client_id);
    }

    async redirectFormEdit({ params, view }) {
        const adress = await Adress.find(params.id);
        return view.render('pages.adressForm', { adress: adress });
    }

    async edit({ request, session, response, params }) {
        const adress = await Adress.find(params.id);
        adress.merge(request.only([
            'street',
            'number',
            'int_number',
            'suburb',
            'crosses',
            'state',
            'town',
            'contry',
            'postal_code',
        ]));
        await adress.save();
        if (adress.client_id == null){
            const id = adress.job_id;
            const job = await Job.find(id)
            session.flash({ message: 'Se ha editado la info del cliente: Dirección Empleo' });
            return response.redirect('/clients/getClient/'+ job.client_id);
        }else{
            session.flash({ message: 'Se ha editado la info del cliente: Dirección' });
            return response.redirect('/clients/getClient/'+ adress.client_id);
        }
    }

}

module.exports = AdressController
