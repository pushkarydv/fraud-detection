import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GplayAppVariablesSchema = new Schema(
  {
    appId: { type: String, required: true, unique: true },
    appType: { type: String, default: '' },
    company: { type: String, default: '' },
    comment: { type: String, default: '' },
    tag: { type: String, default: '' },
    appMarkedOn: { type: Date, default: null },
    appDeletedOn: { type: Date, default: null },
    countries: { type: [String], default: [] },
    status: { type: String, default: '' },
    source: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const GplayAppVariablesModel = model(
  'GplayAppVariables',
  GplayAppVariablesSchema
);
const AstoreVariablesModel = model(
  'AstoreVariables',
  GplayAppVariablesSchema
);

export { GplayAppVariablesModel, AstoreVariablesModel };
