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
      "dark:focus-within"
    ],
    borderStyle: ["responsive", "dark"]
  }
```

You can check the full list of default variants in [Tailwind default config file][1].

[1]: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
