import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

const KEY = 'todo-testing-v5.tasks'

describe('Task experience (US-001 + US-002)', () => {
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

  it('distinguishes active and completed tasks visually', () => {
    localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: '1',
          title: 'Active Task',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Completed Task',
          status: 'completed',
          createdAt: new Date().toISOString(),
        },
      ]),
    )

    render(<App />)

    expect(screen.getByText('Status: Active')).toBeInTheDocument()
    expect(screen.getByText('Status: Completed')).toBeInTheDocument()
    expect(screen.getByText('Active Task')).toBeInTheDocument()
    expect(screen.getByText('Completed Task')).toBeInTheDocument()
  })

  it('shows empty state when no tasks exist', () => {
    render(<App />)

    expect(
      screen.getByText('No tasks yet. Create your first task to get started.'),
    ).toBeInTheDocument()
  })

  it('recovers gracefully from corrupted storage data', () => {
    localStorage.setItem(KEY, '{invalid-json')

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Task storage is unavailable or invalid. Showing recoverable in-memory view.',
    )
    expect(
      screen.getByText('No tasks yet. Create your first task to get started.'),
    ).toBeInTheDocument()
  })

  it('recovers gracefully when storage is unavailable', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('denied')
      })

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'Task storage is unavailable or invalid. Showing recoverable in-memory view.',
    )

    getItemSpy.mockRestore()
  })
})
