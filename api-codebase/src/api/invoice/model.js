import mongoose, { Schema } from 'mongoose'

const invoiceSchema = new Schema({
  date: {
    type: String
  },
  description: {
    type: String
  },
  amount: {
    type: String
  },
  currency: {
    type: String
  },
  status: {
    type: String
  },
  nft: {
    type: String
  },
  receiver: {
    type: String
  },
  issuer: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      date: this.date,
      description: this.description,
      amount: this.amount,
      currency: this.currency,
      status: this.status,
      nft: this.nft,
      receiver: this.receiver,
      issuer: this.issuer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
