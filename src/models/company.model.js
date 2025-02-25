import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = models.Company || model('Company', CompanySchema);

export { CompanyModel };