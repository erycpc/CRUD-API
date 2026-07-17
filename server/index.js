const express = require('express')

const app = express()
app.use(express.json())

const tasks = [
  { id: 1, title: 'Task 1', done: false },
  { id: 2, title: 'Task 2', done: true },
  { id: 3, title: 'Task 3', done: false }
]

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks)
})

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const task = tasks.find(t => t.id === taskId)

  if (task) {
    res.status(200).json(task)
  } else {
    res.status(404).json({ "error": `${taskId} not found` })
  }
})

app.post('/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ "error": "Title is required" })
  }
  const newTask = {
    id: tasks.map(t => t.id).reduce((maxId, id) => Math.max(maxId, id), 0) + 1,
    title: req.body.title,
    done: false
  }
  
  tasks.push(newTask)
  res.status(201).json(newTask)
})

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const task = tasks.find(t => t.id === taskId)

  if (!req.body.title || typeof req.body.done !== 'boolean') {
  return res.status(400).json({ "error": "Title and done are required" })
  }
  if (!task) {
  return res.status(404).json({ "error": `${taskId} not found` })
  }
  task.title = req.body.title
  task.done = req.body.done
  res.status(200).json(task)
})

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === taskId)

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1)
    res.status(204).send()
  } else {
    res.status(404).json({ "error": `${taskId} not found` })
  }
})

app.get('/', (req, res) => {
  res.status(200).json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] })
})

app.get('/health', (req, res) => {
  res.status(200).json({ "status": "ok" })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})