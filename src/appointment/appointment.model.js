//Moselo de citas

import { Schema,model } from "mongoose"

const appointmentSchema = Schema(
    {
        name:{
            type: String
        },
        description:{
            type: String,
            required: [true, 'Date is required'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        client:{
            type: String,
            required: [true, 'Client is required']
        },
        animal: {
            type: String,
            required: [true, 'Animal is required']
        },
        status:{
            type: Boolean,
            default: true,
            required: [true, 'Status is required']
        }
    }
)

export default model('Appointment', appointmentSchema)