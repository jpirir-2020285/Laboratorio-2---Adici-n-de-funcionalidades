//Rutas de animal

import { Router } from 'express'
import { test, save, getAll, get, update, eliminate } from './animal.controller.js'
import { saveAnimal } from '../../helpers/validators.js'


const api = Router()

api.get('/test', test)

//rutas privadas
api.post(
    '/',
    [saveAnimal],
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