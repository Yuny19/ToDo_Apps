const router = require('express').Router();
const ActivityController = require('../controllers/activity.controller');
const auth = require('../middleware/authentication');

router.post('/', auth, ActivityController.create);

router.get('/', auth, ActivityController.read);

router.put('/:id', auth, ActivityController.update);

router.delete('/:id', auth, ActivityController.delete);

module.exports = router;