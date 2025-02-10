//Lógica de negocio

import User from "./user.model.js"
import {checkPassword, encrypt} from '../../utils/encrypt.js'

export const getAll = async(req, res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find().skip(skip).limit(limit)
        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
            }
        )
    }catch(err){
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

//Obtener 1 usuario por su ID
export const get = async(req, res)=>{
    try{
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                sucess: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    }catch(err){
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

export const update = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const update = await User.findByIdAndUpdate(id,data,{new:true})

        //if(!id) return res.status(400).send({message: 'Invalid ID'})

        //if (data.password) return res.status(400).send({message: 'Password not editable'})
        
        if (!update)return res.status(404).send({message: 'User not found'})
            return res.send({message: 'User updated succesfully', update})
    } catch (err) {
        console.console.log(err)
        return res.status(500).send({message: 'General Error',err})
    }
}

export const eliminate = async(req, res)=>{
    try {
        let id = req.params.id
        let eliminate= await User.findByIdAndDelete(id)
        
        if (!id) return res.status(400).send({message: 'Invalid ID'})
        if (!eliminate)return res.status(404).send({Message: 'User not found'})
            return res.send({message: 'User deleted succesfully'})
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

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body

        const user = await User.findById(id)
        if (!user) return res.status(404).send({ message: 'User not found' })
            
            const passwordMatch = await checkPassword(user.password, oldPassword)
        if (!passwordMatch) return res.status(400).send({ message: 'Incorrect current password' })

        user.password = await encrypt(newPassword)
        await user.save()

        return res.send({ message: 'Password updated successfully' })
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