const template = document.createElement('template');

template.innerHTML = `
    <li>
        
        <label id='to-do-item-label'>
            <input id='done-to-do-checkbox' type='checkbox'>
        </label>

        <span id='done-label' hidden>Done!</span>

    </li>

    <style>
        ul {
            padding-left: 0;
        }
        
        li {
            list-style: none;
        }

        .done {
            text-decoration: line-through;
            color: grey;
        }

        #done-label {
             margin-left: 10px;
             color: green;
             display: none;
        }
    </style>`;

class ToDoItem extends HTMLElement {

    constructor(labelText) {
        super();

        let clonedTemplate = document.importNode(template.content, true);

        this.appendChild(clonedTemplate);

        this._toDoLabel = this.querySelector('#to-do-item-label');
        this._doneToDoCheckBox = this.querySelector('#done-to-do-checkbox');
        this._doneLabel = this.querySelector('#done-label');
        
        // Add listeners for both checkbox change and label click for ease of use
        this._doneToDoCheckBox.addEventListener('change', this.toggleDone.bind(this));
        this._toDoLabel.addEventListener('click', this.toggleDone.bind(this));

        this.updateToDoLabel(labelText); 
    }

    // Updates the to-do label within this component
    updateToDoLabel(labelText) {
        this._toDoLabel.innerHTML += labelText;
    }

    // Toggles whether a to-do item is done or not
    toggleDone() {
        let checkBox = this._toDoLabel.querySelector('#done-to-do-checkbox');

        if (checkBox.checked) {
            this._toDoLabel.classList.add('done');
            this._doneLabel.style.display = 'inline-block';
        } else {
            this._toDoLabel.classList.remove('done');
            this._doneLabel.style.display = 'none';
        }

        let doneToDoEvent = new CustomEvent('to-do-done', { 'detail': this });
        this.parentNode.dispatchEvent(doneToDoEvent);
    }   

}

customElements.define('to-do-item', ToDoItem);

export default ToDoItem;