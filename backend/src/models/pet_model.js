import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const petSchema = new mongoose.Schema({
  name: {
    type:String,
    trim: true,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "PetCategory",
    required: true,
  },
  adopted: {
    type: Boolean,
    default: false
  },
  photo: {
    data: Buffer,
    contentType: String
  },
})
 

export default mongoose.model('Pet', petSchema)