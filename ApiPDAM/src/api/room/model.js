import mongoose, { Schema } from 'mongoose'
import { Schedule } from '../schedule'

const roomSchema = new Schema({
  classNumber: {
    type: Number
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

roomSchema.pre('remove', function(next) {
  Schedule.remove({room: this._id}).exec();
  next();
});

roomSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      classNumber: this.classNumber
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Room', roomSchema)

export const schema = model.schema
export default model
