import ToDoItem from './to-do-item.html.js';

const template = document.createElement('template');

template.innerHTML = `
    <span id='no-to-dos'>
        You currently have nothing to do.
    </span>

    <input type='text' id='to-do-item-search' placeholder='Search your to-do list here!' autocomplete='off' hidden>

    <span id='to-do-list-title' hidden>
        To-Do's:
    </span>
    
    <ul id='to-do-list'></ul>

    <input id='delete-to-do-button' type='button' value='Remove' hidden>

    <style>
        #to-do-list-title {
            font-weight: bold;
            text-decoration: underline;
        }

        #to-do-item-search {
            width: 50%;
            margin-bottom: 10px;
            text-align: left;
            padding: 0 10px;
        }

        #delete-to-do-button {
            height: 30px;
            border-radius: 5px;
            text-align: center;
            border: 1px solid #fefefe;
        }
    </style>`;

class ToDoList extends HTMLElement {

    constructor() {
        super();

        let clonedTemplate = document.importNode(template.content, true);

        this._noToDos = clonedTemplate.getElementById('no-to-dos');
        this._toDoListTitle = clonedTemplate.getElementById('to-do-list-title');
        this._toDoList = clonedTemplate.getElementById('to-do-list');
        this._toDoItemSearch = clonedTemplate.getElementById('to-do-item-search');
        this._deleteToDoButton = clonedTemplate.getElementById('delete-to-do-button');
        this._numberOfToDos = 0;

        this.append(clonedTemplate);

        this._deleteToDoButton.addEventListener('click', this.delete.bind(this));
        this._toDoItemSearch.addEventListener('input', this.search.bind(this));
    }

    // Adds a new to-do item
    addToDoItem(text) {
        let toDoItem = new ToDoItem(text);

        if (this._numberOfToDos == 0) {
            this._toDoList.appendChild(toDoItem)
        } else {
            let firstToDo = this._toDoList.firstChild;
            this._toDoList.insertBefore(toDoItem, firstToDo)
        }

        this._numberOfToDos++
        this.updateTitleAndRemoveVisibility()
    }

    // Updates titles and remove button visibility
    updateTitleAndRemoveVisibility() {
        if (this._numberOfToDos > 0) {
            this._noToDos.style.display = 'none';
            this._toDoListTitle.style.display = 'block';
            this._deleteToDoButton.style.display = 'block';
            this._toDoItemSearch.style.display = 'block';
        } else {
            this._noToDos.style.display = 'block';
            this._toDoListTitle.style.display = 'none';
            this._deleteToDoButton.style.display = 'none';
            this._toDoItemSearch.style.display = 'none';
        }
    }

    // Delete from to-do list with ability to multi select
    delete() {
        let toDoNodeList = Array.from(this._toDoList.children);

        toDoNodeList.forEach(element => {
            let checkboxArray = element.querySelectorAll('#done-to-do-checkbox');
        
            checkboxArray.forEach(el => {
                if (el.checked) {
                    // Removes parent of parent (to-do-item) because I nested the input in the label for easy clickability
                    el.parentNode.parentNode.remove();
                    this._numberOfToDos--;
                } 
            })
        });

        this.updateTitleAndRemoveVisibility();
    }

    // Search as you type through to-do items (case sensitive)
    search() {
        let toDoNodeList = Array.from(this._toDoList.children);
        let searchValue = this._toDoItemSearch.value;

        toDoNodeList.forEach(element => {
            let toDoText = element.querySelectorAll('#to-do-item-label');

            toDoText.forEach(el => {
                let textValue = el.innerText || el.textContent;
                if (textValue.indexOf(searchValue) > -1) {
                    el.parentNode.hidden = false;
                } else {
                    el.parentNode.hidden = true;
                }
            })
        });
    }

}

customElements.define('to-do-list', ToDoList);

export default ToDoList;