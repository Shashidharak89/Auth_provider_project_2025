const jwt = require('jsonwebtoken');
const Hive = require('../models/hiveModel');

// Signup a new member to a user (using userapi for authentication)
exports.signup = async (req, res) => {
  const { userapi, memberName, memberEmail, memberPassword } = req.body;

  try {
    if (!userapi || !memberName || !memberEmail || !memberPassword) {
      return res.status(400).json({ message: 'User API, member name, email, and password are required' });
    }

    // Find the user by their unique API key
    let hive = await Hive.findOne({ userapi });

    if (!hive) {
      // If the user doesn't exist, create a new user with userapi
      hive = new Hive({
        userapi, // Use the provided userapi for the new user
        members: [{ name: memberName, email: memberEmail, password: memberPassword }]
      });
      await hive.save();
      return res.status(201).json({
        message: 'User created and member added successfully',
        member: hive.members[0] // Return the first member details
      });
    }

    // Check if the email already exists for this user
    const emailExists = hive.members.some(member => member.email === memberEmail);
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already registered for this user' });
    }

    // If the user exists, add the new member to the user's members list
    hive.members.push({ name: memberName, email: memberEmail, password: memberPassword });
    await hive.save();

    const newMember = hive.members[hive.members.length - 1]; // Get the newly added member
    const token = jwt.sign({ hiveId: hive._id, memberEmail: newMember.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    newMember.token = token;
    await hive.save();

    res.status(200).json({
      message: 'Member added successfully to existing user',
      member: newMember // Return the newly added member with token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login a member (validate via userapi, email, and password)
exports.login = async (req, res) => {
  const { userapi, email, password } = req.body;

  try {
    if (!userapi || !email || !password) {
      return res.status(400).json({ message: 'userapi, email, and password are required' });
    }

    const hive = await Hive.findOne({ userapi });
    if (!hive) {
      return res.status(404).json({ message: 'Invalid API key' });
    }

    const member = hive.members.find(m => m.email === email && m.password === password);
    if (!member) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ hiveId: hive._id, memberEmail: member.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    member.token = token;
    await hive.save();

    res.json({
      token,
      member // Return the member details along with the token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Token verification & member data
exports.tokenVerify = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const hive = await Hive.findById(decoded.hiveId);
    const member = hive.members.find(m => m.email === decoded.memberEmail);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({
      token: req.params.token,
      member // Return member details along with the token
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Update user details (admin only)
exports.updateUser = async (req, res) => {
  const { userapi } = req.params;
  try {
    const updatedUser = await Hive.findOneAndUpdate({ userapi }, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View user data (admin only)
exports.viewData = async (req, res) => {
  const { userapi } = req.params;
  try {
    const userData = await Hive.findOne({ userapi });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userData);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

exports.verify=async(req,res)=>{
  return res.status(200).send(true);
}
