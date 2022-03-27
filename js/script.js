let data = [];

function renderToDo() {
    document.querySelector('.to-do').innerHTML = '';

    data.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = 
            `<input type="checkbox" id="task-${task.id}">
                <label for="task-${task.id}">
                    ${task.title}
                </label>
                <button type="button">
                    X
                </button>
            `;
        
        li.querySelector('input').addEventListener('change', event => {
            if (event.target.checked)
                li.classList.add('complete');
            else
                li.classList.remove('complete');
        });

        li.querySelector('button').addEventListener('click', event => {
            let button = event.target;
            let li = button.parentNode;
            let input = li.querySelector('input');
            let id = input.id
            let idArray = id.split('-');
            let todoId = idArray[1];
            let title = li.querySelector('label').innerText;

            if (confirm(`Are you sure to delete the task ${title}?`)) {
                data = data.filter(task => task.id !== parseInt(todoId));
                renderToDo();
            }
        });
        document.querySelector('.to-do').append(li);
    });
}

document.querySelector('#new-task').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        data.push({
            id: data.length + 1,
            title: event.target.value
        });
        event.target.value = '';
        renderToDo();
    }
})
renderToDo();