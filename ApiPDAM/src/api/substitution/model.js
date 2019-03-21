import mongoose, { Schema } from 'mongoose'

const substitutionSchema = new Schema({
  date: {
    type: Date
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  newTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

substitutionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      date: this.date,
      schedule: this.schedule,
      newTeacher: this.newTeacher
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Substitution', substitutionSchema)

export const schema = model.schema
export default model
