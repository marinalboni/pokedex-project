const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers')
const authMiddlewares = require('../middlewares/authMiddlewares')
const fileUploader = require('./cloudinary.config')
const pokeController = require('../controllers/poke.controllers')

const SCOPES = [
    "profile",
    "email"
]

//POKEMONS
router.get('/', (req, res, next) => { res.redirect('/pokemon/page/0')})
router.get('/pokemon/page/:page', pokeController.home); 
router.get('/pokemon/:name', pokeController.detail);

//AUTH
router.get('/register', authMiddlewares.isNotAuthenticated, authController.register);
router.post('/register', authMiddlewares.isNotAuthenticated, fileUploader.single('image'), authController.doRegister);
router.get('/login', authMiddlewares.isNotAuthenticated, authController.login);
router.post('/login', authMiddlewares.isNotAuthenticated, authController.doLogin);
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }))
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle)
router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);
router.get('/activate/:token', authMiddlewares.isNotAuthenticated, authController.activateAccount)

//USER
router.get('/profile', authMiddlewares.isAuthenticated, (req, res, next) => {res.render('users/profile')})


module.exports = router;