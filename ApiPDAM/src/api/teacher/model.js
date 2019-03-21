import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';

import { Schedule } from '../schedule';
import { User } from '../user';
import { Substitution } from '../substitution'

const teacherSchema = new Schema({
  number: {
    type: Number
  },
  substitutionsDone: {
    type: Number,
    default: 0
  },
  substituted: {
    type: [Date]
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

teacherSchema.pre('remove', function(next) {
  Schedule.remove({teacher: this._id}).exec();
  Substitution.remove({newTeacher: this._id}).exec();
  next();
});

teacherSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      name: this.name,
      picture: this.picture,
      role: this.role,
      number: this.number,
      school: this.school,
      substitutionsDone: this.substitutionsDone,
      substituted: this.substituted,
      substitutionsDone: this.substitutionsDone,
      substituted: this.substituted,
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

teacherSchema.plugin(mongooseKeywords, { paths: ['number', 'school'] })

const model = User.discriminator('Teacher', teacherSchema)

export const schema = model.schema
export default model
