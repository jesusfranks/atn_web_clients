'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
// iniciar sesión y salir
Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});
// registrarse
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
// info de usuario activo
Route.get('/getuser', 'UserController.getUser').middleware('auth');
//Clientes
Route.group(()=>{
    Route.get('/', 'ClientController.index');
    Route.get('/newClient', 'ClientController.redirectForm');
    Route.post('/newClient', 'ClientController.create').validator('CreateClient');
    Route.get('/client/:id', 'ClientController.redirectFormEdit');
    Route.post('/edit/:id', 'ClientController.edit').validator('EditClient');
    Route.get('/delete/:id', 'ClientController.delete');
}).prefix('/clients').middleware(['auth']);
