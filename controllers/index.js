const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const signupRoutes = require('./signupRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
