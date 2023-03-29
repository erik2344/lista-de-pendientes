// Se importan los módulos de express, body-parser y ejs.
const express = require('express');
const bodyParser = require('body-parser');
require('ejs');

// Se crea una instancia de la aplicación express y se establece el puerto en el que se ejecutará el servidor.
const app = express();
const PORT = 3000;

// El middleware de body-parser se utiliza para analizar los datos del cuerpo de las solicitudes entrantes.
app.use(bodyParser.urlencoded({ extended: true }));

// Se establece el motor de vista de EJS.
app.set('view engine', 'ejs');

//matriz para almacenar tareas
let tasks = [];

// La ruta raíz se define para mostrar la plantilla EJS con las tareas.
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// La ruta /add-task se define para agregar una tarea al arreglo.
app.post('/add-task', (req, res) => {
  const task = req.body.task.trim();

  if (task === '') {
    // Si el usuario no ingresó una tarea, se muestra una alerta en una ventana emergente y se redirecciona a la página anterior.
    res.send('<script>alert("La tarea no puede estar vacía"); history.back()</script>');
  } else if (tasks.includes(task)) {
    // Si la tarea ya existe en el arreglo, se muestra una alerta en una ventana emergente y se redirecciona a la página anterior.
    res.send('<script>alert("La tarea ya existe"); history.back()</script>');
  } else {
    // Si la tarea no está vacía y no existe en el arreglo, se agrega al arreglo y se redirecciona a la página principal.
    tasks.push(task);
    res.redirect('/');
  }
});

// La ruta /remove-task se define para eliminar una o varias tareas del arreglo.
app.post('/remove-task', (req, res) => {
  const indexes = req.body.indexes;

  if (!Array.isArray(indexes)) {
  // Si el usuario no ha seleccionado ninguna tarea, se muestra una alerta en una ventana emergente y se redirecciona a la página anterior.
    res.send('<script>alert("No se ha seleccionado ninguna tarea"); history.back()</script>');
  } else {
   // Si el usuario ha seleccionado una o varias tareas, se eliminan del arreglo y se redirecciona a la página principal.
    tasks = tasks.filter((task, index) => !indexes.includes(index.toString()));
    res.redirect('/');
  }
});

// El servidor se inicia y se muestra un mensaje en la consola para confirmar que el servidor está en ejecución en el puerto especificado.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});