'use strict'

const Bank = use('App/Models/Bank')
const Client = use('App/Models/Client')

class BankController {

    async redirectForm({ view, params }) {
        return view.render('pages.bankForm', {client_id: params.client_id});
    }

    async create({ params, request, session, response }) {
        const id = params.client_id;
        const client = await Client.find(id)
        const {
            clabe,
            bank,
            arrangement,
            account,
            payment_date
        } = request.all();
        const banco = new Bank();
        banco.fill({
            clabe,
            bank,
            arrangement,
            account,
            payment_date
        });
        await client.bank().save(banco);
        session.flash({ message: 'Se ha creado nueva información de banco del cliente, continuemos!' });
        return response.redirect('/clients/getClient/'+ client.id);
    }

    async redirectFormEdit({ params, view }) {
        const bank = await Bank.find(params.id);
        return view.render('pages.bankForm', { bank: bank });
    }

    async edit({ request, session, response, params }) {
        const bank = await Bank.find(params.id);
        bank.merge(request.only([
            'clabe',
            'bank',
            'arrangement',
            'account',
            'payment_date'
        ]));
        await bank.save();
        session.flash({ message: 'Se ha editado la info del cliente: bank' });
        return response.redirect('/clients/getClient/'+ bank.client_id);
    }

}

module.exports = BankController
