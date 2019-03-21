import mongoose, { Schema } from 'mongoose'
import { Subject } from '../subject'

const gradeSchema = new Schema({
  name: {
    type: String
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


gradeSchema.pre('remove', function(next) {
  Subject.remove({grade: this._id}).exec();
  next();
});

gradeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Grade', gradeSchema)

export const schema = model.schema
export default model
