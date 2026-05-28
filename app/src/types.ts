export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus = 'active' | 'completed'

export interface Task {
  id: string
  title: string
  details?: string
  dueDate?: string
  priority?: TaskPriority
  tags?: string[]
  status: TaskStatus
  createdAt: string
}
