import { useState } from 'react'

const TodoList = () => {
    const[tasks, setTasks] = useState([
      {title: "Eat", description: "Have Brunch", completed:false},
      {title: "Sleep", description: "Take a quick nap", completed:false}
    ])
    const[newTask, setNewTask] = useState({title:"", description: ""})

    function AddTask(){
        if(newTask.title.trim() !=="" && newTask.description.trim() !==""){
            setTasks(t => [...t,{...newTask, completed:false}])
            setNewTask({title:'', description:''})}
        else {
          alert('Please fill in both fields')
        }
    } 


    function handleTask(e){
        const {name, value}=e.target
        setNewTask(prev => ({...prev, [name]:value}));
    }

    function handleRemove(index){
        const updatedTask = tasks.filter((_,i)=> 
            i !==  index)
        setTasks(updatedTask)
    }

    function toggleCompletion(index){
      const updatedTask = tasks.map((task, i)=>
        i === index ? {...task, completed: !task.completed} : task
    );
    setTasks(updatedTask)
    }
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">To Do List</h2>

      <div className="flex flex-col gap-4 mb-6">
        <input 
          type="text"
          name="title"
          placeholder="Title"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.title}
          onChange={handleTask}
        />
        <input 
          type="text"
          name="description"
          placeholder="Description"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask.description}
          onChange={handleTask}
        />
        <button 
          onClick={AddTask} 
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">
          Add Task
        </button>
      </div>

      <ol className="list-decimal list-inside space-y-3">
        {tasks.map((task, index) => (
          <li 
            key={index} 
            className={`p-2 flex justify-between items-center bg-gray-100 rounded-md ${task.completed ? "line-through text-gray-500" : ""}`}>
            <span className="font-medium">
              {task.title}: {task.description}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleCompletion(index)} 
                className="bg-yellow-300 text-black p-1 rounded-md hover:bg-yellow-400 transition">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button 
                onClick={() => handleRemove(index)} 
                className="bg-red-400 text-white p-1 rounded-md hover:bg-red-500 transition">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default TodoList
