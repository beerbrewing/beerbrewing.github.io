/**
 * @file Beer.test.js
 * @description Component tests for the Beer component
 * Ensures proper rendering and functionality of beer product displays
 * @author Pyrmont Brewery
 * @version 1.0.0
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Beer from '../src/Beer';

describe('Beer Component Tests', () => {
  const mockProps = {
    name: 'Test Beer',
    beerstyle: 'IPA',
    abv: '5.6',
    ibu: '45',
    ebc: '12',
    label_url: 'url("test-label.png")'
  };

  test('renders beer component with all information', () => {
    render(
      <Beer {...mockProps}>
        A delicious test beer with hoppy notes.
      </Beer>
    );

    // Check that all beer properties are displayed
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.beerstyle, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.abv}%`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`IBU ${mockProps.ibu}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(`EBC ${mockProps.ebc}`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('A delicious test beer with hoppy notes.')).toBeInTheDocument();
  });

  test('email link is constructed correctly', () => {
    render(<Beer {...mockProps} />);

    // Find the email link
    const emailLink = screen.getByRole('link');

    // Check that it contains the correct href attributes
    expect(emailLink.getAttribute('href')).toContain('mailto:kegs@pyrmontbrewery.com');
    expect(emailLink.getAttribute('href')).toContain(`subject=Beer: ${mockProps.name}`);
    expect(emailLink.getAttribute('href')).toContain('body=I');

    // Verify it opens in a new tab
    expect(emailLink.getAttribute('target')).toBe('_blank');
  });

  test('beer label background is applied correctly', () => {
    render(<Beer {...mockProps} />);

    // Find the element with the BeerSnap class
    const beerSnap = screen.getByText('Program:', { exact: false }).closest('div');

    // Check that the style includes the background image
    expect(beerSnap).toHaveStyle(`backgroundImage: ${mockProps.label_url}`);
  });
});
