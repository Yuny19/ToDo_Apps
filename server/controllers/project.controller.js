const Project = require('../model/project.model');
const ProjectMember = require('../model/project-member.model');
const Activity = require('../model/activity.model');

class ProjectController {
    static create(req, res) {
        Project.create({
            name: req.body.name,
            description: req.body.description,
            createdBy: req.user.id
        })
            .then((data) => {
                ProjectMember.create({
                    project: data._id,
                    member: req.user.id
                });
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    }

    static update(req, res) {
        Project.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        })
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    }

    static delete(req, res) {
        Project.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
                return ProjectMember.deleteMany({ project: req.params.id });
            })
            .then(()=>{
                return Activity.deleteMany({ project: req.params.id });

            })
            .then(()=>{
                res.status(200).json({
                    message: 'delete success'
                });
            })
            .catch(err => {
                res.status(404).json({
                    message: 'cant delted cause your data no found'
                })
            })
    }

    static read(req, res) {
        Project.find({ createdBy: req.user.id })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(404).json(err.message)
            })
    }
}

module.exports = ProjectController;