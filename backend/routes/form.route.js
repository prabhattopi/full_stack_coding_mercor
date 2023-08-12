// routes/form.js
const express = require('express');
const router = express.Router();
const Form = require('../models/form.model');
const crypto = require('crypto');
const authenticateToken = require('../middleware/authmiddleware');


//Get the Forms 
router.get('/',authenticateToken, async (req, res) => {
    const userId = req.userId;
    try {
        const form = await Form.find({ownerId:userId});
        return res.status(200).json({form})
    } catch (error) {
      res.status(500).json({ error: 'Error creating form' });
    }
  });


// Create a new form
router.post('/',authenticateToken, async (req, res) => {
  try {
    const { title, questions, ownerId } = req.body;
    if(!title||!questions){
      
        return res.status(404).json({ message: 'Please fill the every fields' });
    }
    const uniqueLink = generateUniqueLink(); // Implement this function
    const form = new Form({ title, questions, uniqueLink, ownerId });
    await form.save();
    res.status(201).json({form,link:uniqueLink});
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
      const { userId, answers, useremail} = req.body;
      const form = await Form.findOne({ uniqueLink: req.params.uniqueLink });
  
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
      if(form.responses.find(e=>e.userId==userId)){
          return res.status(200).json({message:"you have alredy responded"})
      }
       // Check if all questions have answers
    const unansweredQuestionIndexes = form.questions
    .map((_, index) => index)
    .filter((index) => !answers[index]);

  if (unansweredQuestionIndexes.length > 0) {
    return res.status(400).json({
      error: `Please answer all questions. Unanswered questions: ${unansweredQuestionIndexes.join(', ')}`,
    });
  }
     
  
      form.responses.push({ userId, answers,useremail });
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
