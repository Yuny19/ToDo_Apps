const router = require('express').Router();
const ProjectMemberController = require('../controllers/project-member.controller');
const auth = require('../middleware/authentication');

router.post('/', auth, ProjectMemberController.addMember);

router.delete('/:id', auth, ProjectMemberController.deleteMember);

router.get('/:projectId', auth, ProjectMemberController.getMember);

module.exports = router;
