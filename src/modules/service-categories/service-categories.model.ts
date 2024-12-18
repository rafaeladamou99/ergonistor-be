import mongoose from 'mongoose';

export interface ServiceCategory extends mongoose.Document {
  title: string;
  description: string;
  img: string;
}

export const ServiceCategoryDtoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
});
