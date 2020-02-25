import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/actions";

export default function AddTodo() {
  const [ todo, setTodo ] = React.useState('');
  const dispatch = useDispatch();

  let handleAddTodo = () => {
    dispatch(addTodo(todo));
    setTodo('');
  };

  return (
    <div>
      <input
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
      <button className="add-todo" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );

}
