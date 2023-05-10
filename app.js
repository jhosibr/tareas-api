const express = require('express'); // Importa el módulo Express
const app = express(); // Crea una instancia de la aplicación Express
const port = 3000; // Define el puerto en el que se ejecutará el servidor

app.use(express.json()); // Habilita el middleware para analizar los cuerpos de las solicitudes JSON

let tasks = []; // Define una matriz para almacenar las tareas

// Define una ruta GET para obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks); // Envía la matriz de tareas como respuesta en formato JSON
});

// Define una ruta POST para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const newTask = req.body; // Obtiene la nueva tarea del cuerpo de la solicitud
  newTask.id = tasks.length + 1; // Asigna un ID a la nueva tarea
  tasks.push(newTask); // Agrega la nueva tarea a la matriz de tareas
  res.status(201).json(newTask); // Envía la nueva tarea como respuesta en formato JSON con un código de estado 201 (creado)
});

// Define una ruta GET para obtener una tarea específica por ID
app.get('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id); // Obtiene el ID de la tarea de los parámetros de la ruta y lo convierte en un número
  const task = tasks.find(task => task.id === taskId); // Busca la tarea en la matriz de tareas por ID
  if (task) {
    res.json(task); // Si se encuentra la tarea, envíala como respuesta en formato JSON
  } else {
    res.status(404).send('Task not found'); // Si no se encuentra la tarea, envía un mensaje de error con un código de estado 404 (no encontrado)
  }
});

// Define una ruta PUT para actualizar una tarea específica por ID
app.put('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id); // Obtiene el ID de la tarea de los parámetros de la ruta y lo convierte en un número
  const updatedTask = req.body; // Obtiene la tarea actualizada del cuerpo de la solicitud
  const index = tasks.findIndex(task => task.id === taskId); // Busca el índice de la tarea en la matriz de tareas por ID
  if (index !== -1) {
    tasks[index] = {...tasks[index], ...updatedTask}; // Si se encuentra la tarea, actualiza sus propiedades con las propiedades de la tarea actualizada
    res.json(tasks[index]); // Envía la tarea actualizada como respuesta en formato JSON
  } else {
    res.status(404).send('Task not found'); // Si no se encuentra la tarea, envía un mensaje de error con un código de estado 404 (no encontrado)
  }
});

// Define una ruta DELETE para eliminar una tarea específica por ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id); // Obtiene el ID de la tarea de los parámetros de la ruta y lo convierte en un número
  const index = tasks.findIndex(task => task.id === taskId); // Busca el índice de la tarea en la matriz de tareas por ID
  if (index !== -1) {
    tasks.splice(index, 1); // Si se encuentra la tarea, elimínala de la matriz de tareas
    res.status(204).send(); // Envía una respuesta vacía con un código de estado 204 (sin contenido)
  } else {
    res.status(404).send('Task not found'); // Si no se encuentra la tarea, envía un mensaje de error con un código de estado 404 (no encontrado)
  }
});

// Inicia el servidor en el puerto especificado y registra un mensaje en la consola cuando está listo para recibir solicitudes
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const cors = require('cors'); // Importa el módulo cors
app.use(cors()); // Habilita el middleware cors para permitir solicitudes desde otros orígenes

