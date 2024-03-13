
const express = require('express');
const router = express.Router();

let tasks = [];

const users = [
  { username: 'haniya', password: 'haniya123' },
  { username: 'aiyza', password: 'aiyza123' }
];


const login = (req, res, next) => {

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'invalid credentials' });
  }
  next();

};

router.post('/Addtasks', login, (req, res) => {
  const { title, description, duedate, category,priority } = req.body;

  const task = {
    id: tasks.length + 1,
    title,
    description,
    duedate,
    category,
    priority,
    completed: false,
  };
  tasks.push(task);
  res.status(201).json({ message: 'task created', task });
});

router.get('/tasks', login, (req, res) => {
  res.json(tasks);
});

router.put('/tasks/:taskid', login, (req, res) => {
  const taskid = parseInt(req.params.taskid);
  const taskindex = tasks.findIndex(task => task.id === taskid);

  if (taskindex !== -1)
   {
    tasks[taskindex].completed = true;
    res.json({ message: 'task marked as completed', task: tasks[taskindex] });
  } else 
  {
    res.status(404).json({ message: 'task not found' });
  }
});

router.get('/tasks/:option', login, (req, res) => {

  const option = req.params.option;
  let tasks;
  switch (option) 
  {
    case 'duedate':
      tasks = tasks.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
      break;

    case 'status':
    tasks = tasks.sort((a, b) => a.completed - b.completed);
    break;
    case 'category':
      tasks = tasks.sort((a, b) => a.category.localeCompare(b.category));
      break;
  
  }
  res.json(tasks);
});

router.post('/login', (req, res) => {
  res.status(200).json({ message: 'login successful' });
});

router.post('/signup',  (req, res) => {
    const { username,password } = req.body;
  
    const user = {
      username,
      password,
    };
    users.push(user);
    res.status(201).json({ message: 'user created', user});
  });
module.exports = router;
