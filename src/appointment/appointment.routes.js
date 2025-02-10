import { Router } from 'express'
import { save, getAll, get, update, eliminate } from './appointment.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { validateClient } from '../../helpers/validate.role.js';

const api = Router()

api.post(
    '/', 
    [validateJwt, validateClient],
    save
)

api.get(
    '/',
    getAll
)

api.get(
    '/:id',
    get
)

api.put(
    '/update/:id',  
    update
)

api.delete(
    '/delete/:id',
    eliminate
)

export default api