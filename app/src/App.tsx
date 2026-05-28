import { FormEvent, useMemo, useRef, useState } from 'react'
import { getStorageRecoveryMessage, loadTasks, saveTasks } from './storage'
import { Task, TaskPriority } from './types'

const priorities: TaskPriority[] = ['low', 'medium', 'high']

type TaskDraft = {
  title: string
  details: string
  dueDate: string
  priority: string
  tag: string
}

const createEmptyDraft = (): TaskDraft => ({
  title: '',
  details: '',
  dueDate: '',
  priority: '',
  tag: '',
})

type EditDraft = TaskDraft

const normalizeTags = (raw: string): string[] | undefined => {
  const tags = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return tags.length > 0 ? tags : undefined
}

const createTask = (input: TaskDraft): Task => ({
  id: crypto.randomUUID(),
  title: input.title,
  details: input.details || undefined,
  dueDate: input.dueDate || undefined,
  priority: (input.priority as TaskPriority) || undefined,
  tags: normalizeTags(input.tag),
  status: 'active',
  createdAt: new Date().toISOString(),
})

export function App() {
  const initialLoad = loadTasks()
  const [tasks, setTasks] = useState<Task[]>(initialLoad.data)
  const [storageError, setStorageError] = useState<string | null>(
    initialLoad.error ?? null,
  )
  const [draft, setDraft] = useState<TaskDraft>(createEmptyDraft)
  const [titleError, setTitleError] = useState('')
  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null)
  const [editTitleError, setEditTitleError] = useState('')

  const activeTasks = useMemo(
    () => tasks.filter((task) => task.status === 'active'),
    [tasks],
  )
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'completed'),
    [tasks],
  )

  const persistTasks = (nextTasks: Task[]) => {
    const saveResult = saveTasks(nextTasks)
    setStorageError(saveResult.error ?? null)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    const trimmedTitle = draft.title.trim()
    if (!trimmedTitle) {
      setTitleError('Title is required')
      titleInputRef.current?.focus()
      return
    }

    const created = createTask({ ...draft, title: trimmedTitle })
    const updated = [created, ...tasks]
    setTasks(updated)
    persistTasks(updated)
    setDraft(createEmptyDraft())
    setTitleError('')
    titleInputRef.current?.focus()
  }

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id)
    setEditDraft({
      title: task.title,
      details: task.details ?? '',
      dueDate: task.dueDate ?? '',
      priority: task.priority ?? '',
      tag: task.tags?.join(', ') ?? '',
    })
    setEditTitleError('')
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditDraft(null)
    setEditTitleError('')
  }

  const saveEditing = () => {
    if (!editingTaskId || !editDraft) {
      return
    }

    const trimmedTitle = editDraft.title.trim()
    if (!trimmedTitle) {
      setEditTitleError('Title is required')
      return
    }

    const updated = tasks.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: trimmedTitle,
            details: editDraft.details.trim() || undefined,
            dueDate: editDraft.dueDate || undefined,
            priority: (editDraft.priority as TaskPriority) || undefined,
            tags: normalizeTags(editDraft.tag),
          }
        : task,
    )

    setTasks(updated)
    persistTasks(updated)
    setEditingTaskId(null)
    setEditDraft(null)
    setEditTitleError('')
  }

  return (
    <main>
      <h1>Tasks</h1>

      <form onSubmit={onSubmit} aria-label="create-task-form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            ref={titleInputRef}
            value={draft.title}
            onChange={(e) => {
              setDraft({ ...draft, title: e.target.value })
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
            value={draft.details}
            onChange={(e) => setDraft({ ...draft, details: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={draft.dueDate}
            onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={draft.priority}
            onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
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
          <label htmlFor="tag">Tag(s)</label>
          <input
            id="tag"
            value={draft.tag}
            onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
          />
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
        <ul>
          {activeTasks.map((task) => {
            const isEditing = editingTaskId === task.id && editDraft !== null
            return (
              <li key={task.id} className="task-card task-active">
                <p className="task-status">Status: Active</p>
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
                      <label htmlFor={`edit-details-${task.id}`}>Details</label>
                      <textarea
                        id={`edit-details-${task.id}`}
                        value={editDraft.details}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, details: e.target.value })
                        }
                      />
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
                      <label htmlFor={`edit-tag-${task.id}`}>Tag(s)</label>
                      <input
                        id={`edit-tag-${task.id}`}
                        value={editDraft.tag}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, tag: e.target.value })
                        }
                      />
                    </div>
                    <button type="button" onClick={saveEditing}>
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
                    {task.tags?.length ? <p>Tags: {task.tags.join(', ')}</p> : null}
                    <button type="button" onClick={() => startEditing(task)}>
                      Edit Task
                    </button>
                  </>
                )}
              </li>
            )
          })}
        </ul>

        <h2>Completed Tasks</h2>
        <ul>
          {completedTasks.map((task) => {
            const isEditing = editingTaskId === task.id && editDraft !== null
            return (
              <li key={task.id} className="task-card task-completed">
                <p className="task-status">Status: Completed</p>
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
                      <label htmlFor={`edit-details-${task.id}`}>Details</label>
                      <textarea
                        id={`edit-details-${task.id}`}
                        value={editDraft.details}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, details: e.target.value })
                        }
                      />
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
                      <label htmlFor={`edit-tag-${task.id}`}>Tag(s)</label>
                      <input
                        id={`edit-tag-${task.id}`}
                        value={editDraft.tag}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, tag: e.target.value })
                        }
                      />
                    </div>
                    <button type="button" onClick={saveEditing}>
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
                    {task.tags?.length ? <p>Tags: {task.tags.join(', ')}</p> : null}
                    <button type="button" onClick={() => startEditing(task)}>
                      Edit Task
                    </button>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
