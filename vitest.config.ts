import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary'],
      // Scoped to the layers where a test asserts behaviour rather than markup;
      // presentational components are covered by using the site, not by counters.
      include: [
        'src/utils/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/contexts/**/*.{ts,tsx}',
        'src/data/**/*.{ts,tsx}',
        'src/components/ErrorBoundary.tsx',
      ],
      // useHighlightedModel drives a three.js frame loop, same reason as the scenes.
      exclude: ['src/**/*.test.{ts,tsx}', 'src/hooks/useHighlightedModel.ts'],
      thresholds: { lines: 80 },
    },
  },
});
