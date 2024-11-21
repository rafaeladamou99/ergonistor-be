import mongoose from 'mongoose';

export interface Service extends mongoose.Document {
  title: string;
  paragraphs: string[];
  img: string;
}

export const ServiceDtoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  img: { type: String, required: true },
});