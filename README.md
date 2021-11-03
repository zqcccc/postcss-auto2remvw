# postcss-auto2remvw

[PostCSS](https://github.com/postcss/postcss) plugin auto change px to rem & vw.

[![test](https://github.com/zqcccc/postcss-auto2remvw/actions/workflows/codecov.yml/badge.svg)](https://github.com/zqcccc/postcss-auto2remvw)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/zqcccc/postcss-auto2remvw/main.svg)](https://codecov.io/gh/zqcccc/postcss-auto2remvw/)
<a href="https://npmcharts.com/compare/postcss-auto2remvw?minimal=true"><img src="https://img.shields.io/npm/dm/postcss-auto2remvw.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/postcss-auto2remvw"><img src="https://img.shields.io/npm/v/postcss-auto2remvw.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/postcss-auto2remvw"><img src="https://img.shields.io/npm/l/postcss-auto2remvw.svg?sanitize=true" alt="License"></a>

## Intro

The rem layout is affected by the root font-size, if Android turns on the font-size enlargement mode, it will cause the whole layout to crash.

The viewport scale under Android is forced to 1, some Canvas drawing content is slightly blurred. Some Android devices have bug in changing scale, too many devices are difficult to locate the problem.

```css
.foo {
  height: 100px;
}
```

```css
.foo {
  height: 0.133333rem;
  height: 13.333333vw;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-auto2remvw
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-auto2remvw')(config),
    require('autoprefixer')
  ]
}
```

## Config

| Name              | Type                               | Default                 | Description                                                  |
| ----------------- | ---------------------------------- | ----------------------- | ------------------------------------------------------------ |
| *baseSize*        | `{ rem: number, vw: number }`      | `{ rem: 750, vw: 7.5 }` | Base unit of the design draft for comparison with px ( If you change this value you must have both rem and vw ) |
| *precision*       | `int`                         | `6`                     | Calculation accuracy                                         |
| *forceRemProps*   | `string[]`               | `["font", "font-size"]` | Force only rem units to be used for properties               |
| *keepRuleComment* | `string`                           | `"no-RemVw-next-line"`  | Disable next line to use auto2remvw, must use like `/* no-RemVw-next-line */` |
| *keepFileComment* | `string`                           | `"auto2remvw-disable"`  | Disable next line to use auto2remvw ( must be the first line of the file ) |
| *customConfigs*   | `{ test: RegExp, config: Config }[]` | `undefined`             | Specify part of the file to use other configurations         |




[postcss official docs]( https://github.com/postcss/postcss#usage)
