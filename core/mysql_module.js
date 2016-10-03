/// ---> Mysql Connection

var MysqlConnection = function (connection, debug) {
    var self = this;
    self.debug = debug;
    self.q = require('q');
    self.connection = connection;
};

var mysql_connection = MysqlConnection.prototype;

mysql_connection.query = function (query, params, debug, no_log_error) {
    var self = this;
    return self.q.Promise(function (resolve, reject) {
        self.log(query, params, null, debug);
        self.connection.query(query, params, function (err, rows) {
            if (err) {
                if (!no_log_error) {
                    self.log(query, params, err, debug);
                }
                return reject(err);
            }
            resolve(rows);
        });
    })
};

mysql_connection.log = function (query, params, err, debug) {
    var self = this;
    if (self.debug || debug) {
        if (err) {
            console.log(err.message);
        }
        console.log(self.format(query, params))
    }
};

mysql_connection.format = function (sql, condition) {
    var self = this;
    return self.mysql.format(sql, condition) + ';';
};

/// ---> Mysql Module

var MysqlModule = function () {
    var self = this;
    self.debug = false;
    self.q = require('q');
    self.mysql = require('mysql');
    self.poolCluster = require('./database').poolCluster;
    self.poolClusterMultipleStatements = require('./database').poolClusterMultipleStatements;
};

var mysql_module = MysqlModule.prototype;

mysql_module.query = function (query, params, debug, no_log_error) {
    var self = this;
    return self.q.Promise(function (resolve, reject) {
        self.poolCluster.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            }
            self.log(query, params, null, debug);
            connection.query(query, params, function (err, rows) {
                connection.release();
                if (err) {
                    if (!no_log_error) {
                        self.log(query, params, err, debug);
                    }
                    return reject(err);
                }
                resolve(rows);
            });
        })
    });
};

mysql_module.multipleQuery = function (query) {
    var self = this;
    return self.q.Promise(function (resolve, reject) {
        self.poolClusterMultipleStatements.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            }
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });
};

mysql_module.transaction = function (promiseFunc) {
    var self = this;
    return self.q.Promise(function (resolve, reject) {
        self.poolCluster.getConnection(function (err, connection) {
            if (err) {
                return reject(err);
            }
            var mysqlConnection = new MysqlConnection(connection);
            return promiseFunc.call(null, mysqlConnection)
                .then(function () {
                    var args = arguments;
                    connection.commit(function (err) {
                        if (err) throw err;
                        resolve.apply(null, args);
                    });
                })
                .catch(function (err) {
                    connection.rollback(function () {
                        reject(err);
                    });
                });
        })
    });
};

mysql_module.log = function (query, params, err, debug) {
    var self = this;
    if (self.debug || debug) {
        if (err) {
            console.log(err.message);
        }
        console.log(self.format(query, params))
    }
};

mysql_module.format = function (sql, condition) {
    var self = this;
    return self.mysql.format(sql, condition) + ';';
};

module.exports = MysqlModule;