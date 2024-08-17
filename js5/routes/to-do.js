const express = require('express');
const { getTo_Do, creating_to_do, get_SingleTo_Do, updateTo_Do, delete_To_Do } = require('../controllers/to-do')

const routing = express.Router();
routing.route('/').get(getTo_Do).post(creating_to_do)
routing.route('/:id').get(get_SingleTo_Do).patch(updateTo_Do).delete(delete_To_Do)


module.exports = routing