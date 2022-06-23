import mongoose, { Schema } from 'mongoose'

const ownerSchema = new Schema({
  transferdate: {
    type: String
  },
  description: {
    type: String
  },
  sender: {
    type: String
  },
  receiver: {
    type: String
  },
  level1approver: {
    type: String
  },
  level2approver: {
    type: String
  },
  level1status: {
    type: String
  },
  level2status: {
    type: String
  },
  overallstatus: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ownerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      transferdate: this.transferdate,
      description: this.description,
      sender: this.sender,
      receiver: this.receiver,
      level1approver: this.level1approver,
      level2approver: this.level2approver,
      level1status: this.level1status,
      level2status: this.level2status,
      overallstatus: this.overallstatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Owner', ownerSchema)

export const schema = model.schema
export default model
