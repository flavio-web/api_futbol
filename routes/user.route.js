const { Router } = require('express');
const { userGet, userById } = require('../controllers/user.controller');

const router = Router();


/* router.get('/', (req, res) =>{
    res.sendFile( __dirname + './public/index.html')
}); */

router.get('/', userGet );

router.get('/:id', userById );

module.exports = router;
