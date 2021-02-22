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
    Route.get('/getClient/:id', 'AllController.getClient');
}).prefix('/clients').middleware(['auth']);
//Jobs
Route.group(()=>{
    Route.get('/newJob/:client_id', 'JobController.redirectForm');
    Route.post('/newJob/:client_id', 'JobController.create').validator('CreateJob');
    Route.get('/redirect/edit/:id', 'JobController.redirectFormEdit');
    Route.post('/edit/:id', 'JobController.edit').validator('CreateJob');
}).prefix('/client/job').middleware(['auth']);
//Aderesses
Route.group(()=>{
    Route.get('/newC/:client_id', 'AdressController.redirectFormC');
    Route.post('/newC/:client_id', 'AdressController.createC').validator('CreateAdress');
    Route.get('/newJ/:job_id', 'AdressController.redirectFormJ');
    Route.post('/newJ/:job_id', 'AdressController.createJ').validator('CreateAdress');
    Route.get('/redirect/edit/:id', 'AdressController.redirectFormEdit');
    Route.post('/edit/:id', 'AdressController.edit').validator('CreateAdress');
}).prefix('/client/adress').middleware(['auth']);



/// API

