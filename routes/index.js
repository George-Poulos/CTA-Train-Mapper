let express = require('express');
let router = express.Router();
let getTrainJSON = require('../Services/GetCTAJSON');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

module.exports = router;
