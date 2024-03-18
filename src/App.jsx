import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const handleEdit = (e, id) => {
    let editTodo = todos.filter(item => item.id === id)
    setTodo(editTodo[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveLocalStorage()
  }

  const saveLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      confirm("Are you sure want to delete?")
      return item.id !== id
    });
    setTodos(newTodos);
    saveLocalStorage()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handdleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLocalStorage()
  }

  return (
    <>
      <Navbar />
      <div className='text-center mb-10'>
        <input onChange={handleChange} value={todo} type="text" placeholder='Add a note...' className='w-[40%] border rounded-sm pl-3 py-2' />
        <button onClick={handleAdd} className='mx-3 border rounded-md bg-indigo-600 hover:bg-indigo-950 text-white px-3 py-2'>Add</button>
      </div>
      {/* <input type="checkbox" checked={setShowFinished} /> */}
      <div className="todos mx-[28%]">
        {todos.length === 0 && <p className='text-center font-bold text-xl'><img className='m-auto pb-8' src='https://to-do-app-blush-three.vercel.app/static/media/img1.e03a41ff834cf09ee448.png' />Oops..it's empty :(</p>}
        {todos.map(item => {
          return <div key={item.id} className="todo flex justify-between text-xl">
            <div className={item.isCompleted ? "line-through" : ""}>
              <input name={item.id} onChange={handdleCheckBox} type="checkbox" className='mx-3 p-3' />
              {item.todo}
            </div>
            <div className="btn">
              <button onClick={(e) => { handleEdit(e, item.id) }} className='mx-3 border rounded-md bg-indigo-600 hover:bg-indigo-950 text-white px-3 py-2'><FaEdit /></button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='mx-3 border rounded-md bg-indigo-600 hover:bg-indigo-950 text-white px-3 py-2'><MdDelete /></button>
            </div>
          </div>
        })}
      </div>

    </>
  )
}

export default App
