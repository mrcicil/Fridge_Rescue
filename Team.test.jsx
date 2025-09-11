import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Team from './src/routes/Team'

describe('Team components', () => {
  test('renders the main heading and mission statement', () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /Meet Our Team/i })).toBeInTheDocument()
    expect(screen.getByText(/committed to helping households reduce food waste/i)).toBeInTheDocument()
  })

  test('renders all team members with name, role, and description', () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    )

    // Names
    expect(screen.getByText('Rahmat Khairi')).toBeInTheDocument()
    expect(screen.getByText('Indy')).toBeInTheDocument()
    expect(screen.getByText('Trisha')).toBeInTheDocument()
    expect(screen.getByText('Caleb')).toBeInTheDocument()

    // Roles
    const roles = screen.getAllByText('Member')
    expect(roles).toHaveLength(4)

    // Descriptions
    expect(screen.getByText(/Four minds, four paths/i)).toBeInTheDocument()
    expect(screen.getByText(/Together we learn/i)).toBeInTheDocument()
  })

  test('renders images with correct alt text', () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    )

    const img = screen.getByAltText('Rahmat Khairi')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('Rahmat'))
  })

  test('renders link to recipe finder', () => {
    render(
      <MemoryRouter>
        <Team />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: /Try Our Recipe Finder/i })
    expect(link).toHaveAttribute('href', '/search')
  })
})
