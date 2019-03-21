import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import {Teacher} from '../teacher'
import {Grade} from '../grade'
import {Room} from '../room'
const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subscriptionEnd: {
    type: Date,
    required: true
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  }
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })


schoolSchema.pre('remove', function (next) {
  Teacher.remove({ school: this._id }).exec();
  Grade.remove({ school: this._id }).exec();
  Room.remove({ school: this._id }).exec();
  next();
});

schoolSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      subscriptionEnd: this.subscriptionEnd,
      contact: this.contact,
      address: this.address,
      city: this.city,
      country: this.country
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

schoolSchema.plugin(mongooseKeywords, { paths: ['name', 'contact'] })

const model = mongoose.model('School', schoolSchema)

export const schema = model.schema
export default model
