var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todoList = document.querySelector('.todo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let val = input.value.trim(); // remove whitespace    
    if (val) {
        add({
            text: val,
            status: 'incomplete' // default status
        });
    }
    saveTodolist();
});

function add(todo) {
    var li = document.createElement('li');
    li.innerHTML = `
        <span>${todo.text}</span><i class="fa-solid fa-trash"></i>
    `;
    if (todo.status === 'completed') {
        li.classList.add('complete');
    }
    li.addEventListener('click', function () {
        this.classList.toggle('complete');
        saveTodolist();
    });
    todoList.appendChild(li);
    li.querySelector('i').addEventListener('click', function () {
        this.parentElement.remove();
        saveTodolist();
    });
}

function saveTodolist() {
    let todolistdom = document.querySelectorAll('li');
    let todolistStore = [];
    todolistdom.forEach(item => {
        let text = item.querySelector('span').innerHTML;
        let status = item.classList.contains('complete') ? 'completed' : 'incomplete'; // ss cac the li co class complete thi gan gia tri status completed
        todolistStore.push({
            text,
            status
        });
    });
    localStorage.setItem('todolistdom', JSON.stringify(todolistStore));
}

function int() {
    let data = JSON.parse(localStorage.getItem('todolistdom'));
    if (data) {
        data.forEach(i => {
            add(i);
        });
    }
}

int();