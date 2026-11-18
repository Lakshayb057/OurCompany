import { connectDB, SiteContentModel } from '../server/db.js';

async function syncMCA() {
  try {
    await connectDB();
    const res = await SiteContentModel.findOneAndUpdate(
      {},
      {
        $set: {
          'siteSettings.companyName': 'Codrix Private Limited',
          'siteSettings.legalHeadquarters': 'Registered Office: Aggarwal Colony, Fatehabad, Haryana - 125050, India • CIN: U62011HR2026PTC153058',
          'siteSettings.contactPhone': '+91 98123 86832',
          updatedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );
    console.log('MongoDB Atlas SiteContent updated successfully:', res?.siteSettings);
    process.exit(0);
  } catch (err) {
    console.error('Error syncing MCA to MongoDB Atlas:', err);
    process.exit(1);
  }
}

syncMCA();
