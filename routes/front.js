const base = require('./base')

/*CONTROLLERS*/
const ctrl = require('../controllers/controller') 

/*OBJS*/
const index = new ctrl.BabeIt()

/*ROUTES*/
base.get('/', index.home)


