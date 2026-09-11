import { Suspense } from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { lazyWithRetry } from './lazyWithRetry';

const reload = vi.fn();

beforeEach(() => {
  sessionStorage.clear();
  reload.mockClear();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload },
  });
});

afterEach(cleanup);

function renderLazy(factory: () => Promise<{ default: () => React.ReactElement }>, key: string) {
  const Lazy = lazyWithRetry(factory, key);

  return render(
    <Suspense fallback={<span>loading</span>}>
      <Lazy />
    </Suspense>,
  );
}

describe('lazyWithRetry', () => {
  it('renders the module and clears any stale retry flag', async () => {
    sessionStorage.setItem('chunk-retry:page', '1');
    renderLazy(() => Promise.resolve({ default: () => <span>loaded</span> }), 'page');

    await waitFor(() => expect(screen.getByText('loaded')).toBeDefined());
    expect(sessionStorage.getItem('chunk-retry:page')).toBeNull();
  });

  it('reloads once when the chunk fails to load', async () => {
    renderLazy(() => Promise.reject(new Error('stale chunk')), 'page');

    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    expect(sessionStorage.getItem('chunk-retry:page')).toBe('1');
  });

  it('gives up instead of reloading in a loop', async () => {
    sessionStorage.setItem('chunk-retry:page', '1');
    const failing = lazyWithRetry(() => Promise.reject(new Error('stale chunk')), 'page');

    // Rendering a rejected lazy component surfaces the error to the boundary;
    // asserting on the factory keeps the failure out of React's error path.
    await expect(
      (failing as unknown as { _payload: { _result: () => Promise<unknown> } })._payload._result(),
    ).rejects.toThrow('stale chunk');

    expect(reload).not.toHaveBeenCalled();
  });
});
