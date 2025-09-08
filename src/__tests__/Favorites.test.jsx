import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from '../context/FavoritesContext';
import Favorites from '../routes/Favorites';
import * as recipesApi from '../api/recipesapi';

// Mock the API module
jest.mock('../api/recipesapi');

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Sample test data
const mockFavorites = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    recipeId: '123e4567-e89b-12d3-a456-426614174001',
    recipeTitle: 'Chicken Stir Fry',
    recipeDescription: 'A quick and healthy chicken stir fry with vegetables',
    recipeImage: 'https://example.com/chicken-stir-fry.jpg',
    customTitle: null,
    customDescription: null,
    customNotes: 'My Notes: So like black sheep.'
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174000',
    recipeId: '223e4567-e89b-12d3-a456-426614174001',
    recipeTitle: 'Spaghetti Carbonara',
    recipeDescription: 'Classic Italian pasta dish with eggs and cheese',
    recipeImage: 'https://example.com/spaghetti-carbonara.jpg',
    customTitle: 'My Favorite Pasta',
    customDescription: 'The best pasta dish ever',
    customNotes: 'Add extra cheese!'
  }
];

// Helper function to render the component with all required providers
const renderFavorites = () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn().mockImplementation((key) => {
      if (key === 'userId') return 'test-user-id';
      if (key === 'userName') return 'TestUser';
      return null;
    }),
    setItem: jest.fn(),
    clear: jest.fn()
  };
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // Mock the API calls
  recipesApi.getMemberFavorites.mockResolvedValue(mockFavorites);
  recipesApi.removeFromFavorites.mockResolvedValue(true);

  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Favorites />} />
        </Routes>
      </FavoritesProvider>
    </MemoryRouter>
  );
};

describe('Favorites Component', () => {
  // Test Case 1: Renders the favorites list correctly
  test('renders the favorites list with correct data', async () => {
    renderFavorites();
    
    // Wait for the favorites to load
    await waitFor(() => {
      expect(screen.getByText('My Favorite Recipes')).toBeInTheDocument();
    });
    
    // Check if both recipes are displayed
    expect(screen.getByText('Chicken Stir Fry')).toBeInTheDocument();
    expect(screen.getByText('My Favorite Pasta')).toBeInTheDocument();
    
    // Check if descriptions are displayed
    expect(screen.getByText('A quick and healthy chicken stir fry with vegetables')).toBeInTheDocument();
    expect(screen.getByText('The best pasta dish ever')).toBeInTheDocument();
    
    // Check if custom notes are displayed
    expect(screen.getByText('My Notes: So like black sheep.')).toBeInTheDocument();
    expect(screen.getByText('Add extra cheese!')).toBeInTheDocument();
  });

  // Test Case 2: Navigates to recipe detail when "View Recipe" is clicked
  test('navigates to recipe detail when View Recipe button is clicked', async () => {
    renderFavorites();
    
    // Wait for the favorites to load
    await waitFor(() => {
      expect(screen.getByText('My Favorite Recipes')).toBeInTheDocument();
    });
    
    // Find the "View Recipe" button for the first recipe and click it
    const viewButtons = screen.getAllByText('View Recipe');
    fireEvent.click(viewButtons[0]);
    
    // Check if navigation was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith(`/recipe/${mockFavorites[0].recipeId}`);
  });

  // Test Case 3: Navigates to edit page when "Edit" button is clicked
  test('navigates to edit page when Edit button is clicked', async () => {
    renderFavorites();
    
    // Wait for the favorites to load
    await waitFor(() => {
      expect(screen.getByText('My Favorite Recipes')).toBeInTheDocument();
    });
    
    // Find the "Edit" button for the first recipe and click it
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    // Check if navigation was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith(`/favorites/edit/${mockFavorites[0].id}`);
  });

  // Test Case 4: Deletes a favorite when "Delete" button is clicked
  test('deletes a favorite when Delete button is clicked and confirmed', async () => {
    // Mock window.confirm to return true (user confirms deletion)
    window.confirm = jest.fn().mockImplementation(() => true);
    
    renderFavorites();
    
    // Wait for the favorites to load
    await waitFor(() => {
      expect(screen.getByText('My Favorite Recipes')).toBeInTheDocument();
    });
    
    // Find the "Delete" button for the first recipe and click it
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check if confirmation dialog was shown
    expect(window.confirm).toHaveBeenCalled();
    
    // Check if the API was called to delete the favorite
    await waitFor(() => {
      expect(recipesApi.removeFromFavorites).toHaveBeenCalledWith(
        'test-user-id', 
        mockFavorites[0].id
      );
    });
  });

  // Test Case 5: Shows empty state when no favorites exist
  test('shows empty state when no favorites exist', async () => {
    // Override the mock to return empty array
    recipesApi.getMemberFavorites.mockResolvedValue([]);
    
    renderFavorites();
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('My Favorite Recipes')).toBeInTheDocument();
    });
    
    // Check if empty state message is displayed
    expect(screen.getByText(/You haven't saved any favorite recipes yet/i)).toBeInTheDocument();
    
    // Check if the "Find Recipes" button is displayed
    const findRecipesButton = screen.getByText('Find Recipes');
    expect(findRecipesButton).toBeInTheDocument();
    
    // Click the button and check navigation
    fireEvent.click(findRecipesButton);
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });
});
