const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userById, userPost } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste } = require('../helpers/db-validators');
//const path = require('path')

const router = Router();

/* router.get('/', (req, res) =>{
    const parentDir = path.normalize(__dirname+"/..");
    res.sendFile(parentDir+'/public/index.html');
});
 */


router.get('/', userGet );

router.get('/:id', userById );

router.post('/',[
    check('email', 'El email es obligatorio.').isEmail(),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe de tener más de 5 caracteres.').isLength({ min: 5, max: 30 }),
    check('email').custom( emailExiste ),
    validarCampos
] ,userPost );

module.exports = router;
