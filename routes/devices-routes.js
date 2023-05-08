const express = require('express');
const router = express.Router();
const {
    getMain,
    getAnalytics,
    getSearch,
    getAnalyticsDevice,
    getDevice,
    postWork,
    postLike,
    postNotification
} = require('../controllers/devices-controller');


router.get('/', getMain);
router.get('/search', getSearch);
router.get('/analytics', getAnalytics);
router.get('/analytics/:id', getAnalyticsDevice);
router.get('/device/:id', getDevice);
router.post('/device/work/:id', postWork);
router.post('/device/like/:id', postLike);
router.post('/device/notification/:id', postNotification);

module.exports = router;