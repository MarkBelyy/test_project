const path = require('path');
const createPath = require('../helpers/create-path');
const Devices = require('../models/devices');
const mongoose = require('mongoose');
const { Types } = mongoose;

const handleError = (res, error) => {
    console.log('Error:', error);
    res.render(createPath('error'), { title: 'Ошибка' })
}

const getMain = (req, res) => {
    const title = 'Главная';
    Devices
        .find()
        .then((devices) => {
            res.render(createPath('main'), { devices, title })
        })
        .catch((err) => handleError(res, err));
};

const getAnalytics = (req, res) => {
    const title = 'Аналитика';
    Devices
        .findOne()
        .then((device) => {
            res.render(createPath('analytics'), { device, title });
        })
        .catch((err) => handleError(res, err));
};

const getSearch = (req, res) => {
    const searchQuery = req.query.query.trim();
    const searchRegex = new RegExp(searchQuery, 'i');
    Devices
        .find({ name: searchRegex })
        .then(devices => {
            res.json(devices);
        })
        .catch((err) => handleError(res, err));
};

const getAnalyticsDevice = (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return handleError(res, 'Invalid ObjectId');
    }
    const title = 'Аналитика';
    Devices
        .findById(req.params.id)
        .then(device => {
            res.render(createPath('analytics'), { device, title });
        })
        .catch((err) => handleError(res, err));
};

const getDevice = (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return handleError(res, 'Invalid ObjectId');
    }
    Devices
        .findById(req.params.id)
        .then(device => {
            res.json(device);
        })
        .catch((err) => handleError(res, err));
};

const postWork = (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return handleError(res, 'Invalid ObjectId');
    }
    Devices
        .findByIdAndUpdate(req.params.id, { $set: { free: req.body.free } })
        .then(() => res.json({ message: "Success" }))
        .catch((err) => handleError(res, err));
};

const postLike = (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return handleError(res, 'Invalid ObjectId');
    }
    Devices
        .findByIdAndUpdate(req.params.id, { $set: { like: req.body.like } })
        .then(() => res.json({ message: "Success" }))
        .catch((err) => handleError(res, err));
};

const postNotification = (req, res) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return handleError(res, 'Invalid ObjectId');
    }
    Devices
        .findByIdAndUpdate(req.params.id, { $set: { notification: req.body.notification } })
        .then(() => res.json({ message: "Success" }))
        .catch((err) => handleError(res, err));
}

module.exports = {
    getMain,
    getAnalytics,
    getSearch,
    getAnalyticsDevice,
    getDevice,
    postWork,
    postLike,
    postNotification
};

