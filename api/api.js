"use strict";
//---------------------------------------------
var _httpRequest = require('./inc/httpRequest');
var moment = require('moment');
var cheerio = require('cheerio');
var _ = require('underscore');
//---------------------------------------------
process.env.DEBUG = 'httpRequest';
require('q').longStackSupport = true;
//---------------------------------------------
var Api = function () {
    var self = this;
    self.q = require('q');
    self.http = new _httpRequest();
    self.http.ssl_method = 'SSLv23_method';

    self.server = 'http://ketqua.net'
};

var api = Api.prototype;
//---------------------------------------------
var mien_map = [
    {id: '1', name: 'MIỀN BẮC'},
    {id: '2', name: 'MIỀN TRUNG'},
    {id: '3', name: 'MIỀN NAM'}
];
var map_url = {
    /* dac biet + 7 giai*/
    '0': {
        group: 'MIỀN BẮC',
        name: 'Truyền Thống',
        url: '/xo-so-truyen-thong/',
        time: '18:15'
    },
    /* 3 giai - ko phan biet*/
    '1': {
        group: 'MIỀN BẮC',
        name: 'Điện Toán 123',
        url: '/xo-so-dien-toan-123/',
        time: '18:05'
    },
    /* 6 giai - ko phan biet*/
    '2': {
        group: 'MIỀN BẮC',
        name: 'Điện Toán 6x36',
        url: '/xo-so-dien-toan-6x36/',
        time: ''
    },
    /* 1 giai */
    '3': {
        group: 'MIỀN BẮC',
        name: 'Thần Tài',
        url: '/xo-so-than-tai/',
        time: '18:05'
    },
    /* Dac biet + 8 giai . Mien trung & mien nam deu the nay het */
    '4': {
        group: 'MIỀN TRUNG',
        name: 'Bình Định',
        url: '/xo-so-binh-dinh/',
        time: ''
    },
    '5': {
        group: 'MIỀN TRUNG',
        name: 'Đà Nẵng',
        url: '/xo-so-da-nang/',
        time: ''
    },
    '6': {
        group: 'MIỀN TRUNG',
        name: 'Đắc Lắc',
        url: '/xo-so-dac-lac/',
        time: '17:15'
    },
    '7': {
        group: 'MIỀN TRUNG',
        name: 'Đắc Nông',
        url: '/xo-so-dac-nong/',
        time: ''
    },
    '8': {
        group: 'MIỀN TRUNG',
        name: 'Gia Lai',
        url: '/xo-so-gia-lai/',
        time: ''
    },
    '9': {
        group: 'MIỀN TRUNG',
        name: 'Khánh Hoà',
        url: '/xo-so-khanh-hoa/',
        time: ''
    },
    '10': {
        group: 'MIỀN TRUNG',
        name: 'Kon Tum',
        url: '/xo-so-kon-tum/',
        time: ''
    },
    '11': {
        group: 'MIỀN TRUNG',
        name: 'Ninh Thuận',
        url: '/xo-so-ninh-thuan/',
        time: ''
    },
    '12': {
        group: 'MIỀN TRUNG',
        name: 'Phú Yên',
        url: '/xo-so-phu-yen/',
        time: ''
    },
    '13': {
        group: 'MIỀN TRUNG',
        name: 'Quảng Bình',
        url: '/xo-so-quang-binh/',
        time: ''
    },
    '14': {
        group: 'MIỀN TRUNG',
        name: 'Quảng Nam',
        url: '/xo-so-quang-nam/',
        time: '17:15'
    },
    '15': {
        group: 'MIỀN TRUNG',
        name: 'Quảng Ngãi',
        url: '/xo-so-quang-ngai/',
        time: ''
    },
    '16': {
        group: 'MIỀN TRUNG',
        name: 'Quảng Trị',
        url: '/xo-so-quang-tri/',
        time: ''
    },
    '17': {
        group: 'MIỀN TRUNG',
        name: 'Thừa Thiên Huế',
        url: '/xo-so-thua-thien-hue/',
        time: ''
    },
    '18': {
        group: 'MIỀN NAM',
        name: 'An Giang',
        url: '/xo-so-an-giang/',
        time: ''
    },
    '19': {
        group: 'MIỀN NAM',
        name: 'Bạc Liêu',
        url: '/xo-so-bac-lieu/',
        time: '16:15'
    },
    '20': {
        group: 'MIỀN NAM',
        name: 'Bến Tre',
        url: '/xo-so-ben-tre/',
        time: '16:15'
    },
    '21': {
        group: 'MIỀN NAM',
        name: 'Bình Dương',
        url: '/xo-so-binh-duong/',
        time: ''
    },
    '22': {
        group: 'MIỀN NAM',
        name: 'Bình Phước',
        url: '/xo-so-binh-phuoc/',
        time: ''
    },
    '23': {
        group: 'MIỀN NAM',
        name: 'Bình Thuận',
        url: '/xo-so-binh-thuan/',
        time: ''
    },
    '24': {
        group: 'MIỀN NAM',
        name: 'Cà Mau',
        url: '/xo-so-ca-mau/',
        time: ''
    },
    '25': {
        group: 'MIỀN NAM',
        name: 'Cần Thơ',
        url: '/xo-so-can-tho/',
        time: ''
    },
    '26': {
        group: 'MIỀN NAM',
        name: 'Đà Lạt',
        url: '/xo-so-da-lat/',
        time: ''
    },
    '27': {
        group: 'MIỀN NAM',
        name: 'Đồng Nai',
        url: '/xo-so-dong-nai/',
        time: ''
    },
    '28': {
        group: 'MIỀN NAM',
        name: 'Đồng Tháp',
        url: '/xo-so-dong-thap/',
        time: ''
    },
    '29': {
        group: 'MIỀN NAM',
        name: 'Hậu Giang',
        url: '/xo-so-hau-giang/',
        time: ''
    },
    '30': {
        group: 'MIỀN NAM',
        name: 'Hồ Chí Minh',
        url: '/xo-so-ho-chi-minh/',
        time: ''
    },
    '31': {
        group: 'MIỀN NAM',
        name: 'Kiên Giang',
        url: '/xo-so-kien-giang/',
        time: ''
    },
    '32': {
        group: 'MIỀN NAM',
        name: 'Long An',
        url: '/xo-so-long-an/',
        time: ''
    },
    '33': {
        group: 'MIỀN NAM',
        name: 'Sóc Trăng',
        url: '/xo-so-soc-trang/',
        time: ''
    },
    '34': {
        group: 'MIỀN NAM',
        name: 'Tây Ninh',
        url: '/xo-so-tay-ninh/',
        time: ''
    },
    '35': {
        group: 'MIỀN NAM',
        name: 'Tiền Giang',
        url: '/xo-so-tien-giang/',
        time: ''
    },
    '36': {
        group: 'MIỀN NAM',
        name: 'Trà Vinh',
        url: '/xo-so-tra-vinh/',
        time: ''
    },
    '37': {
        group: 'MIỀN NAM',
        name: 'Vĩnh Long',
        url: '/xo-so-vinh-long/',
        time: ''
    },
    '38': {
        group: 'MIỀN NAM',
        name: 'Vũng Tàu',
        url: '/xo-so-vung-tau/',
        time: '16:15'
    }
};

