const mongoose = require('mongoose');
const Schema = mongoose.Schema

const devicesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    like: {
        type: Boolean,
        required: true,
    },
    using: {
        type: Array,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    free: {
        type: Boolean,
        required: true,
    }
});

const Devices = mongoose.model('Devices', devicesSchema);

module.exports = Devices;