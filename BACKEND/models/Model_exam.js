const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  exam_title: {
    type: String,
    required: true
  },
  exam_code: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const exam = mongoose.model('exam', examSchema);
module.exports = exam;
