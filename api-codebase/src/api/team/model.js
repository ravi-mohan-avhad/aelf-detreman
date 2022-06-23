import mongoose, { Schema } from 'mongoose'

const teamSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  teamleader: {
    type: String
  },
  manager: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

teamSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      status: this.status,
      teamleader: this.teamleader,
      manager: this.manager,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Team', teamSchema)

export const schema = model.schema
export default model
