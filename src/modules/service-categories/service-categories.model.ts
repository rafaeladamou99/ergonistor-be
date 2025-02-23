import mongoose from 'mongoose';

export interface ServiceCategory extends mongoose.Document {
  title: string;
}

export const ServiceCategoryDtoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});
