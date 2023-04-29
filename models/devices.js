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
    usings: {
        type: Array,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
});

const Devices = mongoose.model('Devices', devicesSchema);

module.exports = Devices;
