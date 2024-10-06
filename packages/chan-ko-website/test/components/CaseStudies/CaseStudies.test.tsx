/**
 * @fileoverview Unit tests for the CaseStudies component.
 *
 * This file contains Vitest unit tests for the CaseStudies component.
 * It tests the rendering of case study cards, the expansion and collapse
 * functionality of individual cards, and ensures that only one card
 * can be expanded at a time.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CaseStudies from '../../../src/components/CaseStudies';

describe('CaseStudies', () => {
  beforeEach(() => {
    render(<CaseStudies />);
  });

  it('renders the Case Studies title', () => {
    expect(screen.getByText('Case Studies')).toBeDefined();
  });

  it('renders all case study cards', () => {
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByText('Fractional CTO Engagement')).toBeDefined();
    expect(screen.getByText('Beta Transformation')).toBeDefined();
    expect(screen.getByText('Gamma Tech Integration')).toBeDefined();
  });

  it('initially shows short descriptions', () => {
    expect(screen.getByText("Transforming a Computer Vision Startup's Engineering Organization")).toBeDefined();
    expect(screen.getByText('Digital transformation for a leading retail chain.')).toBeDefined();
    expect(screen.getByText('Seamless integration of cutting-edge technologies.')).toBeDefined();
  });

  it('expands a card when "Read More" is clicked', () => {
    const readMoreButtons = screen.getAllByText('Read More');
    fireEvent.click(readMoreButtons[0]);

    expect(screen.getByText(/Fractional CTO Engagement/)).toBeDefined();
    expect(screen.getByText(/Client Overview/)).toBeDefined();
    expect(screen.queryByText("Transforming a Computer Vision Startup's Engineering Organization")).toBeNull();
  });

  it('collapses an expanded card when "Read Less" is clicked', () => {
    const readMoreButtons = screen.getAllByText('Read More');
    fireEvent.click(readMoreButtons[0]);
    const readLessButton = screen.getByText('Read Less');
    fireEvent.click(readLessButton);

    expect(screen.queryByText(/Client Overview/)).toBeNull();
    expect(screen.getByText("Transforming a Computer Vision Startup's Engineering Organization")).toBeDefined();
  });

  it('only expands one card at a time', () => {
    const readMoreButtons = screen.getAllByText('Read More');
    fireEvent.click(readMoreButtons[0]);
    fireEvent.click(readMoreButtons[1]);

    expect(screen.queryByText(/Client Overview/)).toBeNull();
    expect(screen.getByText(/The Beta Transformation project involved/)).toBeDefined();
  });
});
