# Tailwindcss prefers dark mode

Tailwind CSS plugin that adds variants for [@media (prefers-color-scheme: dark)][2]. It can also generate dark
variants with an activator CSS class on the `html`, `body` or any `parent` tag making the dark classes active allowing easily switch between light and dark theme.

## Installation

```
npm install tailwindcss-prefers-dark-mode --save-dev
```

Add the plugin to the `plugins` array in your `tailwind.config.js` file.

```js
module.exports = {
  // ...

  plugins: [
    // ...
    require('tailwindcss-prefers-dark-mode')({
      type: 'mediaQuery', // 'mediaQuery' or 'class'
      className: '.dark-mode', // Activator css class if type === 'class'
      prefix: 'dark' // Class name prefix for naming dark variants
    })
  ]
};
```

## Plugin params

You can customize how dark variants are generated depending on the params passed to the plugin. The old behaviour was passing no params or just an empty string. You can continue using the old config but passing an object is prefered. These are the different posibilities:

- **No params**. If no param is supplied, variants will be under `@media (prefers-color-scheme: dark)` and the default prefix for classes will be `dark`.

```js
require('tailwindcss-prefers-dark-mode')();
```

- **Passing an string**. In this case variants will be generated under `@media (prefers-color-scheme: dark)` but the prefix for classes will be the string passed. For example, with `prefers-dark`:

```js
require('tailwindcss-prefers-dark-mode')('prefers-dark');
```

- **Passing an object** allows you to choose between generate variants with `@media (prefers-color-scheme: dark)` or generate with an activator CSS class. Object properties:
  - `type`: `mediaQuery` if you want the option with `@media (prefers-color-scheme: dark)` or `class` if you prefer an activator CSS class. This field is **required**.
  - `className`: The activator CSS class if type is `class`. If no `className` is provided, `.dark-mode` class will be used as default.
  - `prefix`: Prefix for naming dark variants. If no prefix is provided, `dark` will be used as default.

```js
require('tailwindcss-prefers-dark-mode')({
  type: 'class', // 'mediaQuery'
  className: '.dark-mode',
  prefix: 'dark'
});
```

## Variants generated

- `dark`
- `dark:hover`
- `dark:focus`
- `dark:active`
- `dark:disabled`
- `dark:odd`
- `dark:even`
- `dark:group-hover`
- `dark:focus-within`

```html
<div class="bg-gray-100 dark:bg-gray-800 border-t-4 border-green-500">
  <nav class="flex flex-wrap justify-end items-center p-4">
    <a class="text-gray-700 hover:bg-gray-300 dark:hover:bg-transparent dark:focus:text-green-500" href="#">Text</a>
  </nav>
</div>
```

Dark variants must be enabled on each utility in your `tailwind.config.js` file.

```js
variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark:hover",
      "dark:focus"
    ],
    borderColor: [
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark:hover",
      "dark:focus"
    ],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "dark",
      "dark:hover",
      "dark:focus",
      "dark:group-hover",
      "focus-within",
      "dark:focus-within",
      "dark:odd",
      "dark:even",
      "dark:active",
      "dark:disabled"
    ],
    borderStyle: ["responsive", "dark"]
  }
```

You can check the full list of default variants in [Tailwind default config file][1].

## Use @apply to inline any existing utility classes in dark mode

### With **@media (prefers-color-scheme: dark)**

Just use `prefers-color-scheme` CSS media feature and apply Tailwind classes.

```css
.btn {
  @apply font-bold py-2 px-4 rounded bg-red-500;
}

@media (prefers-color-scheme: dark) {
  .btn {
    @apply bg-gray-500;
  }
}
```

### With **activator CSS class**

Just add the activator CSS class at the beggining of the selector and apply Tailwind classes.

```css
.btn {
  @apply font-bold py-2 px-4 rounded bg-red-500;
}

.dark-mode .btn {
  @apply bg-gray-500;
}
```

## Customize class name prefix for variants

`dark` is used as default prefix for variants generated. It´s possible to change `dark` for whatever you want, just pass any string as param or use prefix key if you pass an object as param to the plugin. For example, with `prefers-dark`:

```js
module.exports = {
  // ...

  plugins: [
    // ...
    require('tailwindcss-prefers-dark-mode')('prefers-dark')
  ]
};
```

```js
module.exports = {
  // ...

  plugins: [
    // ...
    require('tailwindcss-prefers-dark-mode')({
      type: 'class', // 'mediaQuery'
      className: '.dark-mode',
      prefix: 'prefers-dark'
    })
  ]
};
```

And variants must be named with the new prefix:

```js
variants: {
  textColor: [
    'responsive',
    'hover',
    'focus',
    'group-hover',
    'prefers-dark',
    'prefers-dark:hover',
    'prefers-dark:focus',
    'prefers-dark:group-hover',
    'focus-within',
    'prefers-dark:focus-within'
  ];
}
```

[1]: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
