
import Animal  from "./animal.model.js"
import User from "../user/user.model.js"

export const test = (req, res)=>{
    return res.send({message: 'Todo good'})
}

//Función para registrar un animal
export const save = async(req, res) => {
    const data = req.body
    try {
        
        const user = await User.findOne({ _id:data.keeper, role: 'ADMIN' })
 
        if (!user) return res.status(403).send({success: false, message: 'keeper not found'})
        const animal = new Animal(data)
 
        await animal.save()
        return res.send({success: true, message: `${animal.name} saved successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General error when adding animal'})
    }
}

export const getAll = async (req,res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const animal = await Animal.find().skip(skip).limit(limit)
        if (animal.length === 0) return res.status(404).send({message: 'Animal not found', success: false})
            return res.send(
                {
                    success: true,
                    message: 'Animal found: ', 
                    animal,
                    total: animal.length
                }
            )
    } catch (error) {
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
        const animal = await Animal.findById(id)
        if (!animal) return res.status(404).send(
            {
                success:false,
                message: 'Animal not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Animal found',
                animal
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
        const update = await Animal.findByIdAndUpdate(id,data,{new:true})

        if (!update) return res.status(404).send(
            {
                sucess: false,
                message: 'Animal not found'
            }
        )
            return res.send(
                {
                    success: true,
                    message: 'Animal Updated',
                    update
                }
            )
    } catch (error) {
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
        let eliminate = await Animal.findByIdAndDelete(id)
        if (!id) return res.status(400).send({message: 'Invalid ID'})
        if (!eliminate) return res.status(400).send(
            {
                success:false,
                message:'Animal not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Animal Removed'
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