import './style.css';
import { App } from './src/todos/app';
import todoStore from './src/store/todo.store';

console.log(`Hello TODO Vite - App`);

todoStore.initStore();

// Invocamos la funcion App() de nuestra carpeta 'todos/app.js'
// Esta funcion pide como parametro el string del elemento en el cual se quiere renderizar la aplicacipon
// En nuestro caso renderizaremos la aplicacion en el "div" con id "app" <div id="app"></div>
App('#app');