var tmp_mien = _.indexBy(mien_map, 'name');

_.forEach(map_url, function (val, key) {
    val.mien_id = tmp_mien[val.group].id;
    delete val.group;
});
//console.log(map_url); // day la du lieu insert vao ban loai

//---------------------------------------------
api.get = function (id, ngay) {
    var self = this;
    var global = {error_code: 'Get'};
    var date_format = 'DD-MM-YYYY';
    return self.q.when()
        .then(function () {
            global.ngay = moment(ngay, 'MM/DD/YYYY').format(date_format);
            if (global.ngay == 'Invalid Date') throw new Error('Invalid Date');
            return true;
        })
        .then(function () {
            var post = {
                ngay: global.ngay
            };

            var url = self.server + map_url[id].url;
            return self.http.get(url, post, {message: 'Get data fail'})
        })
        .then(function (page) {
            var $ = cheerio.load(page.body);
            var $body = $('body');
            var $table = $body.find('table.kqvertimarginw');
            var $rows = $table.find('tbody tr');

            var $thead = $table.find('thead tr');
            var th_ngay = $thead.text().trim();
            var index = th_ngay.lastIndexOf(' ');
            var ngay_kq = th_ngay.substring(index).trim();
            // check date
            if (global.ngay != ngay_kq) {
                //console.log('empty data');
                console.log(global.ngay, ngay_kq);
                return {};
            }

            var data = {};
            var giai = '';
            $rows.get().forEach(function (tr) {
                var $tds = $(tr).find('td');
                var $giai = $tds.eq(0);
                $tds = $tds.not($giai);
                var tmp_giai = $giai.text().trim();
                if (tmp_giai != '') giai = tmp_giai;
                $tds.get().forEach(function (td) {
                    var $td = $(td);
                    data[giai] = data[giai] || [];
                    data[giai].push($td.text().trim());
                })
            });
            console.log(data);
            return data;
            // het phan lay du lieu

            // lo truc tiep
            var lo_truc_tiep = {};
            _.forEach(data, function (val, key) {
                _.map(val, function (item) {
                    var duoi = item.substr(-2);
                    lo_truc_tiep[duoi] = key == 'Đặc biệt';
                })
            });

            console.log('loto truc tiep');
            //console.log(_.keys(lo_truc_tiep).sort());
            console.log(lo_truc_tiep);

            // dau duoi

            var dau = {};
            var duoi = {};
            var _keys = _.range(10);
            _keys.forEach(function (i) {
                dau[i] = [];
                duoi[i] = [];
            });

            _.keys(lo_truc_tiep).forEach(function (item) {
                var found_dau = false, found_duoi = false;
                _keys.some(function (ii) {
                    if (!found_dau && item.indexOf(ii) == 0) {
                        var _obj = {};
                        _obj[item] = lo_truc_tiep[item];
                        dau[ii].push(_obj);
                        found_dau = true
                    }
                    if (!found_duoi && item.lastIndexOf(ii) == 1) {
                        var _obj = {};
                        _obj[item] = lo_truc_tiep[item];
                        duoi[ii].push(_obj);
                        found_duoi = true
                    }
                    return found_dau && found_duoi;
                });
            });

            console.log('dau ', dau, '\nduoi ', duoi);
            return true;
        })
};
//---------------------------------------------
module.exports = Api;

