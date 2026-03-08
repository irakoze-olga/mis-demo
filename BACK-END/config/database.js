const mongoose = require('mongoose');
const debug = require('debug')('app:database');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    console.log('🔗 Connecting to MongoDB Atlas...');

   await mongoose.connect(dbURI, {
  tls: true,
});


    debug('✅ MongoDB connected');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    debug('❌ MongoDB connection error:', error.message);
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB runtime error:', error.message);
});

module.exports = connectDB;
