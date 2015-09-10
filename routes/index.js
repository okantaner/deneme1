var express = require('express');
var router = express.Router();
var async = require('async');

/* HOMEPAGE */
router.get('/', function (req, res) {
    res.redirect('drafted'); 
});

var ext = [];

/* MONGO QUERY IÇIN CLIENTLA BAÐLANTI */ 

var db_name = "deneme1";
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

/* Drafted */
    var dataHandler = function (req, res) {

    var db = req.db;
    var kamildb = db.get('kamil');
    var jrdb = db.get('jr');
    var okandb = db.get('okan');
    var ulasdb = db.get('ulas');
    var buradb = db.get('bura');
    var emredb = db.get('emre');
    var onurdb = db.get('onur');
    
   var getkamil = function () { kamildb.find({}, {}, function (e, docs) { res.locals.kamil = docs; }) };
   var getjr = function () { jrdb.find({}, {}, function (e, docs) { res.locals.jr = docs; }) };
   var getokan = function () { okandb.find({}, {}, function (e, docs) { res.locals.okan = docs; }) };
   var getulas = function () { ulasdb.find({}, {}, function (e, docs) { res.locals.ulas = docs; }) };
   var getbura = function () { buradb.find({}, {}, function (e, docs) { res.locals.bura = docs; }) };
   var getemre = function () { emredb.find({}, {}, function (e, docs) { res.locals.emre = docs; }) };
   var getonur = function () { onurdb.find({}, {}, function (e, docs) { res.locals.onur = docs; }) };

        async.parallel([
            function (callback) {
            getkamil();
            callback();
            },
            function (callback) {
            getjr();
            callback();
            },
            function (callback) {
            getokan();
            callback();
            },
            function (callback) {
            getulas();
            callback();
            },
            function (callback) {
            getbura();
            callback();
            },
            function (callback) {
            getemre();
            callback();
            },
            function(callback) {
            getonur();
            callback();
        }
        ], function (err) {
            if (err) {
            }
        else {
            setTimeout(function () { res.render('drafted'); }, 0400);
            }
        });
    };
    
    router.get('/drafted', dataHandler); 



/* Newuser */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Adam Almaca' });
});


/* Adduser */
router.post('/adduser', function (req, res) {
    
    // Monk için db parametreleri
    var db = req.db;
    var kamildb = db.get('kamil');
    var jrdb = db.get('jr');
    var okandb = db.get('okan');
    var ulasdb = db.get('ulas');
    var buradb = db.get('bura');
    var emredb = db.get('emre');
    var onurdb = db.get('onur');

    // Newuser daki formlarýn tanýmlarý
    var userName = req.body.username;
    var pass = req.body.password;    

    // DB'e aktarým
    if (pass !== "kamil" && pass !== "jr" && pass !== "okan" && pass !== "bura" && pass !== "emre" && pass !== "onur" && pass !== "ulas" && pass !== "koyaminakoykoy") { res.render('myerror', { message: "Hatali Sifre" });} 
    if (pass === "kamil") { kamildb.count({}, function (error, count) { onurdb.count({}, function (error, count2) { if (count <= count2) { { kamildb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil"}); }) }); }
    if (pass === "jr") { jrdb.count({}, function (error, count) { kamildb.count({}, function (error, count2) { if (count === count2-1) { { jrdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
    if (pass === "okan") { okandb.count({}, function (error, count) { jrdb.count({}, function (error, count2) { if (count === count2 - 1) { { okandb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
    if (pass === "ulas") { ulasdb.count({}, function (error, count) { okandb.count({}, function (error, count2) { if (count === count2 - 1) { { ulasdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
    if (pass === "bura") { buradb.count({}, function (error, count) { ulasdb.count({}, function (error, count2) { if (count === count2 - 1) { { buradb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
    if (pass === "emre") { emredb.count({}, function (error, count) { buradb.count({}, function (error, count2) { if (count === count2 - 1) { { emredb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
	if (pass === "onur") { onurdb.count({}, function (error, count) { emredb.count({}, function (error, count2) { if (count === count2 - 1) { { onurdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.render('myerror', { message: "Veritabanina baglanirken sorun olustu" }); } else { res.redirect("drafted"); } }); } } else res.render('myerror', { message: "Oyuncu secme sirasi sende degil" }); }) }); }
	if (pass === "koyaminakoykoy") {
		kamildb.remove({}, function (err) { if (err) { res.render('myerror', { message: "Silemedim" }); }})
		jrdb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); }  })
		okandb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); }  })
		ulasdb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); }  })
		buradb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); }  })
		emredb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); }  })
		onurdb.remove({}, function (err, doc) { if (err) { res.render('myerror', { message: "Silemedim" }); } else { res.redirect("drafted"); } })
	}
});

module.exports = router;

