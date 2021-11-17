const nodeRoutes = require('./node_routes');

module.exports = function (app, db) {
    nodeRoutes(app, db);
}