const knex = require('knex');

connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db.sqlite'
    },
    useNullAsDefault: true
});

module.exports = connectedKnex;