import { Task } from './types'

const TASKS_KEY = 'todo-testing-v5.tasks'
const RECOVERY_MESSAGE =
  'Task storage is unavailable or invalid. Showing recoverable in-memory view.'

export interface StorageResult<T> {
  data: T
  error?: string
}

export const loadTasks = (): StorageResult<Task[]> => {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    if (!raw) {
      return { data: [] }
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return { data: [], error: RECOVERY_MESSAGE }
    }

    return { data: parsed as Task[], error: undefined }
  } catch {
    return { data: [], error: RECOVERY_MESSAGE }
  }
}

export const saveTasks = (tasks: Task[]): StorageResult<null> => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    return { data: null }
  } catch {
    return { data: null, error: RECOVERY_MESSAGE }
  }
}

export const getStorageRecoveryMessage = (): string => RECOVERY_MESSAGE
