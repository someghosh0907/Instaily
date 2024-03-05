import './App.css';
import {useContext, useEffect, useState} from 'react'
import axios from "axios"
import ThemeContext from './ThemeContext';

function App() {
  const themeContext=useContext(ThemeContext)
  console.log({themeContext})
  const [mode,setMode]=useState("dark")
  const [todo,setTodo]=useState([]);
  const [todoPerPage,setTodoPerPage]=useState(10)
  const[currentPage,setCurrentPage]=useState(1)
  const numOfTotalPages=Math.ceil(todo.length / todoPerPage)
  const pages=[...Array(numOfTotalPages+1).keys()].slice(1)

  const indexOfLastTodo=currentPage+ todoPerPage
  const indexOfFirstTodo=indexOfLastTodo - todoPerPage

  const visibleTodo=todo.slice(indexOfFirstTodo, indexOfLastTodo)

  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res=>setTodo(res.data))
  },[])
  return (
    <ThemeContext.Provider value={mode}>
    <div className={`App-${mode}`}>
      <button id='mode-selector' onClick={()=>{setMode(mode==='dark' ? 'light' : 'dark')}}>Theme</button>
      <div>
        {visibleTodo.map((el)=>(
          <p key={el.id}>{el.title}</p>
        ))}
        <p>{pages.map(page=>(
          <span key={page} onClick={()=>setCurrentPage(page)} className={`${currentPage===page ? "active":""}`}>{`${page} |`}</span>
        ))}</p>
        <p></p>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
