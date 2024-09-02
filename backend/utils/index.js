import bcrypt from 'bcrypt';

const testPassword = async () => {
  const password = '12345';
  const SALT_ROUNDS = 10;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  console.log("Generated hash:", hashedPassword);

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password match:", isMatch);
};

testPassword();
