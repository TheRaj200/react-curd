import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

const App = () => {
  const [tasks, setTasks] = useState([])

   const [title, setTitle] = useState('')
   const [details, setDetails] = useState('')

   const handleAddTask = (e) => {
      e.preventDefault()
    if (title && details) {
      localStorage.setItem('tasks', JSON.stringify([...tasks, { id:nanoid(), title, details }]))
      setTitle('')
      setDetails('')
    }

  }
  
  const handleEditTask = (task) => {
    
              const newTitle = prompt('Enter new title', task.title)
              const newDetails = prompt('Enter new details', task.details)
              if (newTitle && newDetails) {
                localStorage.setItem('tasks', JSON.stringify(tasks.map((t) => t.id === task.id ? { ...t, title: newTitle, details: newDetails } : t)))
              }
              
            }

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

   useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(storedTasks)
  }, [])



  return (
    <div className='flex  gap-10 justify-center items-center h-screen w-full bg-gray-100'>
      <form onSubmit={handleAddTask} className=" flex flex-col gap-10 justify-center items-center bg-gray-200 p-4 rounded-lg shadow-md w-[50vw]">
        <h1 className='text-xl font-bold text-center'>Add Your Tasks</h1>
       <div className='flex flex-col  w-[70%] gap-4'>
        <input className='border border-gray-300 bg-blue-100 h-10 p-4' type="text" placeholder=" Enter title " required value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea  className='border border-gray-300 bg-blue-100 h-20 p-4 '  required type="textarea" placeholder=" Enter details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2 h-[40px] rounded-lg hover:bg-blue-600 w-40 cursor-pointer'  type="submit">Add Task</button>
       </div>
      </form>
    
      <section className='w-full bg-red-100 h-full rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-center py-10'>Tasks List</h2>
      
      <ol className='flex flex-col gap-4 justify-center items-center '>
        {tasks.map((task) => (
         
         
         <li key={task.id} className='border border-gray-300 p-4 rounded-lg shadow-sm w-[50%] flex   flex-col gap-2 bg-gray-100 justify-center items-center'>
            <h3 className='text-md font-bold'>  {task.title}</h3>
            <p className='text-sm text-gray-600'>{task.details}</p>
           <div className='flex gap-4 mt-4'>
             <button className='bg-green-500 text-white h-[40px] w-[80px] px-6 py-2 rounded-lg hover:bg-green-600 cursor-pointer' onClick={() => handleEditTask(task)}>Edit</button>
            <button className='bg-red-500 text-white h-[40px] w-[90px] px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer flex justify-content items-center' onClick={() => deleteTask(task.id)}>Delete</button>
           </div>
          </li>
        ))}
      </ol>
    </section>
    </div>
  )
}

export default App