// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTask = new Task({
      title,
      description,
      user: req.user.id // From auth middleware
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /tasks - Get all tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /tasks/:id - Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id,
      user: req.user.id // Ensure the task belongs to the logged-in user
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    // Build task object
    const taskFields = {};
    if (title !== undefined) taskFields.title = title;
    if (description !== undefined) taskFields.description = description;
    if (completed !== undefined) taskFields.completed = completed;
    
    // Find task and update
    let task = await Task.findOne({ 
      _id: req.params.id,
      user: req.user.id // Ensure the task belongs to the logged-in user
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id,
      user: req.user.id // Ensure the task belongs to the logged-in user
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;