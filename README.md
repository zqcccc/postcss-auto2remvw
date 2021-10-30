# postcss-auto2remvw

[PostCSS](https://github.com/postcss/postcss) plugin auto change px to rem & vw.

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

| Name              | Type                              | Default                 | Description                                                  |
| ----------------- | --------------------------------- | ----------------------- | ------------------------------------------------------------ |
| *baseSize*        | `{ rem: number, vw: number}`      | `{ rem: 750, vw: 7.5 }` | Base unit of the design draft for comparison with px         |
| *precision*       | `{int}`                           | `6`                     | Calculation accuracy                                         |
| *forceRemProps*   | `{string[]}`                      | `["font", "font-size"]` | Force only rem units to be used for properties               |
| *keepRuleComment* | `string`                          | `"no-RemVw-next-line"`  | Disable next line to use auto2remvw, must use like `/* no-RemVw-next-line */` |
| *keepFileComment* | `string`                          | `"auto2remvw-disable"`  | Disable next line to use auto2remvw ( must be the first line of the file ) |
| *customConfigs*   | `{ reg: RegExp, config: Config }` | `undefined`             | Specify part of the file to use other configurations         |



[postcss official docs]( https://github.com/postcss/postcss#usage)
