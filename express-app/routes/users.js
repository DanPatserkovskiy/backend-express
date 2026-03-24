const express = require('express');
const router = express.Router();
items = [{id: 1, name: 'Миша'}, {id: 2, name: 'Даня'}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(items);
});

router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  const user = items.find(item => item.id === +id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'Пользователь не найден'});
  }
});

router.post('/', function(req, res, next) {
  const {name} = req.body;
  const newUser = {id: items.length + 1, name};
  items.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
