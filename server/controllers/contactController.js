const Contact = require('../models/Contact');

const inMemoryContacts = [];

// @desc    Submit contact us form message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const contactMsg = await Contact.create({
        name,
        email,
        subject,
        message,
      });
      return res.status(201).json({ success: true, message: 'Your message has been sent successfully!', data: contactMsg });
    } catch (dbErr) {
      const msg = {
        _id: 'contact_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };
      inMemoryContacts.push(msg);
      return res.status(201).json({ success: true, message: 'Your message has been received!', data: msg });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContact };
