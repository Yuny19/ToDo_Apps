const mongoose = require('mongoose');
const schema = mongoose.Schema;

projectSchema = new schema({
    name: {
        type: String,
        required: 'name is required'
    },
    description: {
        type: String
    },
    createdBy: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;