//Modelo Animal

import { Schema, model } from "mongoose"

const animalSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [35, `Can't be overcome 25 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [50, `Can't be overcome 25 characters`]
        },
        type: {
            type: String,
            uppercase: true,
            required: [true, 'Type is required'],
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            maxLength: [10, `Can't be overcome 99 ages`]
        },
        keeper: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Keeper is required']
        },
        status:{
            type: Boolean,
            default: true,
            required: [true, 'Status is required']
        }
    },{
        versionKey: false, //Deshabilitar el __v(Version del documento)
        timestamp: true //Agrega propiedades de fecha (Fecha de creacion y de ultimo actualizacion)
    }
)

//Crear y exportar el modelo
export default model('Animal', animalSchema)