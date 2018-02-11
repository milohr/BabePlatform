const base = require('./base')

/*CONTROLLERS*/
const ctrl = require('../controllers/controller') 

/*OBJS*/
const user = new ctrl.User()


/*ROUTES*/
base.post('/api/user/register', user.register)


