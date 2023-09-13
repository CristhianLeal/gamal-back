import { model, Schema } from 'mongoose'

const MetricSchema = new Schema(
  {
    description:
    {
      type: String,
      required: [true, 'La descripción es requerida']
    },
    people:
    {
      type: String
    },
    man:
    {
      type: String
    },
    woman:
    {
      type: String
    },
    face:
    {
      type: String
    },
    insta:
    {
      type: String
    },
    twitter:
    {
      type: String
    },
    youtube:
    {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default model('Metric', MetricSchema)
