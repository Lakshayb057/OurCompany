import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

let isMongoConnected = false;

// 1. Inquiry Schema
const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  contact: { type: String, default: '' },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  country: { type: String, default: 'Global / Remote' },
  projectType: { type: String, default: 'Full-Stack & Cloud Engineering' },
  budgetRange: { type: String, default: 'Not decided' },
  timeline: { type: String, default: 'Flexible' },
  preferredContact: { type: String, default: 'Phone / Email' },
  description: { type: String, required: true },
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

// 2. Plan Registration Schema
const planRegistrationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  company: { type: String, default: '' },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  category: { type: String, default: 'General' },
  domainOption: { type: String, default: 'with-domain' }, // 'with-domain' | 'without-domain' | 'custom'
  billingPeriod: { type: String, default: 'One-Time' },
  estimatedPrice: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
export const PlanRegistration = mongoose.models.PlanRegistration || mongoose.model('PlanRegistration', planRegistrationSchema);

// Connect to MongoDB Atlas
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '' || uri.includes('YOUR_MONGODB_ATLAS_CONNECTION_STRING')) {
    console.log('[Database] MONGODB_URI not set in .env. Running with JSON store fallback. Set MONGODB_URI in .env to connect to MongoDB Atlas.');
    return false;
  }

  try {
    console.log('[Database] Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log('[Database] Successfully connected to MongoDB Atlas database.');
    return true;
  } catch (err) {
    console.warn('[Database] MongoDB Atlas connection warning:', err.message);
    console.log('[Database] Operating with local JSON data store fallback.');
    isMongoConnected = false;
    return false;
  }
}

export function isConnected() {
  return isMongoConnected && mongoose.connection.readyState === 1;
}

