const express = require('express');
const router = express.Router();
const Exam = require('../models/Model_exam');
const OneQuestion = require('../models/Model_One_Question');

router.get('/totalQuestions/:examCode', async (req, res) => {
  try {
    const { examCode } = req.params;
    const questions = await OneQuestion.countDocuments({ exam: examCode }, null, { timeout: 300000 });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/totalQuestionsForExam/:examCode', async (req, res) => {
  try {
    const { examCode } = req.params;
    const questions = await OneQuestion.find({ exam: examCode });
    res.json(questions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/searchExam/:searchText', async (req, res) => {
  try {
    const searchText = req.params.searchText;
    const exams = await Exam.find({ exam_title: { $regex: searchText, $options: 'i' } });
    res.status(200).send(exams);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET all exams and their questions
router.get('/getAllExam', async (req, res) => {
  try {
    const quizzes = await Exam.aggregate([
      {
        $lookup: {
          from: 'one_quizzes',
          localField: 'exam_code',
          foreignField: 'exam',
          as: 'questions'
        }
      },
      {
        $project: {
          _id: 1,
          subject: 1,
          exam_title: 1,
          exam_code: 1,
          duration: 1,
          timestamp: 1,
          question_count: { $size: '$questions' }
        }
      }
    ]);
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// GET a specific quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Exam.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// CREATE a new quiz
router.post('/addExam', async (req, res) => {
  const { subject, exam_title, exam_code , duration } = req.body;
  try {
    const quiz = new Exam({
      subject,
      exam_title,
      exam_code ,
      duration
    });
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// UPDATE a quiz by ID
router.put('/:id', async (req, res) => {
  const { subject, question_title, quiz_code , duration } = req.body;
  try {
    let quiz = await Exam.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    quiz.subject = subject || quiz.subject;
    quiz.question_title = question_title || quiz.question_title;
    quiz.quiz_code = quiz_code || quiz.quiz_code;
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a quiz by ID
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Exam.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    await quiz.remove();
    res.json({ message: 'Quiz removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
