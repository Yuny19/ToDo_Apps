const mongoose = require('mongoose');
const schema = mongoose.Schema;

activitySchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    project: {
        type: schema.Types.ObjectId,
        ref: 'Project',
        default:null
    },
    task: {
        type: String,
        required: 'task is required'
    },
    status: {
        type: String,
        default: 'on going'
    },
    createdBy: {
        type: schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;