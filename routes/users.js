const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { userDataValidator } = require('../middlewares/validators/index');

router.get('/me', getUserInfo);
router.patch('/me', userDataValidator, updateUserInfo);

module.exports = router;
