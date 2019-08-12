const template = document.createElement('template');

template.innerHTML = `
    <h1>Simple To-Do App</h1>

    <form id='to-do-form'>

        <input type='text' 
               id='to-do-item-input' 
               placeholder='What do you need to do?'
               autocomplete='off'
               >

        <span id='invalid-input-alert' hidden>Please enter a valid to-do item.</span>

        <input id='insert-to-do-button' 
               type='button' 
               value='Add Item'>

        <span>
            <to-do-list></to-do-list>
        </span>

    </form>

    <style>
        :host {
            font-family: 'Open Sans', sans-serif;
        }

        h1 {
            text-align: center;
        }

        input[type="text"] {
            height: 40px;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
            font-size: 14px;
            text-align: center;
            border: 1px solid #fefefe;
        } 

        #insert-to-do-button {
            height: 30px;
            border-radius: 5px;
            display: block;
            margin: 10px auto;
            text-align: center;
            border: 1px solid #fefefe;
        }

        form {
            background: #D3D3D3;
            border-radius: 10px;
            padding: 10px;
            font-size: 14px;
        }

        to-do-list li {
            margin-top: 15px;
        }

        #invalid-input-alert {
            color: red;
            margin-top: 5px;
        }

    </style>`;

class ToDoForm extends HTMLElement {

    // Default constructor that each class should contain
    constructor() {
        // Always add super method according to ec standards 
        super();

        let shadowDom = this.attachShadow( { mode: 'open' } );
        shadowDom.appendChild(template.content.cloneNode(true));

        this._toDoItemInput = shadowDom.getElementById('to-do-item-input');
        this._toDoList = shadowDom.querySelector('to-do-list');
        this._toDoItem = shadowDom.querySelector('to-do-item');
        this._toDoForm = shadowDom.getElementById('to-do-form');
        this._insertButton = shadowDom.getElementById('insert-to-do-button');
        this._invalidInputAlert = shadowDom.getElementById('invalid-input-alert');

        // Adding events to button and form submit. (Both in case of submit buttons)       
        this._insertButton.addEventListener('click', this.insertToDoCallBack.bind(this));
        this._toDoForm.addEventListener('submit', this.insertToDoCallBack.bind(this));

        shadowDom.addEventListener('to-do-done', this.childUpdatedEventHandler.bind(this), true);
    }

    // This gets called when a child is updated and just sets the focus back to the input
    childUpdatedEventHandler() {
        this._toDoItemInput.focus();
    }

    // Called when users clicks to add a new to-do
    insertToDoCallBack(event) {
        // Prevent default in case of submit button page refresh
        event.preventDefault();

        if (this.validate() == true) {
            let toDoText = this._toDoItemInput.value;
            this._toDoList.addToDoItem(toDoText);
            this._toDoItemInput.value = '';
        }

        this._toDoItemInput.focus();
    }

    // Checks for empty form. Displays error message if empty.
    validate() {       
        let isValid = (this._toDoItemInput.value.trim() != '')
        if (isValid) {
            this._invalidInputAlert.style.display = 'none';
        } else {
            this._invalidInputAlert.style.display = 'block';
        }

        return isValid;
    }
  
}

// Define the new custom element for usage
customElements.define('to-do-form', ToDoForm);

export default ToDoForm;