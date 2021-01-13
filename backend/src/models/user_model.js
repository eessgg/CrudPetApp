import mongoose, { model } from 'mongoose'

const UserSchema = new mongoose.Schema({
   name: {type: String, required: true},
   email: {type: String, required: true},
   password: {type: String, required: true},
   permissionLevel: {type: Number, required: true}
})


export default mongoose.model('User', UserSchema)