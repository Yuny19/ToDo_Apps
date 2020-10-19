const Activity = require('../model/activity.model');

class ActivityController {
    static read(req, res) {
        Activity.find({ $or: [{ createdBy: req.user.id }, { user: req.user.id }] })
        .populate('user', 'name')
        .populate('project', 'name')
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(404).json(err.message)
            })
    }

    static create(req, res) {
        Activity.create({
            user: req.body.user,
            project: req.body.project,
            task: req.body.task,
            createdBy: req.user.id
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static update(req, res) {
        Activity.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: req.body.status,
            }
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static delete(req, res) {
        Activity.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'delete success'
                })
                    .catch(err => {
                        res.status(404).json({
                            message: 'cant delete data not found'
                        })
                    })
            })
    }
}

module.exports = ActivityController;