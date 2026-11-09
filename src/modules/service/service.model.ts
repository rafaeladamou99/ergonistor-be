import mongoose from 'mongoose';

export interface Service extends mongoose.Document {
  category: string;
  title: string;
  paragraphs: string[];
}

export const ServiceDtoSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
});
