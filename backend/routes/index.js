var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./congress.db');
/* GET home page. */
    router.get('/:id/:billtype', function(req, res, next) {
        var congress = req.params.id;
        console.log(congress);
        var billtype = req.params.billtype;
        db.serialize((function(){
            db.all("SELECT * from "+congress+" WHERE bill_version_id LIKE "+"'"+req.params.billtype+"_%'"+ " ORDER BY issued_on" ,function(err,row){
            res.json(row);
            });
        }
)
        )});
    //const congressnumber = db.get(req.params.id)

module.exports = router;
