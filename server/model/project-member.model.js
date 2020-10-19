const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectMemberSchema = new schema({
    project: {
        type: schema.Types.ObjectId,
        ref: 'Project',
        required: 'you must input project'
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        required: 'you must input member'
    }
});

const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);

module.exports = ProjectMember;