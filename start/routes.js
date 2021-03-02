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
//getClientJSON
Route.get('getClientJSON/:id', 'AllController.getClientJSON')
//Clientes
Route.group(()=>{
    Route.get('/', 'ClientController.index');
    Route.post('/', 'ClientController.indexSearch');
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
//References
Route.group(()=>{
    Route.get('/newR/:client_id', 'ReferenceController.redirectForm');
    Route.post('/newR/:client_id', 'ReferenceController.create').validator('CreateReference');
    Route.get('/redirect/edit/:id', 'ReferenceController.redirectFormEdit');
    Route.post('/edit/:id', 'ReferenceController.edit').validator('CreateReference');
}).prefix('/client/references').middleware(['auth']);
//Bank
Route.group(()=>{
    Route.get('/newB/:client_id', 'BankController.redirectForm');
    Route.post('/newB/:client_id', 'BankController.create').validator('CreateBank');
    Route.get('/redirect/edit/:id', 'BankController.redirectFormEdit');
    Route.post('/edit/:id', 'BankController.edit').validator('CreateBank');
}).prefix('/client/bank').middleware(['auth']);
/////////////////////
//Credits
Route.group(()=>{
    Route.get('/', 'CreditController.index');
    Route.post('/', 'CreditController.indexSearch');
    Route.get('/newCredit/:client_id', 'CreditController.redirectForm');
    Route.post('/newCredit/:client_id', 'CreditController.create').validator('CreateCredit');
    Route.get('/credit/:id', 'CreditController.redirectFormEdit');
    Route.post('/edit/:id', 'CreditController.edit').validator('CreateCredit');
    Route.get('/delete/:id', 'CreditController.delete');
    Route.get('/getCredit/:id', 'AllController.getCredit');
}).prefix('/credits').middleware(['auth']);
