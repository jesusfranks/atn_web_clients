'use strict'

const Job = use('App/Models/Job')
const Client = use('App/Models/Client')

class JobController {


    async redirectForm({ view, params }) {
        return view.render('pages.jobsForm', {client_id: params.client_id});
    }

    async create({ params, request, session, response }) {
        const id = params.client_id;
        const client = await Client.find(id)
        const {
            place,
            occupation,
            job,
            time_working,
            phone,
            extension,
            payroll,
            income
        } = request.all();
        const empleo = new Job();
        empleo.fill({
            place,
            occupation,
            job,
            time_working,
            phone,
            extension,
            payroll,
            income
        });
        await client.job().save(empleo);
        session.flash({ message: 'Se ha creado nueva información de empleo del cliente, continuemos!' });
        return response.redirect('/clients/getClient/'+ client.id);
    }

    async redirectFormEdit({ params, view }) {
        const job = await Job.find(params.id);
        return view.render('pages.jobsForm', { job: job });
    }

    async edit({ request, session, response, params }) {
        const job = await Job.find(params.id);
        job.merge(request.only([
            'place',
            'occupation',
            'job',
            'time_working',
            'phone',
            'extension',
            'payroll',
            'income'
        ]));
        await job.save();
        session.flash({ message: 'Se ha editado la info del cliente: Empleo' });
        return response.redirect('/clients/getClient/'+ job.client_id);
    }

}

module.exports = JobController
