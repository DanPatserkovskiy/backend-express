const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    table = [{"id": 1, "name": "Даня"}, {"id": 2, "name": "Миша"}]
    res.send(table);
});

module.exports = router;
