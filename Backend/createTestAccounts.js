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

// Create test accounts
async function createTestAccounts() {
  try {
    // Test accounts data
    const accounts = [
      {
        name: 'Test Student',
        email: 'test.student@example.com',
        password: 'Test@123',
        userType: 'student',
        college: 'Test College',
        student_id: 'ST12345'
      },
      {
        name: 'Test Faculty',
        email: 'test.faculty@example.com',
        password: 'Test@123',
        userType: 'faculty'
      }
    ];

    for (const account of accounts) {
      // Check if account already exists
      const existingUser = await User.findOne({ email: account.email });
      if (existingUser) {
        console.log(`Account ${account.email} already exists`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(account.password, salt);

      // Create new user
      const user = new User({
        ...account,
        password: hashedPassword
      });

      await user.save();
      console.log(`Test account created successfully: ${account.email}`);
    }

    console.log('\nTest Accounts Created Successfully!');
    console.log('\nStudent Login Credentials:');
    console.log('Email: test.student@example.com');
    console.log('Password: Test@123');
    console.log('\nFaculty Login Credentials:');
    console.log('Email: test.faculty@example.com');
    console.log('Password: Test@123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestAccounts(); 