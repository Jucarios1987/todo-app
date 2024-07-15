// Importamos el contenido del archivo "app.html"
import html from './app.html?raw';
// Importamos el contenido del archivo "todo.store.js"
import todoStore, { Filters } from '../store/todo.store';
// Importamos el archivo barril "index.js" de la carpeta "use-cases".
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {

    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilter: '.filtro',
    // Para esta referencia utilizamos # por que la estamos buscando en el HTML ppor el id.
    PendingCountLabel: '#pending-count'

};

/**
 * 
 * @param {String} elementId 
 */
// Esta funcion es la encargada de crear la aplicacion o lo que queremos renderizar en pantalla.
const App = ( elementId ) => {
    
    // Construimos la funcion "displayTodos" que es la encargada de renderizar los "Todos".
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        // console.log({ todos });
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    };

    const updatePendingCount = () =>{
        renderPending( ElementIDs.PendingCountLabel );
    };

    // Cuando la funcion App() se llama, se utiliza una funcion anonima auto invocada.
    (()=> {
        const app = document.createElement('div');
        //app.innerHTML = '<h1>Hello TODO Vite - App</h1>';
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        // Llamamos la funcion "displayTodos" para que inmediatamente se termine de renderizar todo, esta funcion es la encargada de redibujar los "Todos".
        displayTodos();
    })();

    // Referencias HTML
    // La funcion de referencias HTML se debe hacer al final por que primero se ejecuta la funcion que crea el elemento HTML entre ls lineas 30 & 37
    // Si se creara la funcion antes los elementos no estarian creados y la funcion no aria nada.
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    // Adicionamos la referencia del todo-list
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    // Adicionamos la referencia a '.clear-completed'
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
    // Adicionamos la referencia a '.filtro'
    const filtersLis = document.querySelectorAll( ElementIDs.TodoFilter );

    // Listener: Esta escuchando el evento que se dispara cuando se suelta una tecla.
    newDescriptionInput.addEventListener('keyup', ( event ) => {

        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;
        // console.log(event);
        // console.log(event.target.value);

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';

    });

    // Listener: Esta escuchando el evento click.
    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        //console.log(event.target);
        //console.log(element);
        //console.log(element.getAttribute('data-id'));
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        const isDestroyElement = event.target.className === 'destroy';
        //console.log(isDestroyElement);
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroyElement ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
        
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLis.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersLis.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            //console.log(element.target.text);
            switch ( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                    break;                                      
            };

            displayTodos();
        });
    });

};

export { App };