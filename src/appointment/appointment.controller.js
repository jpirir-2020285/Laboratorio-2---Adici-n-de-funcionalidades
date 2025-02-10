import Appointment from "./appointment.model.js"
import Animal from "../animal/animal.model.js"
import User from "../user/user.model.js"

export const save = async (req, res) => {
    const data = req.body
    try {
        const animal = await Animal.findOne({_id:data.animal})
        if (!animal) return res.status(403).send(
            {
                success: false, 
                message: 'Animal not found'
            }
        )

        const user = await User.findOne({ _id:data.client})
        if (!user) return res.status(403).send(
            {
                success: false, 
                message: 'Client not found'
            }
        )

        const appointment = new Appointment(data)
        await appointment.save()

        return res.send(
            {
                success: true, 
                message: `Appointment saved successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General Error', err })
    }
}

export const getAll = async (req,res)=>{
    try {
        const { limit = 20, skip = 0 } = req.query
        const appointment = await Appointment.find().skip(skip).limit(limit)
        if (appointment.length === 0) return res.status(404).send({message: 'Appointment not found', success: false})
            return res.send(
                {
                    success: true,
                    message: 'Appointment found: ', 
                    appointment,
                    total: appointment.length
                }
            )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const get = async (req,res) => {
    try {
        const {id} = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) return res.status(404).send(
            {
                success:false,
                message: 'Appointment not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Appointment found',
                appointment
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const update = async (req,res) => {
    try {
        const id = req.params.id
        const data = req.body
        const update = await Appointment.findByIdAndUpdate(id,data,{new:true})
    
        if (!update) return res.status(404).send(
            {
                sucess: false,
                message: 'Appointment not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Appointment Updated',
                update
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const eliminate = async (req,res) => {
    try {
        let id = req.params.id
        let eliminate = await Appointment.findByIdAndDelete(id)
        if (!id) return res.status(400).send({message: 'Invalid ID'})
        if (!eliminate) return res.status(400).send(
            {
                success:false,
                message:'Appointment not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Appointment Removed'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}