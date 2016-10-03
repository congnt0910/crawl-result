console.log('\033[33mInitial DB\033[0m');
(function () {
    var q = require('q');
    var mysql = require('mysql');
    var dbConfig = require('../config/database');
    var poolCluster = mysql.createPool(dbConfig.mysqlConfig);
    var poolClusterMultipleStatements = mysql.createPool(dbConfig.mysqlMultipleStatementsConfig);
    module.exports = {
        poolCluster: poolCluster,
        poolClusterMultipleStatements: poolClusterMultipleStatements
    };
}).call();