import { FormEvent, useMemo, useState } from 'react'
import { getStorageRecoveryMessage, loadTasks, saveTasks } from './storage'
import { Task, TaskPriority, TaskStatus } from './types'

const priorities: TaskPriority[] = ['low', 'medium', 'high']

type EditDraft = {
  title: string
  dueDate: string
  priority: string
  tag: string
}

const newTask = (input: {
  title: string
  details?: string
  dueDate?: string
  priority?: TaskPriority
  tag?: string
}): Task => ({
  id: crypto.randomUUID(),
  title: input.title,
  details: input.details,
  dueDate: input.dueDate,
  priority: input.priority,
  tag: input.tag,
  status: 'active',
  createdAt: new Date().toISOString(),
})

export function App() {
  const initialLoad = loadTasks()
  const [tasks, setTasks] = useState<Task[]>(initialLoad.data)
  const [storageError, setStorageError] = useState<string | null>(
    initialLoad.error ?? null,
  )
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('')
  const [tag, setTag] = useState('')
  const [titleError, setTitleError] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null)
  const [editTitleError, setEditTitleError] = useState('')
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)

  const activeTasks = useMemo(
    () => tasks.filter((task) => task.status === 'active'),
    [tasks],
  )
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'completed'),
    [tasks],
  )

  const persistTasks = (updatedTasks: Task[]) => {
    const saveResult = saveTasks(updatedTasks)
    if (saveResult.error) {
      setStorageError(getStorageRecoveryMessage())
    } else {
      setStorageError(null)
    }
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    let latestTasks: Task[] = []
    setTasks((prevTasks) => {
      latestTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      )
      return latestTasks
    })
    persistTasks(latestTasks)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleError('Title is required')
      return
    }

    const created = newTask({
      title: trimmedTitle,
      details: details.trim() || undefined,
      dueDate: dueDate || undefined,
      priority: (priority as TaskPriority) || undefined,
      tag: tag.trim() || undefined,
    })

    const updated = [created, ...tasks]
    setTasks(updated)
    persistTasks(updated)

    setTitle('')
    setDetails('')
    setDueDate('')
    setPriority('')
    setTag('')
    setTitleError('')
  }

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id)
    setEditDraft({
      title: task.title,
      dueDate: task.dueDate ?? '',
      priority: task.priority ?? '',
      tag: task.tag ?? '',
    })
    setEditTitleError('')
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditDraft(null)
    setEditTitleError('')
  }

  const saveEdit = () => {
    if (!editingTaskId || !editDraft) {
      return
    }

    const trimmedTitle = editDraft.title.trim()
    if (!trimmedTitle) {
      setEditTitleError('Title is required')
      return
    }

    let latestTasks: Task[] = []
    setTasks((prevTasks) => {
      latestTasks = prevTasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: trimmedTitle,
              dueDate: editDraft.dueDate || undefined,
              priority: (editDraft.priority as TaskPriority) || undefined,
              tag: editDraft.tag.trim() || undefined,
            }
          : task,
      )
      return latestTasks
    })

    persistTasks(latestTasks)

    setEditingTaskId(null)
    setEditDraft(null)
    setEditTitleError('')
  }

  const requestDelete = (taskId: string) => {
    if (editingTaskId === taskId) {
      cancelEditing()
    }
    setDeleteTaskId(taskId)
  }

  const cancelDelete = () => {
    setDeleteTaskId(null)
  }

  const confirmDelete = (taskId: string) => {
    let latestTasks: Task[] = []
    setTasks((prevTasks) => {
      latestTasks = prevTasks.filter((task) => task.id !== taskId)
      return latestTasks
    })
    persistTasks(latestTasks)
    setDeleteTaskId(null)
  }

  const renderTask = (task: Task, isCompletedSection: boolean) => {
    const isEditing = editingTaskId === task.id && editDraft !== null

    return (
      <li
        key={task.id}
        className={`task-card ${isCompletedSection ? 'task-completed' : 'task-active'}`}
      >
        <p className="task-status">
          Status: {isCompletedSection ? 'Completed' : 'Active'}
        </p>
        {isEditing ? (
          <>
            <div>
              <label htmlFor={`edit-title-${task.id}`}>Title</label>
              <input
                id={`edit-title-${task.id}`}
                value={editDraft.title}
                onChange={(e) => {
                  setEditDraft({ ...editDraft, title: e.target.value })
                  if (editTitleError && e.target.value.trim()) {
                    setEditTitleError('')
                  }
                }}
              />
              {editTitleError ? <p role="alert">{editTitleError}</p> : null}
            </div>
            <div>
              <label htmlFor={`edit-due-date-${task.id}`}>Due Date</label>
              <input
                id={`edit-due-date-${task.id}`}
                type="date"
                value={editDraft.dueDate}
                onChange={(e) =>
                  setEditDraft({ ...editDraft, dueDate: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor={`edit-priority-${task.id}`}>Priority</label>
              <select
                id={`edit-priority-${task.id}`}
                value={editDraft.priority}
                onChange={(e) =>
                  setEditDraft({ ...editDraft, priority: e.target.value })
                }
              >
                <option value="">None</option>
                {priorities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`edit-tag-${task.id}`}>Tag</label>
              <input
                id={`edit-tag-${task.id}`}
                value={editDraft.tag}
                onChange={(e) => setEditDraft({ ...editDraft, tag: e.target.value })}
              />
            </div>
            <button type="button" onClick={saveEdit}>
              Save Changes
            </button>
            <button type="button" onClick={cancelEditing}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <strong>{task.title}</strong>
            {task.details ? <p>{task.details}</p> : null}
            {task.dueDate ? <p>Due: {task.dueDate}</p> : null}
            {task.priority ? <p>Priority: {task.priority}</p> : null}
            {task.tag ? <p>Tag: {task.tag}</p> : null}
            <button type="button" onClick={() => startEditing(task)}>
              Edit Task
            </button>
            {isCompletedSection ? (
              <button
                type="button"
                onClick={() => updateTaskStatus(task.id, 'active')}
              >
                Mark Active
              </button>
            ) : (
              <button
                type="button"
                onClick={() => updateTaskStatus(task.id, 'completed')}
              >
                Mark Complete
              </button>
            )}
            <button type="button" onClick={() => requestDelete(task.id)}>
              Delete Task
            </button>
            {deleteTaskId === task.id ? (
              <div className="delete-confirmation">
                <p role="alert">Deleting a task is permanent and cannot be undone.</p>
                <button type="button" onClick={() => confirmDelete(task.id)}>
                  Confirm Delete
                </button>
                <button type="button" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            ) : null}
          </>
        )}
      </li>
    )
  }

  return (
    <main>
      <h1>Tasks</h1>

      <form onSubmit={onSubmit} aria-label="create-task-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (titleError && e.target.value.trim()) {
                setTitleError('')
              }
            }}
          />
          {titleError ? <p role="alert">{titleError}</p> : null}
        </div>

        <div>
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">None</option>
            {priorities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tag">Tag</label>
          <input id="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>

        <button type="submit">Save Task</button>
      </form>

      {storageError ? (
        <p role="status" className="storage-error">
          {storageError}
        </p>
      ) : null}

      <section aria-label="task-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Create your first task to get started.</p>
        ) : null}

        <h2>Active Tasks</h2>
        <ul aria-label="active-task-list">{activeTasks.map((task) => renderTask(task, false))}</ul>

        <h2>Completed Tasks</h2>
        <ul aria-label="completed-task-list">
          {completedTasks.map((task) => renderTask(task, true))}
        </ul>
      </section>
    </main>
  )
}
