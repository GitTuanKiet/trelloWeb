
const initialState = {
  tasks: []
}

const board = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_TASK':
    return {
      ...state,
      tasks: [...state.tasks, action.payload]
    }
  default:
    return state
  }
}

export default board