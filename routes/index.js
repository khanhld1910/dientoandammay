var express = require('express');
var router = express.Router();
var filename = './data.txt';
var fs = require('fs');
//--------------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'fffc346d-74ef-4c26-9e75-a61e0126e919.mysql.sequelizer.com',
    user: 'yjjdererovizgcpk',
    password: 'ZcxdquRWTDxPspgCV7h4nFZW4NrqLv3eHcUPWhXKNFvNsBxtSXiq6PmsjHhJczkw',
    database: 'dbfffc346d74ef4c269e75a61e0126e919'
});
//--------------------------------------------------------------
/* GET home page. */

router.get('/', function(req, res, next) {
    res.redirect('/hoadon');
    res.end();
});
// routers khach hang ------------------------>
router.get('/khachhang', function(req, res, next) {
    var data = {};
    var string_query = 'SELECT * FROM khachhang';
    connection.query(string_query, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.tabledata = JSON.parse(values);
        data.title = "Quản lý khách hàng";
        res.render('khachhang', data);
    });
});
router.post('/insertkh', function(req, res) {
    var ten = req.body.ten;
    var email = req.body.email;
    var string_query = `INSERT INTO khachhang (ten, email) VALUES ('` + ten + `', '` + email + `');`;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/khachhang');
    res.end();
});

router.post('/deletekh', function(req, res) {
    var reqData = JSON.parse(req.body.selectedRows); // array of objects
    var string_query = `DELETE from khachhang WHERE idkhachhang IN (` + reqData + `);`;
    //console.log(string_query);    
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/khachhang');
    res.end();
});

router.post('/editkh', function(req, res) {
    var reqData = JSON.parse(req.body.row); // array of objects
    // reqData co dang: [ '12', 'Lương Duy Khánh', 'erer' ];
    // console.log(reqData);
    var string_query = `Update khachhang set ` +
        `ten = '` + reqData[1] + `', ` +
        `email = '` + reqData[2] + `' ` +
        `WHERE idkhachhang = ` + reqData[0];
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/khachhang');
    res.end();
});
//-----------------------------------------
// routers loaisp ------------------------>
router.get('/loaisp', function(req, res, next) {
    var data = {};
    var string_query = 'SELECT * FROM loaisp';
    connection.query(string_query, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.tabledata = JSON.parse(values);
        data.title = "Phân loại sản phẩm";
        res.render('loaisp', data);
    });
});
router.post('/deleteloaisp', function(req, res) {
    var reqData = JSON.parse(req.body.selectedRows); // array of objects
    var string_query = `DELETE from loaisp WHERE idloaisp IN (` + reqData + `);`;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
    });
    res.redirect('/loaisp');
    res.end();
});
router.post('/insertloaisp', function(req, res) {
    var tenloaisp = req.body.tenloaisp;
    var string_query = `INSERT INTO loaisp (tenloaisp) VALUES ('` + tenloaisp + `');`;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/loaisp');
    res.end();
});
router.post('/editloaisp', function(req, res) {
    var reqData = JSON.parse(req.body.row);
    // reqData co dang: [ '12', 'Gia dụng'];
    // console.log(reqData);
    var string_query = `Update loaisp set ` +
        `tenloaisp = '` + reqData[1] + `' ` +
        `WHERE idloaisp = ` + reqData[0];
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/loaisp');
    res.end();
});
//-----------------------------------------
// routers sanpham ------------------------>

