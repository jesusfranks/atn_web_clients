'use strict'

const Client = use('App/Models/Client')
const Agreement = use('App/Models/Agreement')
const Product = use('App/Models/Product')
const Credit = use('App/Models/Credit')
const Database = use('Database')

class CreditController {

    async index({ auth, view }) {
        const user = await auth.getUser();
        if (user.promotor) {
            const clients = await user.clients().fetch();
            return view.render('pages.creditClientsPage', { clients: clients.toJSON() })
        } else {
            const clients = await Client.all();
            return view.render('pages.creditClientsPage', { clients: clients.toJSON() })
        }
    }

    async redirectForm({ auth, view, params }) {
        const { client_id } = params
        const user = await auth.getUser();
        const client = await Client.find(client_id);
        const agreements = await Agreement.all();
        const products = await Product.all();
        if( user.promotor ){
            return view.render('pages.creditsForm', { client: client, user: user, agreements: agreements.toJSON(), products: products.toJSON() });
        }
        return view.render('pages.creditsForm',{ client: client, agreements: agreements.toJSON(), products: products.toJSON() });
    }

    async create({ request, session, response, params }) {
        const client = await Client.find(params.client_id);
        const {
            product,
            promotor_code,
            promotor_name,
            branch_office,
            amount,
            disposing,
            debt,
            date,
            destination,
            periodicity
        } = request.all();
        const credit = new Credit();
        credit.fill({
            client_id: client.id,
            product_id: Number(product),
            promotor_code,
            promotor_name,
            branch_office,
            amount,
            disposing,
            debt,
            date,
            destination,
            periodicity
        });
        await Database.table('credits').insert(credit.toJSON());
        session.flash({ message: 'Se ha creado nuevo credito, continuemos!' });
        return response.redirect('/credits/getCredit/' + client.id);
    }

    async redirectFormEdit({ params, view }) {
        // const client = await Client.find(params.id);
        // return view.render('pages.clientsForm', { client: client });
    }

    async edit({ request, session, response, params }) {
        // const client = await Client.find(params.id);
        // client.merge(request.only([
        //     'name',
        //     'first_last_name',
        //     'sec_last_name',
        //     'civil_status',
        //     'nacionality',
        //     'birth',
        //     'type_housing',
        //     'living_there',
        //     'email',
        //     'cellphone',
        //     'phone',
        //     'contact_schedule',
        //     'rfc',
        //     'curp'
        // ]));
        // await client.save();
        // session.flash({ message: 'Se ha editado la info del cliente' });
        // return response.redirect('/clients/getClient/'+ client.id);
    }

    async delete({params, session, response}){
        // const client = await Client.find(params.id);
        // const job = await client.job().fetch();
        // const adressC = await client.adress().fetch();
        // const references = await client.references().fetch();
        // const referencias = references.toJSON()
        // if (job != null){
        //     const adressJ = await job.adress().fetch();
        //     if(adressJ != null)
        //         await adressJ.delete();
        //     await job.delete();
        // }
        // if(referencias.length > 0){
        //     for (const reference of referencias) {
        //         const refe = await Reference.find(reference.id)
        //         await refe.delete();
        //       }
        // }
        // if(adressC != null)
        //     await adressC.delete();
        // await client.delete();
        // session.flash({ message: 'Se ha editado la info del cliente' });
        // return response.redirect('/clients');
    }

}

module.exports = CreditController
