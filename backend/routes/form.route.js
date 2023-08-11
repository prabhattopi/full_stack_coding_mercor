// routes/form.js
const express = require('express');
const router = express.Router();
const Form = require('../models/form.model');
const crypto = require('crypto');
const authenticateToken = require('../middleware/authmiddleware');

// Create a new form
router.post('/',authenticateToken, async (req, res) => {
  try {
    const { title, questions, ownerId } = req.body;
    const uniqueLink = generateUniqueLink(); // Implement this function
    const form = new Form({ title, questions, uniqueLink, ownerId });
    await form.save();
    res.status(201).json({form});
  } catch (error) {
    res.status(500).json({ error: 'Error creating form' });
  }
});

// Get form by unique link
router.get('/:uniqueLink',authenticateToken, async (req, res) => {
  try {
    const form = await Form.findOne({ uniqueLink: req.params.uniqueLink });
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json({form});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving form' });
  }
});

// routes/form.js

router.post('/:uniqueLink',authenticateToken, async (req, res) => {
    try {
      const { userId, answers } = req.body;
      const form = await Form.findOne({ uniqueLink: req.params.uniqueLink });
  
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
  
      form.responses.push({ userId, answers });
      await form.save();
  
      res.status(201).json({ message: 'Response submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting response' });
    }
  });
  

function generateUniqueLink() {
    const linkLength = 10; // Adjust the desired length of the unique link
  
    const buffer = crypto.randomBytes(linkLength);
    const uniqueLink = buffer.toString('hex');
  
    return uniqueLink;
  }


module.exports = router;
