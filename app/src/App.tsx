import { FormEvent, useMemo, useState } from 'react'
import { loadTasks, saveTasks } from './storage'
import { Task, TaskPriority } from './types'

const priorities: TaskPriority[] = ['low', 'medium', 'high']

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
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('')
  const [tag, setTag] = useState('')
  const [titleError, setTitleError] = useState('')

  const activeTasks = useMemo(
    () => tasks.filter((task) => task.status === 'active'),
    [tasks],
  )

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
    saveTasks(updated)

    setTitle('')
    setDetails('')
    setDueDate('')
    setPriority('')
    setTag('')
    setTitleError('')
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

      <section aria-label="task-list">
        <h2>Active Tasks</h2>
        <ul>
          {activeTasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              {task.details ? <p>{task.details}</p> : null}
              {task.dueDate ? <p>Due: {task.dueDate}</p> : null}
              {task.priority ? <p>Priority: {task.priority}</p> : null}
              {task.tag ? <p>Tag: {task.tag}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
