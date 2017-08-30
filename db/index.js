const db = require('./conn.js');
const Sequelize = db.Sequelize;
const utils = require('../utils');

function sync () {
    return db.sync({force:true})
            .then(() => {
                utils.inform('Database Synced');
            }).catch( err => {
                throw err;
            })
}

module.exports = {
    sync
}
