const mysql = require('mysql');
const { DB } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(DB);

pool.getConnection((error, connection) => {
    if(error) {
        console.log(error);
    } else {
        connection.release();
        console.log('BD conectada');
    }
});

pool.query = promisify(pool.query);

module.exports = pool;
