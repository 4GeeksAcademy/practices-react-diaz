
import React, { useState, useEffect } from "react";

const Home = () => {
    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1);
	const url="https://playground.4geeks.com/apis/fake/todos/user/santiagodiaz"
	console.log(taskList);


	const createUser= ()=>{
		fetch(url,{
			method: "POST",
            headers: {
                "Content-Type": "application/json"
			},
			body: JSON.stringify([])
		})
		

	}

    useEffect(() => {
        
        fetch(url)
            .then(response =>{
				console.log(response)
				if(response.ok){
					return  response.json()
				}
				createUser()
				return []
			})
            .then(data => setTaskList(data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []); 

    const handleTask = (e) => {
        if (e.key === "Enter" && newTask.trim() !== "") {
            // Agregar una nueva tarea
            const updatedTaskList = [...taskList, { label: newTask, done: false }];
            updateTaskList(updatedTaskList);
            setNewTask("");
        }
    };

    const taskDone = (index) => {
        // Marcar una tarea como hecha
        const updatedTaskList = [...taskList];
        updatedTaskList[index].done = !updatedTaskList[index].done;
        updateTaskList(updatedTaskList);
    };

    const deleteTask = (index) => {
        // Eliminar una tarea
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        updateTaskList(updatedTaskList);
    };

    const updateTaskList = (updatedTaskList) => {
        // Actualizar la lista de tareas en el servidor
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTaskList)
        })
        .then(() => setTaskList(updatedTaskList))
        .catch(error => console.error("Error updating tasks:", error));
    };

    return (
        <div className="container d-flex flex-column bg-white my-5 border rounded" id="mainContainer">
            <div className="border d-flex flex-column my-1 bg-danger text-white">
                <h1 className="mx-auto">TodoList</h1>
                <input 
                    id="Input"
                    type="text"
                    placeholder="Que quieres hacer hoy???"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyUp={(evt) => handleTask(evt)}
                    className="text-center mx-auto my-1"
                />
            </div>
    
            {/* Task List */}
            <div className="task-list">
                {taskList.map((task, index) => (
                    <div 
                        key={index} 
                        className="d-flex align-items-center justify-content-between my-2 fs-3"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                    >
                        <span 
                            className={task.done ? "text-decoration-line-through" : ""}
                        >
                            {task.label}
                        </span>
                        {hoverIndex === index && (
                            <div>
                                <button 
                                    className="btn btn-sm btn-success me-2"
                                    onClick={() => taskDone(index)}
                                >
                                    {task.done ? "Undo" : "Done"}
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteTask(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
