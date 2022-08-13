import { useCallback, useMemo } from 'react';

export type ObjectClassNames = Record<string, unknown>;
export type ClassNamesArgs = Array<ObjectClassNames | string | null | undefined | ClassNamesArgs>;
type CSSModuleClasses = Record<string, string>;

function transition(source: string, camel?: string) {
  if (!camel) return source;

  const result = source.replace(/[A-Z]/g, function (val) {
    return camel + val.toLowerCase();
  });

  if (result[0] === camel) {
    return result.slice(1);
  }

  return result;
}

export function useClassNames({
  prefix,
  styleSheet,
  camelTransition,
}: { prefix?: string; styleSheet?: CSSModuleClasses; camelTransition?: string } = {}) {
  const style = useMemo(
    function () {
      return new Proxy(styleSheet ?? {}, {
        get(target, key, receiver) {
          if (typeof key === 'symbol') return '';
          const name = transition(key, camelTransition);
          const value = Reflect.get(target, name, receiver);

          if (!value) return '';

          const prefixStr = prefix ?? '';
          return prefixStr + value;
        },
      });
    },
    [prefix, styleSheet, camelTransition],
  );

  const parseClassNames = useCallback(function (...args: ClassNamesArgs) {
    const classNames: string[] = [];

    args.forEach(function (val) {
      if (typeof val === 'string') {
        classNames.push(val);
      } else if (Array.isArray(val)) {
        const result = parseClassNames(...val);
        classNames.push(result);
      } else {
        for (const key in val) {
          if (!Object.prototype.hasOwnProperty.call(val, key)) continue;
          const value = val[key];
          const result = typeof value === 'function' ? value() : value;
          if (result) {
            classNames.push(key);
          }
        }
      }
    });

    return classNames.join(' ');
  }, []);

  return [style, parseClassNames] as const;
}
