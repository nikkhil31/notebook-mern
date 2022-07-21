import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
