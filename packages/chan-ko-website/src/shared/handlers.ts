/**
 * @fileoverview This file contains handlers used across the project.
 * These handlers are designed to be reusable for common interactions and events.
 *
 * @module handlers
 */

import { MouseEvent } from 'react';

/**
 * Options for the scrollIntoView method.
 * @typedef {Object} ScrollIntoViewOptions
 * @property {'auto' | 'smooth'} [behavior='auto'] - Defines the transition animation.
 * @property {'start' | 'center' | 'end' | 'nearest'} [block='start'] - Defines vertical alignment.
 * @property {'start' | 'center' | 'end' | 'nearest'} [inline='nearest'] - Defines horizontal alignment.
 */

/**
 * Handles scrolling to a specified element on the page with customizable options.
 *
 * @template T The type of the HTML element triggering the event.
 * @param {MouseEvent<T>} e - The mouse event object.
 * @param {string} id - The ID of the element to scroll to.
 * @param {ScrollIntoViewOptions} [options] - Options for the scrollIntoView method.
 * @param {boolean} [preventDefault=false] - Whether to call preventDefault on the event.
 * @returns {void}
 *
 * @example
 * // In a React component with a button element and default scrolling:
 * <button onClick={(e) => handleScroll<HTMLButtonElement>(e, 'section-id')}>
 *   Scroll to Section
 * </button>
 *
 * @example
 * // In a React component with an anchor element, custom scrolling options, and preventDefault:
 * <a href="#" onClick={(e) => handleScroll<HTMLAnchorElement>(e, 'section-id', { behavior: 'smooth', block: 'center' }, true)}>
 *   Smooth Scroll to Center
 * </a>
 *
 * @example
 * // In a React component with a div element, partial options, and preventDefault:
 * <div onClick={(e) => handleScroll<HTMLDivElement>(e, 'section-id', { behavior: 'smooth' }, true)}>
 *   Smooth Scroll
 * </div>
 */
function handleScroll<T>(
  e: MouseEvent<T>,
  id: string,
  options: ScrollIntoViewOptions = {},
  preventDefault: boolean = false
): void {
  if (preventDefault) {
    e.preventDefault();
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView(options);
  }
}

export { handleScroll };
