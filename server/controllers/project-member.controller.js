const ProjectMember = require('../model/project-member.model');
const User = require('../model/user.model');
const sendMail = require('../helpers/send-mail.helper');

class ProjectMemberController {
    static sendMail(req, res) {
        let html = `<b> yupa zup</b>`

        User.findOne({ _id: req.body.member })
            .then(data => {
                sendMail(data.email, "PROJECT ADD MEMBER", html);
            })
    }
    static addMember(req, res) {
        ProjectMember.create({
            project: req.params.projectId,
            member: req.params.member
        })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static deleteMember(req, res) {
        ProjectMember.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'delete success'
                })
            })
            .catch(err => {
                res.status(404).json(err.message)
            })
    }

    static getMember(req, res) {
        ProjectMember.find({ project: req.params.projectId })
            .populate('member')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err.message);
            })
    }
}

module.exports = ProjectMemberController;