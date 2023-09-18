import Axios from "axios";
import { useEffect, useState } from "react";

export function Todo() {
  const jwt = localStorage.getItem('jwt');
  const [create, setCreate] = useState('');
  const [todolist, setTodoList] = useState(<></>);

  const get_delete_headers = {'Authorization': `Bearer ${jwt}`};
  const create_update_headers = {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }

  const getTodos = () => {
    Axios.get('https://www.pre-onboarding-selection-task.shop/todos/', {headers: get_delete_headers})
    .then((response)=>{
      console.log(response.data);
      const todoItems = response.data.map((item, index) => (
        <li key={index}>
          <label>
            <input type="checkbox" />
            <span>{item.todo}</span>
          </label>
          <button data-testid="modify-button" >수정</button>
          <button data-testid="delete-button" onClick={() => deleteTodo(item.id)}>삭제</button>
        </li>
      ));
      setTodoList(todoItems);
    })
    .catch((error)=>{
      console.error(error);
    });
  };
  
  const createTodo = () => {
    Axios.post('https://www.pre-onboarding-selection-task.shop/todos/', {todo: create}, {headers: create_update_headers})
      .then((response)=>{
        console.log(response.data);
        getTodos();
      })
      .catch((error)=>{
        console.error(error);
      });
  };

  const deleteTodo = (id) => {
    Axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {headers: get_delete_headers})
      .then((response)=>{
        console.log(response.data);
        getTodos();
      })
      .catch((error)=>{
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setCreate(e.target.value);
  };

  useEffect(()=>{
    getTodos();
  }, []);

  return (
    <>
    <input data-testid="new-todo-input" onChange={handleInputChange}/>
    <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>
    <div>
      {todolist}
    </div>
    </>
  );
}

export default Todo;