///test
//var global = {
//    time: '04/28/2016',
//    loai_id: 4,
//    insert_data: []
//};
//var a = new Api();
//a.get(global.loai_id, global.time)
//    .then(function (rs) {
//        global.rs = rs;
//        // todo: get tbl giai
//        return giai;
//    })
//    .then(function (giai) {
//        var map_giai = _.indexBy(giai, 'name');
//        global.timestamp = moment(global.time, 'MM/DD/YYYY').format("X");
//        // gen insert data;
//        _.forEach(global.rs, function (val, key) {
//            var giai_id = map_giai[key].id;
//            _.forEach(val, function (item) {
//                // kieu 1 dung INSERT VALUES
//                global.insert_data.push([giai_id, global.loai_id, global.timestamp, item]);
//                // kieu 2 dung INSERT SET
//                //global.insert_data.push({
//                //    giai_id: giai_id,
//                //    loai_id: global.loai_id,
//                //    time: global.timestamp,
//                //    value: item
//                //})
//            });
//        });
//
//        console.log(global.insert_data);
//
//        // kieu 1. kieu nay thi insert 1 phat het dc
//        var sql = 'INSERT INTO ketqua(giai_id, loai_id, time, value) VALUES ?';
//        // kieu 2. kieu nay phai insert tung thang 1
//        var sql2 = 'INSERT INTO ketqua SET ?';
//        //return self.mysql.query(sql, global.insert_data);
//    });







