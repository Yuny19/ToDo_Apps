const router = require('express').Router();
const ProjectController = require('../controllers/project.controller');
const auth = require('../middleware/authentication');

router.post('/', auth, ProjectController.create);

router.get('/', auth, ProjectController.read);

router.put('/:id', auth, ProjectController.update);

router.delete('/:id', auth, ProjectController.delete);

module.exports = router;