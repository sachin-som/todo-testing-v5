import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

const KEY = 'todo-testing-v5.tasks'

describe('Task experience (US-001)', () => {
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

  it('updates title, due date, priority, and tag and shows updated values immediately', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: '1',
          title: 'Original title',
          dueDate: '2026-06-01',
          priority: 'low',
          tag: 'home',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]),
    )

    render(<App />)

    const card = screen.getByText('Original title').closest('li') as HTMLElement
    await user.click(within(card).getByRole('button', { name: /edit task/i }))

    const titleInput = within(card).getByLabelText(/^title$/i)
    await user.clear(titleInput)
    await user.type(titleInput, 'Updated title')

    const dueDateInput = within(card).getByLabelText(/due date/i)
    await user.clear(dueDateInput)
    await user.type(dueDateInput, '2026-07-15')

    await user.selectOptions(within(card).getByLabelText(/priority/i), 'high')

    const tagInput = within(card).getByLabelText(/tag/i)
    await user.clear(tagInput)
    await user.type(tagInput, 'work')

    await user.click(within(card).getByRole('button', { name: /save changes/i }))

    expect(screen.getByText('Updated title')).toBeInTheDocument()
    expect(screen.getByText('Due: 2026-07-15')).toBeInTheDocument()
    expect(screen.getByText('Priority: high')).toBeInTheDocument()
    expect(screen.getByText('Tag: work')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    expect(stored[0].title).toBe('Updated title')
    expect(stored[0].dueDate).toBe('2026-07-15')
    expect(stored[0].priority).toBe('high')
    expect(stored[0].tag).toBe('work')
  })

  it('blocks edit save with inline validation when title is cleared', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: '1',
          title: 'Existing task',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]),
    )

    render(<App />)

    const card = screen.getByText('Existing task').closest('li') as HTMLElement
    await user.click(within(card).getByRole('button', { name: /edit task/i }))

    const titleInput = within(card).getByLabelText(/^title$/i)
    await user.clear(titleInput)
    await user.click(within(card).getByRole('button', { name: /save changes/i }))

    expect(within(card).getByRole('alert')).toHaveTextContent('Title is required')
    expect(screen.getByDisplayValue('')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    expect(stored[0].title).toBe('Existing task')
  })

  it('keeps last confirmed values after repeated rapid saves', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      KEY,
      JSON.stringify([
        {
          id: '1',
          title: 'Task one',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]),
    )

    render(<App />)

    const firstCard = screen.getByText('Task one').closest('li') as HTMLElement
    await user.click(within(firstCard).getByRole('button', { name: /edit task/i }))

    const firstTitleInput = within(firstCard).getByLabelText(/^title$/i)
    await user.clear(firstTitleInput)
    await user.type(firstTitleInput, 'Task one - edit 1')
    await user.click(within(firstCard).getByRole('button', { name: /save changes/i }))

    const secondCard = screen.getByText('Task one - edit 1').closest('li') as HTMLElement
    await user.click(within(secondCard).getByRole('button', { name: /edit task/i }))

    const secondTitleInput = within(secondCard).getByLabelText(/^title$/i)
    await user.clear(secondTitleInput)
    await user.type(secondTitleInput, 'Task one - final')
    await user.click(within(secondCard).getByRole('button', { name: /save changes/i }))

    expect(screen.getByText('Task one - final')).toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    expect(stored[0].title).toBe('Task one - final')
  })
})
