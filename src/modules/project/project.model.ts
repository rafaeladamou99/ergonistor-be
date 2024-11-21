import mongoose from 'mongoose';

export interface Project extends mongoose.Document {
  title: string;
  paragraphs: string[];
  img: string;
}

export const ProjectDtoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
  img: { type: String, required: true },
});
