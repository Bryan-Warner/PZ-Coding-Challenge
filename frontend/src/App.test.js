import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockCheeses = [
  { id: 1, name: 'Cheddar', color: 'Yellow', pricePerKilo: 20, imageURL: 'https://example.com/cheddar.jpg' },
  { id: 2, name: 'Gouda', color: 'Light yellow', pricePerKilo: 15, imageURL: 'https://example.com/gouda.jpg' }
];

describe('App component tests', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCheeses });
  });

  test('renders the cheese catalog and calculator sections', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('PZ Cheeseria')).toBeInTheDocument());
    expect(screen.getByText('Cheese Catalog')).toBeInTheDocument();
    expect(screen.getByText('Cheese Calculator')).toBeInTheDocument();
  });

  test('loads and displays cheeses from the API', async () => {
    render(<App />);
    await waitFor(() => {
      const cheddars = screen.getAllByText('Cheddar');
      expect(cheddars.length).toBeGreaterThan(0);
      const goudas = screen.getAllByText('Gouda');
      expect(goudas.length).toBeGreaterThan(0);
    });
    expect(screen.getByAltText('Cheddar')).toHaveAttribute('src', 'http://localhost:3000' + mockCheeses[0].imageURL);
    expect(screen.getByAltText('Gouda')).toHaveAttribute('src', 'http://localhost:3000' + mockCheeses[1].imageURL);
  });

  test('calculates total price correctly based on selected cheese and weight', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole('combobox', { name: /choose a cheese/i })).toBeInTheDocument());

    fireEvent.change(screen.getByRole('combobox', { name: /choose a cheese/i }), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Enter weight in kilos'), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    await waitFor(() => expect(screen.getByText(/Total Price: \$40\.00/i)).toBeInTheDocument());
  });

  test('handles no selection and displays total price as $0', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    await waitFor(() => expect(screen.getByText("Total Price: $0")).toBeInTheDocument());
  });
});
