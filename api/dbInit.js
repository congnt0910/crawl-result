"use strict";
/**
 * Created by congnt on 5/3/16.
 */
var _ = require('underscore');

var DbInit = function () {
    var self = this;
    self.q = require('q');
    self.mysql = require('../core/mysql_module');
};
var db = DbInit.prototype;

// create table Mien
db.mien = function () {
    var self = this;
    var sql = 'CREATE TABLE IF NOT EXISTS `mien`(' +
        ' id int(11) unsigned NOT NULL AUTO_INCREMENT,' +
        ' name nvarchar(255) NOT NULL,' +
        ' PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return self.mysql.query(sql)
        .then(function (rs) {
            console.log(rs);
            sql = 'INSERT INTO mien (`name`) VALUES ?';
            var mien_map_id = {1: 'MIỀN BẮC', 2: 'MIỀN TRUNG', 3: 'MIỀN NAM'};
            var insert_data = _.map(mien_map_id, function (val, key) {
                return val;
            });

            return self.mysql.query(sql, insert_data);
        })
        .done()
};
db.giai = function () {
    var self = this;
    var sql = 'CREATE TABLE IF NOT EXISTS `giai`(' +
        ' id int(11) unsigned NOT NULL AUTO_INCREMENT,' +
        ' name nvarchar(255) NOT NULL,' +
        ' PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return self.mysql.query(sql)
        .then(function (rs) {
            console.log(rs);
            sql = 'INSERT INTO giai (`name`) VALUES ?';
            var insert_data = ['Đặc biệt',
                'Giải nhất',
                'Giải nhì',
                'Giải ba',
                'Giải tư',
                'Giải năm',
                'Giải sáu',
                'Giải bảy',
                'Giải tám'];
            return self.mysql.query(sql, insert_data);
        })
        .done()
};

db.loai = function () {
    var self = this;
    var sql = 'CREATE TABLE IF NOT EXISTS `loai`(' +
        ' id int(11) unsigned NOT NULL AUTO_INCREMENT,' +
        ' name nvarchar(255) NOT NULL,' +
        ' time nvarchar(255),' +
        ' mien_id int,' +
        ' PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return self.mysql.query(sql)
        .then(function (rs) {
            console.log(rs);
            // todo: insert value
            return true;
        })
        .done()
};


db.ketqua = function () {
    var self = this;
    var sql = 'CREATE TABLE IF NOT EXISTS `ketqua`(' +
        ' id int(11) unsigned NOT NULL AUTO_INCREMENT,' +
        ' value int NOT NULL,' +
        ' time int,' +
        ' loai_id int,' +
        ' giai_id int,' +
        ' PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return self.mysql.query(sql)
        .then(function (rs) {
            console.log(rs);
            return true;
        })
        .done()
};

module.exports = new DbInit();