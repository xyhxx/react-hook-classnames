<p align="center">
  <img src="./public/logo.svg" width="200" alt="logo" />
</p>
<h1 align="center">react-hook-classnames</h1>

<p align="center">Simple and convenient of hooks of classNames, support modules css,joining classNames...</p>

<br />
<br />

# Usage

join classnames

```react
// import {classNames as cls} from 'react-hook-classnames'
const [,cls] = useClassNames();

cls('a', 'b', 'c', null, undefined); // 'a b c'
cls(['a', 'b', 'c', 'd', null, undefined]); // 'a b c d'
cls({
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
}); // a c d e h i g
```

use module.css

```css
// index.module.css

.title {
  color: pink;
}

.title-font {
  font-size: 20px;
}
```

```react
import style from './index.module.css';

const [css] = useClassnames({styleSheet: style, camelTransition: '-'});
console.log(css.title); // title-xFi12
console.log(css.titleFont); // title-font-FEgi1
```

# MIT

```
MIT License

Copyright (c) 2022 xyhxx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
