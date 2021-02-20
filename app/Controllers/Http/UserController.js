'use strict'

const User = use('App/Models/User')

class UserController {
    async create({ request, response, auth, view}) {
        const { name, email, first_last_name, sec_last_name, password, code } = request.all()
        const user = await User.create({
            email,
            name,
            first_last_name,
            sec_last_name,
            password,
            code
        })
        await auth.login(user);
        return response.redirect('/getuser');
    }

    async login({ request, auth, response, session }) {
        const { email, password } = request.all();

        try {
            await auth.attempt(email, password);
            return response.redirect('/getuser');
        } catch (error) {
            session.flash({loginError: 'These credentials do not work.'})
            return response.redirect('/login');
        }
    }
    
    async getUser({ auth, view }) {
        const user = await auth.getUser();
        return view.render('getuser', { user })
    }
}

module.exports = UserController
