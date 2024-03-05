
import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//Parte logica
const Home = () => {
	const[newTask,setNewTask]=useState("")
	const[taskList,setTaskList]=useState([])
	const[hoverIndex, setHoverIndex] = useState(-1);

	const handleTask=(e)=>{
		if(e.key=== "Enter"){
			setTaskList([
				...taskList,{
					label: newTask,
					donde: false
				}

		])
		setNewTask("")
		}
	}

	const taskDone=(index)=>{
		const updatedTask=[...taskList]
		updatedTask[index].done= !updatedTask[index].done
		setTaskList(updatedTask)

	}

	const deleteTask=(index)=>{
		const updatedTask=[...taskList]
		updatedTask.splice(index,1)
		setTaskList(updatedTask)
	}
	return (
		<div className="container d-flex flex-column bg-white my-5 border rounded" id="mainContainer">
			<div className="border d-flex flex-column my-1 bg-danger text-white">
				<h1 className="mx-auto">TodoList</h1>
				<input 
					id="Input"
					type="text"
					placeholder="Que quieres hacer hoy???"
					value={newTask}
					onChange={(e)=>setNewTask(e.target.value)}
					onKeyUp={(evt)=>handleTask(evt)}
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
