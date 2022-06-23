import mongoose, { Schema } from 'mongoose'

const personSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  contactnumber: {
    type: String
  },
  startdate: {
    type: String
  },
  status: {
    type: String
  },
  walletaddress: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

personSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
      address: this.address,
      contactnumber: this.contactnumber,
      startdate: this.startdate,
      status: this.status,
      walletaddress: this.walletaddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Person', personSchema)

export const schema = model.schema
export default model
