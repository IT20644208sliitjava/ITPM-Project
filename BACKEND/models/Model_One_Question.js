const mongoose = require('mongoose');

const quizOneSchema = new mongoose.Schema({
  exam: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  optionOne: {
    type: String,
    required: true
  },
  optionTwo: {
    type: String,
    required: true
  },
  
  optionThree: {
    type: String,
    required: true
  },
  
  optionFour: {
    type: String,
    required: true
  },
  
  currectAnswer: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const OneQuize = mongoose.model('one_quiz', quizOneSchema);
module.exports = OneQuize;
