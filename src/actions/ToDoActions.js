export const ADD_TODO_Action = (todo) => (dispatch, getState) => {
    const {
        todo: { todos },
    } = getState();

    const hasTodo = todos.find((i) => i.todo === todo);

    if (!hasTodo && todo !== "") {
        dispatch({
            type: "ADD_TODO",
            payload: [{ id: todo, todo }, ...todos],
        });
    }
};

export const REMOVE_TODO_Actions = (todo) => (dispatch, getState) => {
    const {
        todo: { todos },
    } = getState();

    dispatch({
        type: "REMOVE_TODO",
        payload: todos.filter((t) => t.id !== todo.id),
    });
};

export const EDIT_TODO_Action = (updatedTodo) => (dispatch, getState) => {
    const {
        todo: { todos },
    } = getState();

    const updatedTodos = todos.map((t) =>
        t.id === updatedTodo.id ? { ...t, todo: updatedTodo.todo } : t
    );

    dispatch({
        type: "EDIT_TODO",
        payload: updatedTodos,
    });
};
