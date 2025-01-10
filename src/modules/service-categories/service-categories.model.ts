import mongoose from 'mongoose';

export interface ServiceCategory extends mongoose.Document {
  title: string;
  img: string;
}

export const ServiceCategoryDtoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  img: { type: String, required: true },
});
