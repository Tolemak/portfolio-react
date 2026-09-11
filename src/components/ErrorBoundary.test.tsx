import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const reload = vi.fn();

function Boom(): React.ReactElement {
  throw new Error('kaboom');
}

beforeEach(() => {
  sessionStorage.clear();
  reload.mockClear();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload },
  });
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('renders its children while nothing fails', () => {
    render(<ErrorBoundary><span>all good</span></ErrorBoundary>);

    expect(screen.getByText('all good')).toBeDefined();
  });

  it('shows the fallback instead of crashing', () => {
    render(<ErrorBoundary><Boom /></ErrorBoundary>);

    expect(document.querySelector('.error-boundary-section')).not.toBeNull();
  });

  it('clears stale chunk-retry flags before reloading', () => {
    sessionStorage.setItem('chunk-retry:home', '1');
    sessionStorage.setItem('chunk-retry:about', '1');
    sessionStorage.setItem('unrelated', 'keep me');

    render(<ErrorBoundary><Boom /></ErrorBoundary>);
    fireEvent.click(document.querySelector('.error-boundary-cta') as Element);

    expect(sessionStorage.getItem('chunk-retry:home')).toBeNull();
    expect(sessionStorage.getItem('chunk-retry:about')).toBeNull();
    expect(sessionStorage.getItem('unrelated')).toBe('keep me');
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
