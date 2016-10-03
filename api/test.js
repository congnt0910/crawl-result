"use strict";

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var _ = require('underscore');

var get_url = function () {
    var body = fs.readFileSync(path.resolve('./xo-so-truyen-thong.html'), 'utf8');
    //console.log(body);

    var $ = cheerio.load(body);
    var $body = $('body');
    //var $nav = $body.find('.sidebar-nav');
    var $leftMenu = $body.find('#left_menu');

    // find all item
    var list_url_menu = [];
    var $items = $leftMenu.find('>li');
    var $today = $items.eq(0);
    $items = $items.not($today);// remove today
    $items.get().forEach(function (item) {
        var $item = $(item);
        var $a = $item.find('>a');
        var group = $a.text().trim();
        var $lis = $item.find('li');
        $lis.get().forEach(function (_item) {
            var $_item = $(_item);
            var $_a = $_item.find('a');
            list_url_menu.push({
                group: group,
                name: $_a.text().trim(),
                url: $_a.attr('href'),
                time: ''
            });
        });


    });

    console.log(list_url_menu);

    var map = {};
    list_url_menu.forEach(function (item, i) {
        map[i] = item;
    });
    console.log(map);
};
//get_url();return


var parse = function () {
    var body = fs.readFileSync(path.resolve('./xo-so-truyen-thong-2.html'), 'utf8');

    var $ = cheerio.load(body);
    var $body = $('body');
    var $table = $body.find('#result_mb table.kqvertimarginw');
    var $rows = $table.find('tbody tr');

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
    console.log(lo_truc_tiep)

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
};
//parse();


