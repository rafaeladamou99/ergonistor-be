import mongoose from 'mongoose';

export interface Slider extends mongoose.Document {
  msg: string;
  imgs: string[];
}

export const SliderDtoSchema = new mongoose.Schema({
  msg: { type: String, required: true },
  imgs: { type: [String], required: true },
});
