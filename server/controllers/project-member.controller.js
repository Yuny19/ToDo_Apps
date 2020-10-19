const ProjectMember = require('../model/project-member.model');

const sendMail = require('../helpers/send-mail.helper');

class ProjectMemberController {
    static addMember(req, res) {
        ProjectMember.create(req.body)
            .populate('user')
            .populate('project')
            .then(data => {
                let text =`you added in project ${data.project.name}`
                sendMail(data.user.email, "PROJECT ADD MEMBER", text);
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
        ProjectMember.find({ project: req.params.projectId})
        .populate('member', 'name')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err.message);
            })
    }
}

module.exports = ProjectMemberController;