var clone_data = function () {
    var moment = require('moment');
    var api = new (require('./api'))();
    var global = {};
    var start_date = '04/28/2016';
    var end_date = '05/03/2016';
    api.q.when()
        .then(function () {
            global.start_date = moment(start_date, 'MM/DD/YYYY');
            global.end_date = moment(end_date, 'MM/DD/YYYY');
            // select from tbl `loai`
            global.loai = {
                '0': {
                    name: 'Truyền Thống',
                    url: '/xo-so-truyen-thong/',
                    time: '18:15',
                    mien_id: '1'
                },
                '1': {
                    name: 'Điện Toán 123',
                    url: '/xo-so-dien-toan-123/',
                    time: '18:05',
                    mien_id: '1'
                },
                '2': {
                    name: 'Điện Toán 6x36',
                    url: '/xo-so-dien-toan-6x36/',
                    time: '',
                    mien_id: '1'
                },
                '3': {
                    name: 'Thần Tài',
                    url: '/xo-so-than-tai/',
                    time: '18:05',
                    mien_id: '1'
                },
                '4': {
                    name: 'Bình Định',
                    url: '/xo-so-binh-dinh/',
                    time: '',
                    mien_id: '2'
                },
                '5': {
                    name: 'Đà Nẵng',
                    url: '/xo-so-da-nang/',
                    time: '',
                    mien_id: '2'
                },
                '6': {
                    name: 'Đắc Lắc',
                    url: '/xo-so-dac-lac/',
                    time: '17:15',
                    mien_id: '2'
                },
                '7': {
                    name: 'Đắc Nông',
                    url: '/xo-so-dac-nong/',
                    time: '',
                    mien_id: '2'
                },
                '8': {
                    name: 'Gia Lai',
                    url: '/xo-so-gia-lai/',
                    time: '',
                    mien_id: '2'
                },
                '9': {
                    name: 'Khánh Hoà',
                    url: '/xo-so-khanh-hoa/',
                    time: '',
                    mien_id: '2'
                },
                '10': {
                    name: 'Kon Tum',
                    url: '/xo-so-kon-tum/',
                    time: '',
                    mien_id: '2'
                },
                '11': {
                    name: 'Ninh Thuận',
                    url: '/xo-so-ninh-thuan/',
                    time: '',
                    mien_id: '2'
                },
                '12': {
                    name: 'Phú Yên',
                    url: '/xo-so-phu-yen/',
                    time: '',
                    mien_id: '2'
                },
                '13': {
                    name: 'Quảng Bình',
                    url: '/xo-so-quang-binh/',
                    time: '',
                    mien_id: '2'
                },
                '14': {
                    name: 'Quảng Nam',
                    url: '/xo-so-quang-nam/',
                    time: '17:15',
                    mien_id: '2'
                },
                '15': {
                    name: 'Quảng Ngãi',
                    url: '/xo-so-quang-ngai/',
                    time: '',
                    mien_id: '2'
                },
                '16': {
                    name: 'Quảng Trị',
                    url: '/xo-so-quang-tri/',
                    time: '',
                    mien_id: '2'
                },
                '17': {
                    name: 'Thừa Thiên Huế',
                    url: '/xo-so-thua-thien-hue/',
                    time: '',
                    mien_id: '2'
                },
                '18': {
                    name: 'An Giang',
                    url: '/xo-so-an-giang/',
                    time: '',
                    mien_id: '3'
                },
                '19': {
                    name: 'Bạc Liêu',
                    url: '/xo-so-bac-lieu/',
                    time: '16:15',
                    mien_id: '3'
                },
                '20': {
                    name: 'Bến Tre',
                    url: '/xo-so-ben-tre/',
                    time: '16:15',
                    mien_id: '3'
                },
                '21': {
                    name: 'Bình Dương',
                    url: '/xo-so-binh-duong/',
                    time: '',
                    mien_id: '3'
                },
                '22': {
                    name: 'Bình Phước',
                    url: '/xo-so-binh-phuoc/',
                    time: '',
                    mien_id: '3'
                },
                '23': {
                    name: 'Bình Thuận',
                    url: '/xo-so-binh-thuan/',
                    time: '',
                    mien_id: '3'
                },
                '24': {name: 'Cà Mau', url: '/xo-so-ca-mau/', time: '', mien_id: '3'},
                '25': {
                    name: 'Cần Thơ',
                    url: '/xo-so-can-tho/',
                    time: '',
                    mien_id: '3'
                },
                '26': {name: 'Đà Lạt', url: '/xo-so-da-lat/', time: '', mien_id: '3'},
                '27': {
                    name: 'Đồng Nai',
                    url: '/xo-so-dong-nai/',
                    time: '',
                    mien_id: '3'
                },
                '28': {
                    name: 'Đồng Tháp',
                    url: '/xo-so-dong-thap/',
                    time: '',
                    mien_id: '3'
                },
                '29': {
                    name: 'Hậu Giang',
                    url: '/xo-so-hau-giang/',
                    time: '',
                    mien_id: '3'
                },
                '30': {
                    name: 'Hồ Chí Minh',
                    url: '/xo-so-ho-chi-minh/',
                    time: '',
                    mien_id: '3'
                },
                '31': {
                    name: 'Kiên Giang',
                    url: '/xo-so-kien-giang/',
                    time: '',
                    mien_id: '3'
                },
                '32': {
                    name: 'Long An',
                    url: '/xo-so-long-an/',
                    time: '',
                    mien_id: '3'
                },
                '33': {
                    name: 'Sóc Trăng',
                    url: '/xo-so-soc-trang/',
                    time: '',
                    mien_id: '3'
                },
                '34': {
                    name: 'Tây Ninh',
                    url: '/xo-so-tay-ninh/',
                    time: '',
                    mien_id: '3'
                },
                '35': {
                    name: 'Tiền Giang',
                    url: '/xo-so-tien-giang/',
                    time: '',
                    mien_id: '3'
                },
                '36': {
                    name: 'Trà Vinh',
                    url: '/xo-so-tra-vinh/',
                    time: '',
                    mien_id: '3'
                },
                '37': {
                    name: 'Vĩnh Long',
                    url: '/xo-so-vinh-long/',
                    time: '',
                    mien_id: '3'
                },
                '38': {
                    name: 'Vũng Tàu',
                    url: '/xo-so-vung-tau/',
                    time: '16:15',
                    mien_id: '3'
                }
            };
            return true;
        })
        .then(function () {
            // todo: get tbl giai
            var giai = [
                {id: 1, name: 'Đặc biệt'},
                {id: 2, name: 'Giải nhất'},
                {id: 3, name: 'Giải nhì'},
                {id: 4, name: 'Giải ba'},
                {id: 5, name: 'Giải tư'},
                {id: 6, name: 'Giải năm'},
                {id: 7, name: 'Giải sáu'},
                {id: 8, name: 'Giải bảy'},
                {id: 9, name: 'Giải tám'}
            ];
            return giai;
        })
        .then(function (giai) {
            var map_giai = _.indexBy(giai, 'name');
            global.timestamp = global.start_date.format("X");


            var get_data_all_type = function () {
                // get data of all type
                return api.q.Promise(function (resolve, reject) {
                    var list_loai_id = _.keys(global.loai);
                    var loop = function () {
                        if (list_loai_id.length == 0) resolve();
                        var loai_id = list_loai_id.shift();

                        api.get(loai_id, global.start_date.format('MM/DD/YYYY'))
                            .then(function (rs) {
                                if(_.keys(rs).length == 0){
                                    console.log('Empty data');
                                    return true;
                                }
                                // gen insert data;
                                var insert_data = [];
                                _.forEach(rs, function (val, key) {
                                    var giai_id = map_giai[key].id;
                                    _.forEach(val, function (item) {
                                        // kieu 1 dung INSERT VALUES
                                        insert_data.push([giai_id, loai_id, global.timestamp, item]);
                                        // kieu 2 dung INSERT SET
                                        //insert_data.push({
                                        //    giai_id: giai_id,
                                        //    loai_id: global.loai_id,
                                        //    time: global.timestamp,
                                        //    value: item
                                        //})
                                    });
                                });

                                console.log('INSERT DATA ------------------------------------')
                                console.log(insert_data);
                                // kieu 1. kieu nay thi insert 1 phat het dc
                                var sql = 'INSERT INTO ketqua(giai_id, loai_id, time, value) VALUES ?';
                                // kieu 2. kieu nay phai insert tung thang 1
                                var sql2 = 'INSERT INTO ketqua SET ?';
                                //return self.mysql.query(sql, insert_data);
                                return true; // todo: insert to db
                            })
                            .then(function () {
                                loop();
                            })
                            .catch(function (err) {
                                reject(err);
                            });
                    };
                    loop();
                })
            };


            return api.q.Promise(function (resolve, reject) {
                var loop = function () {
                    if(global.timestamp > global.end_date.format('X')) resolve(new Error('Invalid date'));
                    if(global.start_date.format('MM/DD/YYYY') == end_date) resolve();
                    get_data_all_type()
                        .then(function () {
                            global.start_date = global.start_date.add(1, 'days');
                            loop()
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                };
                loop();
            });
        }).done()
};

clone_data()