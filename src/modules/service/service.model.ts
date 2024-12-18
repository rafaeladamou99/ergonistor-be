import mongoose from 'mongoose';

export interface Service extends mongoose.Document {
  category: string;
  title: string;
  paragraphs: string[];
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

export const ServiceDtoSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  img1: { type: String, required: true },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
  img5: { type: String },
});
