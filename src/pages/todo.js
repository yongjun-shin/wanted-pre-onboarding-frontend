import Axios from "axios";
import { useEffect, useState } from "react";

export function Todo() {
  const jwt = localStorage.getItem('jwt');
  const [create, setCreate] = useState('');
  const [todolist, setTodoList] = useState([]);
  const [modifyId, setModifyId] = useState(null);
  const [modifyStr, setModifyStr] = useState('');
  const [isModifyMode, setIsModifyMode] = useState(false);

  const get_delete_headers = {'Authorization': `Bearer ${jwt}`};
  const create_update_headers = {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  };

  const getTodos = () => {
    Axios.get('https://www.pre-onboarding-selection-task.shop/todos/', {headers: get_delete_headers})
    .then((response)=>{
      console.log(response.data);
      setTodoList(response.data);
    })
    .catch((error)=>{
      console.error(error);
    });
  };

  const createTodo = () => {
    Axios.post('https://www.pre-onboarding-selection-task.shop/todos/', {todo: create}, {headers: create_update_headers})
      .then((response)=>{
        console.log(response.data);
        setCreate('');
        getTodos();
      })
      .catch((error)=>{
        console.error(error);
      });
  };

  const activateUpdate = (id, str) => {
    setModifyId(id);
    setModifyStr(str);
    setIsModifyMode(true);
  };

  const cancelUpdate = (e) => {
    e.preventDefault();
    setModifyId(null);
    setModifyStr('');
    setIsModifyMode(false);
  };

  const updateTodo = (id, str, iscom) => {
    Axios.put(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {todo: str, isCompleted: iscom}, {headers: create_update_headers})
      .then((response)=>{
        console.log(response.data);
        setModifyId(null);
        setModifyStr('');
        setIsModifyMode(false);
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
    <input data-testid="new-todo-input" onChange={handleInputChange} value={create}/>
    <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>
    <div>
      {todolist.map((item) => (
        <li key={item.id} className="list">
          <label>
            <input type="checkbox" checked={item.isCompleted} onChange={() => updateTodo(item.id, item.todo, !item.isCompleted)} />
            {modifyId === item.id && isModifyMode ? (
              <>
                <input data-testid="modify-input" value={modifyStr} onChange={(e) => setModifyStr(e.target.value)} />
                <button data-testid="submit-button" onClick={() => updateTodo(item.id, modifyStr, item.isCompleted)}>제출</button>
                <button data-testid="cancel-button" onClick={cancelUpdate}>취소</button>
              </>
            ) : (
              <span>{item.todo}</span>
            )}
          </label>
          {!isModifyMode && (
            <>
              <button data-testid="modify-button" onClick={() => activateUpdate(item.id, item.todo)}>수정</button>
              <button data-testid="delete-button" onClick={() => deleteTodo(item.id)}>삭제</button>
            </>
          )}
        </li>
      ))}
    </div>
    </>
  );
}

export default Todo;