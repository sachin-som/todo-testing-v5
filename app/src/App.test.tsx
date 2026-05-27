import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

const KEY = 'todo-testing-v5.tasks'

describe('US-001 Create Task from Main Screen', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates a new active task with valid title and shows it in list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/title/i), 'Buy milk')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].status).toBe('active')
    expect(stored[0].title).toBe('Buy milk')
  })

  it('blocks creation when title is empty and shows inline validation', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Title is required')
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('saves and displays optional due date, priority, and tag', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/title/i), 'Plan sprint')
    await user.type(screen.getByLabelText(/due date/i), '2026-06-01')
    await user.selectOptions(screen.getByLabelText(/priority/i), 'high')
    await user.type(screen.getByLabelText(/tag/i), 'work')

    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByText('Due: 2026-06-01')).toBeInTheDocument()
    expect(screen.getByText('Priority: high')).toBeInTheDocument()
    expect(screen.getByText('Tag: work')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    expect(stored[0].dueDate).toBe('2026-06-01')
    expect(stored[0].priority).toBe('high')
    expect(stored[0].tag).toBe('work')
  })

  it('shows new task immediately after save without reload', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/title/i), 'Immediate UI update')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByText('Immediate UI update')).toBeInTheDocument()
  })
})
