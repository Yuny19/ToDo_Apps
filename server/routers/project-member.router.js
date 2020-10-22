const router = require('express').Router();
const ProjectMemberController = require('../controllers/project-member.controller');
const auth = require('../middleware/authentication');

router.get('/sendMail/:projectId/:member', auth, ProjectMemberController.sendMail);

router.delete('/:id', auth, ProjectMemberController.deleteMember);

router.get('/:projectId', auth, ProjectMemberController.getMember);

router.get('/:projectId/:member', ProjectMemberController.addMember);

module.exports = router;
