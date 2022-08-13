import { expect, test } from 'vitest';
import { useClassNames } from '@';
import { renderHook } from '@testing-library/react';

test('useClassNames defined', function () {
  expect(useClassNames).toBeDefined();
});

const mockClass = {
  title: 'title',
  'line-title': 'line-title',
  camelTitle: 'camelTitle',
};

test('join string', function () {
  const { result } = renderHook(function () {
    const [_, cls] = useClassNames();
    return cls('a', 'b', 'c', null, undefined);
  });

  expect(result.current).toBe('a b c');
});

test('join array class', function () {
  const { result } = renderHook(function () {
    const [_, cls] = useClassNames();

    return cls(['a', 'b', 'c', 'd', null, undefined]);
  });

  expect(result.current).toBe('a b c d');
});

test('join object class', function () {
  const { result } = renderHook(function () {
    const [_, cls] = useClassNames();

    return cls({
      a: true,
      b: false,
      c: true,
      d: 2 > 0,
      e: 2,
      f: 0,
      j: '',
      h: [],
      i: {},
      g: () => true,
      k: () => false,
      o: null,
      p: undefined,
      q: () => null,
    });
  });

  expect(result.current).toBe('a c d e h i g');
});

test('use module.css', function () {
  const { result } = renderHook(function () {
    const [style] = useClassNames({ styleSheet: mockClass });

    return style;
  });

  expect(result.current.title).toBe('title');
  expect(result.current.camelTitle).toBe('camelTitle');
});

test('add prefix', function () {
  const { result } = renderHook(function () {
    const [style] = useClassNames({ styleSheet: mockClass, prefix: 'info-' });

    return style;
  });

  expect(result.current.title).toBe('info-title');
  expect(result.current.camelTitle).toBe('info-camelTitle');
});

test('camel transition', function () {
  const { result } = renderHook(function () {
    const [style] = useClassNames({ styleSheet: mockClass, camelTransition: '-' });

    return style;
  });

  expect(result.current.title).toBe('title');
  expect(result.current.lineTitle).toBe('line-title');
});
