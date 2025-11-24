const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    console.log('Seeding Local JSON DB...');

    // Admin User
    const adminEmail = 'admin@hopeconnect.com';
    const adminPassword = 'admin123';
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);
      admin = new User({
        name: 'Admin User',
        email: adminEmail,
        password: hashedAdminPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Normal User
    const userEmail = 'user@hopeconnect.com';
    const userPassword = 'user123';
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedUserPassword = await bcrypt.hash(userPassword, salt);
      user = new User({
        name: 'Normal User',
        email: userEmail,
        password: hashedUserPassword,
        role: 'user'
      });
      await user.save();
      console.log('Normal user created');
    } else {
      console.log('Normal user already exists');
    }

    console.log('\n--- Credentials ---');
    console.log(`Admin: ${adminEmail} / ${adminPassword}`);
    console.log(`User:  ${userEmail} / ${userPassword}`);
    console.log('-------------------');

  } catch (err) {
    console.error(err);
  }
};

seedUsers();
