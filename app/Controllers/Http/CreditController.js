'use strict'

const Client = use('App/Models/Client')
const Agreement = use('App/Models/Agreement')
const Product = use('App/Models/Product')
const Credit = use('App/Models/Credit')
const Database = use('Database');
const Env = use('Env');

class CreditController {

    async index({ auth, view }) {
        const user = await auth.getUser();
        //const clientes = await Database.table('clients').innerJoin('credits', 'clients.id', 'credits.client_id')
        //console.log('clientes', clientes)
        const reportHost = Env.get('REPORT_HOST', '127.0.0.1:8080');
        if (user.promotor) {
            const clients = await user.clients().fetch();
            return view.render('pages.creditClientsPage', { clients: clients.toJSON(), reportHost })
            //return view.render('pages.creditClientsPage', { clients: clients.toJSON(), clientes: clientes.toJSON() })
        } else {
            const clients = await Client.all();
            return view.render('pages.creditClientsPage', { clients: clients.toJSON(), reportHost })
        }
    }

    async indexSearch({ request, auth, view }) {
        const user = await auth.getUser();
        const { search } = request.all();
        const reportHost = Env.get('REPORT_HOST', '127.0.0.1:8080');
        if (user.promotor) {
            const cliensss = await Database.raw(`SELECT * FROM clients WHERE MATCH(name, name2, first_last_name, sec_last_name) AGAINST ("*${search}" IN BOOLEAN MODE) AND clients.user_id = ${user.id}`);
            const clients = JSON.parse(JSON.stringify(cliensss))
            return view.render('pages.creditClientsPage', { clients: clients[0], reportHost })
        } else {
            const cliensss = await Database.raw(`SELECT * FROM clients WHERE MATCH(name, name2, first_last_name, sec_last_name) AGAINST ("*${search}" IN BOOLEAN MODE)`);
            const clients = JSON.parse(JSON.stringify(cliensss))
            return view.render('pages.creditClientsPage', { clients: clients[0], reportHost })
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
            city,
            date,
            destination,
            periodicity,
            question,
            status
        } = request.all();
        const producto = await Product.find(product)
        const credit = new Credit();
        credit.fill({
            promotor_code,
            promotor_name,
            branch_office,
            amount,
            disposing,
            debt,
            city,
            date,
            destination,
            periodicity,
            question,
            status
        });
        await client.credit().save(credit);
        await producto.credit().save(credit);
        session.flash({ message: 'Se ha creado nuevo credito, continuemos!' });
        return response.redirect('/credits/getCredit/' + client.id);
    }

    async redirectFormEdit({ params, view }) {
        const credit = await Credit.find(params.id);
        return view.render('pages.creditsForm', { credit: credit });
    }

    async edit({ request, session, response, params }) {
        const credit = await Credit.find(params.id);
        credit.merge(request.only([
            'promotor_code',
            'promotor_name',
            'branch_office',
            'amount',
            'disposing',
            'debt',
            'city',
            'date',
            'destination',
            'periodicity',
            'question',
            'status'
        ]));
        await credit.save();
        session.flash({ message: 'Se ha editado la info del credito' });
        return response.redirect('/credits/getCredit/'+ credit.client_id);
    }

    async delete({params, session, response}){
        const credit = await Credit.find(params.id);
        await credit.delete();
        session.flash({ message: 'Se ha eliminado la el credito del cliente' });
        return response.redirect('/credits/getCredit/'+ credit.client_id);
    }

}

module.exports = CreditController