router.get('/sanpham', function(req, res, next) {
    var data = {};
    var string_query = 'select idsanpham, tensp, tenloaisp, dongia ' +
        'from (sanpham, loaisp) ' +
        'where (sanpham.idloaisp = loaisp.idloaisp);';
    var string_query2 = 'select * from loaisp';

    connection.query(string_query2, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.loaisp = JSON.parse(values);
        //console.log(data.loaisp);
    });
    connection.query(string_query, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.tabledata = JSON.parse(values);
        data.title = "Danh sách sản phẩm";
        res.render('sanpham', data);
    });
});
router.post('/deletesp', function(req, res) {
    var reqData = JSON.parse(req.body.selectedRows); // array of objects
    var string_query = `DELETE from sanpham WHERE idsanpham IN (` + reqData + `);`;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
    });
    res.redirect('/sanpham');
    res.end();
});
router.post('/insertsp', function(req, res) {
    var tensp = req.body.tensp;
    var idloaisp = req.body.idloaisp
    var dongia = req.body.dongia
    var string_query = `INSERT INTO sanpham (tensp, idloaisp, dongia) ` +
        `VALUES ('` + tensp + `', ` + idloaisp + `, ` + dongia + `);`;
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/sanpham');
    res.end();
});
router.post('/updatesp', function(req, res) {
    var reqData = JSON.parse(req.body.updatedRow);
    // reqData co dang object: 
    // {"idsanpham":"36","tensp":"Phở bò","idloaisp":"10","dongia":"25000"};
    console.log(reqData);
    var string_query = `Update sanpham set ` +
        `tensp = '` + reqData.tensp + `', ` +
        `idloaisp = ` + reqData.idloaisp + `, ` +
        `dongia = ` + reqData.dongia +
        ` WHERE idsanpham = ` + reqData.idsanpham;
    //console.log(string_query);

    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    /**/
    res.redirect('/sanpham');
    res.end();
});
// routers hoadon ------------------------>
router.get('/hoadon', function(req, res, next) {
    var data = {};
    var string_query = 'select idhoadon, ten, thoigian, thanhtien ' +
        'from (hoadon, khachhang) ' +
        'where (hoadon.idkhachhang = khachhang.idkhachhang);';
    var string_query2 = 'select * from khachhang';

    connection.query(string_query2, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.khachhang = JSON.parse(values);
        //console.log(data.khachhang);
    });
    connection.query(string_query, function(err, rows, fields) {
        if (err) throw err;
        //rows[0].thoigian co dang date:
        //2016-07-04T17:00:00.000Z
        //ta se dua ve 1 chuoi dang '2016-07-04'
        for (i = 0; i < rows.length; i++) {
            var d = new Date(rows[i].thoigian);
            var fmonth = (d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth());
            var fdate = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
            var formatedDate = d.getFullYear() + '-' + fmonth + '-' + fdate;
            rows[i].thoigian = formatedDate;
        }
        var values = JSON.stringify(rows);
        data.tabledata = JSON.parse(values);
        data.title = "Danh sách hóa đơn";
        res.render('hoadon', data);
    });
});
router.post('/deletehoadon', function(req, res) {
    var reqData = JSON.parse(req.body.selectedRows); // array of objects
    var string_query = `DELETE from hoadon WHERE idhoadon IN (` + reqData + `);`;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
    });
    res.redirect('/hoadon');
    res.end();
});
router.post('/inserthoadon', function(req, res) {
    var idkhachhang = req.body.idkhachhang;
    var thoigian = req.body.thoigian
    var string_query = `INSERT INTO hoadon (idkhachhang, thoigian, thanhtien) ` +
        `VALUES (` + idkhachhang + `, '` + thoigian + `', 0);`;
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    res.redirect('/hoadon');
    res.end();
});
router.post('/updatehoadon', function(req, res) {
    var reqData = JSON.parse(req.body.updatedRow);
    // reqData co dang object: 
    // { idhoadon: '13', idkhachhang: '13', thoigian: '2016-05-22' };
    //console.log(reqData);
    var string_query = `Update hoadon set ` +
        `idkhachhang = ` + reqData.idkhachhang + `, ` +
        `thoigian = '` + reqData.thoigian +
        `' WHERE idhoadon = ` + reqData.idhoadon;
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
    });
    /**/
    res.redirect('/sanpham');
    res.end();
});
// routers chi tiet hd ------------------------>
function themGia() {
    // cap nhat bao gia cho tung hd va chi tiet hd
    var update_query = ' UPDATE chitiethoadon, sanpham';
    update_query += ' SET thanhtien = soluong * dongia';
    update_query += ' WHERE (sanpham.idsanpham = chitiethoadon.idsanpham) ';
    update_query += " AND (thanhtien IS NULL OR thanhtien = '');";

    connection.query(update_query, function(err, rows, fields) {
        if (err) throw err;
        //console.log(data.khachhang);
    });
};

