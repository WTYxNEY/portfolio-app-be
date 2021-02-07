const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    selectedFile: {
        type: String,
        required: true
    },
    position: {
        type: String,
        enum: ['Front-End', 'Back-End', 'UX/UI', 'Network', 'Infrastructure','Other'],
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);