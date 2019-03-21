import mongoose, { Schema } from 'mongoose'
import { Schedule } from '../schedule'
const subjectSchema = new Schema({
  name: {
    type: String
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Grade'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

subjectSchema.pre('remove', function(next) {
  Schedule.remove({subject: this._id}).exec();
  next();
});

subjectSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      grade: this.grade
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Subject', subjectSchema)

export const schema = model.schema
export default model
