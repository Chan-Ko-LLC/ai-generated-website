import {describe, it, expect, vi} from 'vitest';
import {handleScroll} from '../../src/shared/handlers';

describe('handleScroll', () => {
  it('should call scrollIntoView on the element if it exists with default options', () => {
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    handleScroll<HTMLButtonElement>(mockEvent, 'existing-id');

    expect(mockGetElementById).toHaveBeenCalledWith('existing-id');
    expect(mockScrollIntoView).toHaveBeenCalledWith({});
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should call scrollIntoView with custom options when provided', () => {
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    const customOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' };
    handleScroll<HTMLAnchorElement>(mockEvent, 'existing-id', customOptions);

    expect(mockGetElementById).toHaveBeenCalledWith('existing-id');
    expect(mockScrollIntoView).toHaveBeenCalledWith(customOptions);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should not call scrollIntoView if the element does not exist', () => {
    const mockGetElementById = vi.fn().mockReturnValue(null);
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLDivElement>;

    handleScroll<HTMLDivElement>(mockEvent, 'non-existing-id');

    expect(mockGetElementById).toHaveBeenCalledWith('non-existing-id');
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should call preventDefault when the preventDefault parameter is true', () => {
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById);

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent<HTMLAnchorElement>;

    handleScroll<HTMLAnchorElement>(mockEvent, 'existing-id', { behavior: 'smooth' }, true);

    expect(mockGetElementById).toHaveBeenCalledWith('existing-id');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
