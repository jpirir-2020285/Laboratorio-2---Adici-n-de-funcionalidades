//Rutas de funciones de usuario
import { Router } from 'express'
import { get, getAll, update, eliminate, updatePassword } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { UpdateValidator } from '../../helpers/validators.js'

const api = Router()

//Rutas privadas
api.get(
    '/', 
    [ validateJwt], //Solo accesan si está logeado
    getAll
)
api.get(
    '/:id', 
    [validateJwt], //Solo accesan si está logeado
    get
)

api.put(
    '/update/:id',
    [UpdateValidator],
    update
)

api.delete(
    '/delete/:id',
    eliminate
)

api.put(
    '/updatePassword/:id',
    //[validateJwt],
    updatePassword
 )

export default api