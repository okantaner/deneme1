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


/* BUNU SOR
var filldbK = function () {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(mongodb_connection_string, function (err, db) {
    if (err) throw err;
        var dmz = db.collection('kamil').find().toArray(function (err, items) {
        ext.push(items);               // dýþarda tanýmladýðým arraye bunu atamýyorum
        console.log(items);             // konsola yazabiliyorum, return edemiyorum
        });                                // bu itemsý bi variable a nasýl atarým
        console.log(dmz);               // bu undefined veriyo
});}                                  
*/ 


/* GET Userlist page. */
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
            getkamil(callback);
            callback();
            },
            function (callback) {
            getjr(callback);
            callback();
            },
            function (callback) {
            getokan(callback);
            callback();
            },
            function (callback) {
            getulas(callback);
            callback();
            },
            function (callback) {
            getbura(callback);
            callback();
            },
            function (callback) {
            getemre(callback);
            callback();
            },
            function(callback) {
            getonur(callback);
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



/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Adam Almaca' });
});


/* POST to Add User Service */
router.post('/adduser', function (req, res) {
    
    // Set our internal DB variable
    var db = req.db;
    var kamildb = db.get('kamil');
    var jrdb = db.get('jr');
    var okandb = db.get('okan');
    var ulasdb = db.get('ulas');
    var buradb = db.get('bura');
    var emredb = db.get('emre');
    var onurdb = db.get('onur');

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var pass = req.body.password;
    
    // Set our collection
    
    // Submit to the DB
    if (pass !== "kamil" && pass !== "jr" && pass !== "okan" && pass !== "bura" && pass !== "emre" && pass !== "onur" && pass !== "ulas") { res.send("WRONG PASSWORD")} 
    if (pass === "kamil") { kamildb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); }
    if (pass === "jr") { jrdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); }
    if (pass === "okan") { okandb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); }
    if (pass === "ulas") { ulasdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); }
    if (pass === "bura") { buradb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); } 
    if (pass === "emre") { emredb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); } 
    if (pass === "onur") { onurdb.insert({ "username" : userName, }, function (err, doc) { if (err) { res.send("There was a problem adding the information to the database."); } else { res.redirect("drafted"); } }); } 

});


module.exports = router;
