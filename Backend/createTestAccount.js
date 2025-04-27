import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/higher_studies_portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  college: String,
  student_id: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Create test account
async function createTestAccount() {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test.student@example.com' });
    if (existingUser) {
      console.log('Test account already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Test@123', salt);

    // Create new user
    const user = new User({
      name: 'Test Student',
      email: 'test.student@example.com',
      password: hashedPassword,
      userType: 'student',
      college: 'Test College',
      student_id: 'ST12345'
    });

    await user.save();
    console.log('Test account created successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

const testUser = {
  name: 'Test Student',
  email: 'test.student@example.com',
  password: 'Test@123',
  userType: 'student',
  college: 'Test College',
  student_id: 'ST12345'
};

createTestAccount(); 