router.get('/cthoadon', function(req, res, next) {
    themGia();
    var data = {};
    var string_query = 'select idchitiethoadon, hoadon.idhoadon, tensp, soluong, chitiethoadon.thanhtien ' +
        'from (chitiethoadon, hoadon, sanpham) ' +
        'where (hoadon.idhoadon = chitiethoadon.idhoadon and chitiethoadon.idsanpham = sanpham.idsanpham);';
    var string_query2 = 'select * from sanpham';
    var string_query3 = 'select * from hoadon';

    connection.query(string_query2, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.sanpham = JSON.parse(values);
        //console.log(data.khachhang);
    });
    connection.query(string_query3, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.hoadon = JSON.parse(values);
        //console.log(data.khachhang);
    });
    connection.query(string_query, function(err, rows, fields) {
        if (err) throw err;
        var values = JSON.stringify(rows);
        data.tabledata = JSON.parse(values);
        data.title = "Chi tiết hóa đơn";
        res.render('cthoadon', data);
    });
});

function capnhatHoaDon() {

    var _reset = 'UPDATE hoadon';
    _reset += ' SET thanhtien = 0';
    //console.log(_reset);

    connection.query(_reset, function(err, rows) {
        if (err) throw err;
        //console.log('ahaha');
    });

    var _query = 'UPDATE hoadon, (SELECT idhoadon, sum(thanhtien) as tongtien';
    _query += ' FROM chitiethoadon GROUP BY idhoadon) as s';
    _query += ' SET hoadon.thanhtien = s.tongtien';
    _query += ' where (s.idhoadon = hoadon.idhoadon)';

    connection.query(_query, function(err, rows) {
        if (err) throw err;
        //console.log('ahaha');
    });
};
router.post('/delete-cthoadon', function(req, res) {
    var reqData = JSON.parse(req.body.selectedRows); // array of objects
    var string_query = `DELETE from chitiethoadon WHERE idchitiethoadon IN (` + reqData + `);`;
    //console.log(string_query);
    connection.query(string_query, function(err, result) {
        if (err) throw err;
        //console.log(reqData);
        capnhatHoaDon();
    });
    res.redirect('/cthoadon');
    res.end();
});
router.post('/insert-cthoadon', function(req, res) {
    var idhoadon = req.body.idhoadon;
    var idsanpham = req.body.idsanpham;
    var soluong = req.body.soluong;
    var string_query = `INSERT INTO chitiethoadon (idhoadon, idsanpham, soluong) ` +
        `VALUES (` + idhoadon + `,` + idsanpham + `,` + soluong + `);`;
    //console.log(string_query);
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        capnhatHoaDon();
    });
    res.redirect('/cthoadon');
    res.end();
});
router.post('/update-cthoadon', function(req, res) {
    var reqData = JSON.parse(req.body.updatedRow);
    // reqData co dang object: 
    /*
        {
            idchitiethoadon: '5',
            idhoadon: '6',
            idsanpham: '36',
            soluong: '4'
        }
    */
    //console.log(reqData);
    var string_query = ` Update chitiethoadon, sanpham, hoadon set ` +
        ` chitiethoadon.idhoadon = ` + reqData.idhoadon + `, ` +
        ` chitiethoadon.idsanpham = ` + reqData.idsanpham + `, ` +
        ` chitiethoadon.thanhtien = ` + reqData.soluong + `* dongia, ` +
        ` soluong =` + reqData.soluong +
        ` WHERE (idchitiethoadon = ` + reqData.idchitiethoadon + ') ' +
        ' AND (sanpham.idsanpham = chitiethoadon.idsanpham);';
    console.log(string_query);
    var idhd = reqData.idhoadon;
    connection.query(string_query, function(err, rows) {
        if (err) throw err;
        capnhatHoaDon();
        //console.log(rows);
    });
    /**/
    res.redirect('/cthoadon');
    res.end();
});
//------------------------
module.exports = router;