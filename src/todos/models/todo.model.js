// Importamos la libreria "UUID"
import {v4 as uuid } from 'uuid';

// Creamos una clase llamada "Todo" para poder hacer instncias de esta.
class Todo {

    /**
     * Constructor de la tarea.
     * @param {String} description 
     */
    constructor( description ){
        
        // Propiedades de la clase.
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();

    };
};

export { Todo };