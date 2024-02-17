
import { createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";


let initialState = {
    todoList: [],
    tasks: {},

}

export const currentSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        addTodoList: (state, action) => {
            let newTodoList = { id: v1(), title: action.payload, filter: 'All' }
            state.todoList = [...state.todoList, newTodoList]
            state.tasks[newTodoList.id] = []
        },
        addTask: (state, action) => {
            let copyTasks = state.tasks[action.payload.todoListId]
            let newTask = { id: v1(), text: action.payload.text, isDone: false }
            state.tasks[action.payload.todoListId] = [...copyTasks, newTask]

        },
        removeTask: (state, action) => {
            const { todoListId, taskId } = action.payload
            let copyTasks = state.tasks[todoListId]
            let filteredTask = copyTasks.filter(el => el.id !== taskId)
            state.tasks[action.payload.todoListId] = filteredTask
        },
        removeToDoList: (state, action) => {
            const filteredTodoList = state.todoList.filter(el => el.id !== action.payload)
            state.todoList = filteredTodoList
            delete state.tasks[action.payload]
        },
        toggleIsDone: (state, action) => {
            const { todoListId, taskId, isDone } = action.payload
            let tasksCopy = state.tasks[todoListId]
            let task = tasksCopy.find(el => el.id === taskId)
            task.isDone = isDone

        },
        filterActive: (state, action) => {
            let copyTodoList = state.todoList.find(el => el.id === action.payload)
            copyTodoList.filter = "Active"
        },
        filterCompleted: (state, action) => {
            let copyTodoList = state.todoList.find(el => el.id === action.payload)
            copyTodoList.filter = "Completed"
        },
        filterAll: (state, action) => {
            let copyTodoList = state.todoList.find(el => el.id === action.payload)
            copyTodoList.filter = "All"
        },
        editTaskText: (state, action) => {
            const { todoListId, taskId, text } = action.payload
            let taskCopy = state.tasks[todoListId].find(el => el.id === taskId)
            taskCopy.text = text

        },
        editTitleTodoList: (state, action) => {
            const { todoListId, title } = action.payload
            let todoListCopy = state.todoList.find(el => el.id === todoListId)
            todoListCopy.title = title
        },
        dragDrobTasks: (state, action) => {
            const { todoListId, firstIndex, lastIndex } = action.payload
            let copyTasks = state.tasks[todoListId];
            [copyTasks[firstIndex], copyTasks[lastIndex]] = [copyTasks[lastIndex], copyTasks[firstIndex]];
        }



    }
})

export let { addTodoList, addTask, removeTask, removeToDoList, toggleIsDone, filterActive, filterCompleted, filterAll, editTaskText, editTitleTodoList, dragDrobTasks } = currentSlice.actions
export default currentSlice.reducer