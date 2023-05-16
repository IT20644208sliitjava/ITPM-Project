const express = require('express');
const router = express.Router();
const OneQuiz = require('../models/Model_One_Question');

// Route to get all quiz questions
router.get('/', async (req, res) => {
  try {
    const questions = await OneQuiz.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new quiz question
router.post('/addQuestion', async (req, res) => {
  const question = new OneQuiz({
    exam: req.body.exam,
    question: req.body.question,
    currectAnswer: req.body.answer,
    optionOne: req.body.optionOne,
    optionTwo: req.body.optionTwo,
    optionThree: req.body.optionThree,
    optionFour: req.body.optionFour
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single quiz question by id
router.get('/:id', getQuestion, (req, res) => {
  res.json(res.question);
});

// Route to update a quiz question
router.patch('/:id', getQuestion, async (req, res) => {
  if (req.body.question != null) {
    res.question.question = req.body.question;
  }

  if (req.body.answer != null) {
    res.question.answer = req.body.answer;
  }

  if (req.body.optionOne != null) {
    res.question.optionOne = req.body.optionOne;
  }

  if (req.body.optionTwo != null) {
    res.question.optionTwo = req.body.optionTwo;
  }

  if (req.body.optionThree != null) {
    res.question.optionThree = req.body.optionThree;
  }

  if (req.body.optionFour != null) {
    res.question.optionFour = req.body.optionFour;
  }

  if (req.body.currectAnswer != null) {
    res.question.currectAnswer = req.body.currectAnswer;
  }

  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a quiz question
router.delete('/:id', getQuestion, async (req, res) => {
  try {
    await res.question.remove();
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a quiz question by id
async function getQuestion(req, res, next) {
  let question;

  try {
    question = await OneQuiz.findById(req.params.id);

    if (question == null) {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.question = question;
  next();
}

module.exports = router;
