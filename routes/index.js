const routes = require('express').Router();
const path = require('../controllers/lesson1');

routes.get('/', path.efitaRoute);
routes.get('/lafulji', path.lafuljiRoute);
routes.get('/muli', path.muliiRoute);
routes.get('/ama',path.amaRoute);
routes.get('/new', path.newRoute);

module.exports = routes;