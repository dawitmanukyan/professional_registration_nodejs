const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

module.exports = router;