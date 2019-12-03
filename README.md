# Tailwindcss prefers dark mode

Tailwind CSS plugin that adds variants for [@media (prefers-color-scheme: dark)][2].

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
    require('tailwindcss-prefers-dark-mode')()
  ]
};
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

## Customize class name prefix for variants

`dark` is used as default prefix for variants generated. It´s possible to change `dark` for whatever you want, just pass any string as param. For example, with `prefers-dark`:

```js
module.exports = {
  // ...

  plugins: [
    // ...
    require('tailwindcss-prefers-dark-mode')('prefers-dark')
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
  ]
}
```

[1]: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
