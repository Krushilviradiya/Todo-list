
import './App.css';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState("");
  // const [id, setid] = useState(0);
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [final, setFinal] = useState([]);
  const [searchInfor,setSearchinfo] = useState([])

  const add = () => {
    if (edit !== null) {
      const updated = [...todo];
      setSearchinfo([...todo])

      updated[edit] = { task: task, checked: false };
      setTodo(updated);
      setFinal(updated);
      setEdit(null);
      setTask("");
    }
    else {
      setTodo([...todo, {  task: task, checked: false }]);
      setSearchinfo([...todo])
      setFinal([...todo, {  task: task, checked: false }]);
      setTask("");
    }
  }

  const del = (index) => {
    console.log("index = " + index)
    let d = todo.filter((val, id) => {
      console.log("id =", id)
      return id !== index;
    })
    setTodo(d);
    setFinal(d);
  }

  const update = (index) => {
    setEdit(index);
    setTask(todo[index].task);
  };

  const handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
  }

  const searchhanlder = () => {
   
    let info = final.filter((val, id) => {
      return val.task === search;
    })
    console.log('info',info)
    setTodo(info);
  }

  const completed = () => {
    let com = final.filter((val, id) => {
      return val.checked === true ? val : false
    });

    setTodo(com);

  }

  const uncompleted = () => {
    let uncom = final.filter((val, id) => {
      return val.checked === false ? val : false
    });
    setTodo(uncom);
    // setFinal(uncom);
  }

  const all = () => {
    var data = [...final];
    setTodo(data);
  }

  return (
    <div className="">
      <div className="wrapper">
        <h1>Todo List</h1>
        <div className='form'>
          <input type="text" className='input' value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
          <input type='button' className='btn' value={"Add Task"} onClick={() => { add() }} /><br />
          <input type='text' className='input' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type='button' className='btn' value={"Search"} onClick={() => { searchhanlder() }} /><br />
          <input type='button' className='btn' value={"Completed"} onClick={() => { completed() }} style={{ marginRight: "10px" }} />
          <input type='button' className='btn' value={"UnCompleted"} onClick={() => { uncompleted() }} style={{ marginRight: "10px" }} />
          <input type='button' className='btn' value={"All"} onClick={() => { all() }} style={{ marginRight: "10px" }} />

        </div>

        <ul className='' style={{ color:" green"}} >
          {
            todo.map((ele, index) => {
              return (
                <li className='' key={index}>
                  <input type='checkbox' checked={ele.checked} onChange={() => handlecheck(index)} />
                  <span style={{ textDecoration: ele.checked ? "line-through" : "" }}>{ele.task}</span>   
                    <input type='button' value={"Del"} className='del' onClick={() => { del(index) }} />
                    <input type='button' value={"Edit"} onClick={() => { update(index) }} />
                  
                      </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;

