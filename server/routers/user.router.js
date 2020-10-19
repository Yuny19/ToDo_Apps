const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/authentication');

router.post('/', UserController.create);

router.post('/login', UserController.login);

router.get('/', auth, UserController.read);

module.exports = router;