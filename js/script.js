window.onload = init;

function init() {
    let todoList = {
        listHTML: document.getElementById("todoList"),
        listTask: [],
        findRow(node)
        {
            var i = 1;
            while (node = node.previousSibling) {
                if (node.nodeType === 1) { ++i }
            }
            return i;
        },
        add(task, priority = false) {
            let element = document.createElement("li");
            element.innerText = task;
            /*element.addEventListener("click", () => {
               let parent = element.parentNode;
               if(parent){
                   parent.removeChild(element);
               }
            });*/

            // Añadir un boton para marcar de finalizado
            let dropButton = document.createElement('button');
            dropButton.innerText = 'Eliminar';
            element.appendChild(dropButton);

            // Elmine de la lista
            dropButton.addEventListener("click", function () {
                
                let parentIndex = todoList.findRow(this.parentNode);
                let element = todoList.listHTML.childNodes[parentIndex];
                
                if(element.nodeName == "#text") 
                    todoList.listHTML.removeChild(todoList.listHTML.childNodes[parentIndex-1]);
                else 
                    todoList.listHTML.removeChild(element);

            });

            if (priority) {
                this.listTask.unshift({
                    element,
                    task
                });
                this.listHTML.insertBefore(element, this.listHTML.childNodes[0]);
            }
            else {
                this.listTask.push({
                    element,
                    task
                });
                this.listHTML.appendChild(element);
            }
        }
    }

    let form = document.managerTask;
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let task = form.task.value;

        let validTask = /.{2,}/;
        if (!validTask.test(task)) {
            console.log("Ingrese una descripcion clara");
            return false;
        }

        todoList.add(task, form.important.checked);

    });
}