import { Task } from './types'

const TASKS_KEY = 'todo-testing-v5.tasks'

export const loadTasks = (): Task[] => {
  const raw = localStorage.getItem(TASKS_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}
