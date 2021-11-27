import React from "react";
import { render, screen } from '@testing-library/react'
import About from '../pages/about';

describe('Check of elements', () => {
    it('renders header', () => {
        render(<About />)
    });

    const heading = screen.getByRole('heading', {
        name: /About ThinkinaryL/i,
      })
  
      expect(heading).toBeInTheDocument()
});