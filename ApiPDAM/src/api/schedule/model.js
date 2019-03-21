import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { Substitution } from '../substitution'

const scheduleSchema = new Schema({
  timeInterval: {
    type: Number,
  },
  dayOfWeek: {
    type: Number
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher'
  }
}, {
  strict: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

scheduleSchema.pre('remove', function(next) {
  Substitution.remove({schedule: this._id}).exec();
  next();
});

scheduleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      timeInterval: this.timeInterval,
      dayOfWeek: this.dayOfWeek,
      room: this.room,
      subject: this.subject,
      teacher: this.teacher
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

scheduleSchema.plugin(mongooseKeywords, { paths: ['room', 'subject', 'teacher'] })

const model = mongoose.model('Schedule', scheduleSchema)

export const schema = model.schema
export default model
