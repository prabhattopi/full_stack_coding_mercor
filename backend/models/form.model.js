const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [{
    type: String,
    required: true,
  }],
  uniqueLink: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      
  },
  responses: [{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    useremail:{
        type:String,
        required: true,
        unique:true
    },
    answers: [{
        questionIndex: {
            type: Number,
            required: true,
          },
      answer: {
        type: String,
        required: true,
      },
    }],
  }],
});

module.exports = mongoose.model('Form', formSchema);
