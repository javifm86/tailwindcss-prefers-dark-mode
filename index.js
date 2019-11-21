const postcss = require('postcss');

module.exports = function() {
  return function({ addVariant, e }) {
    addVariant('dark', ({ container, separator }) => {
      const variant = '';
      return getSelector({ container, separator, variant });
    });

    addVariant('dark:hover', ({ container, separator }) => {
      const variant = 'hover';
      return getSelector({ container, separator, variant });
    });

    addVariant('dark:focus', ({ container, separator }) => {
      const variant = 'focus';
      return getSelector({ container, separator, variant });
    });

    addVariant('dark:active', ({ container, separator }) => {
      const variant = 'active';
      return getSelector({ container, separator, variant });
    });

    addVariant('dark:group-hover', ({ container, separator }) => {
      const variant = 'group-hover';
      return getSelector({ container, separator, variant });
    });

    addVariant('dark:focus-within', ({ container, separator }) => {
      const variant = 'focus-within';
      return getSelector({ container, separator, variant });
    });

    function getSelector({ container, separator, variant }) {
      const supportsRule = postcss.atRule({ name: 'media', params: '(prefers-color-scheme: dark)' });
      supportsRule.append(container.nodes);
      container.append(supportsRule);
      supportsRule.walkRules(rule => {
        switch (variant) {
          case 'focus':
            rule.selector = `.${e(`dark:focus${separator}${rule.selector.slice(1)}`)}:focus`;
            break;
          case 'focus-within':
            rule.selector = `.${e(`dark:focus-within${separator}${rule.selector.slice(1)}`)}:focus-within`;
            break;
          case 'hover':
            rule.selector = `.${e(`dark:hover${separator}${rule.selector.slice(1)}`)}:hover`;
            break;
          case 'active':
            rule.selector = `.${e(`dark:active${separator}${rule.selector.slice(1)}`)}:active`;
            break;
          case 'group-hover':
            rule.selector = `.group:hover .${e(`dark:group-hover${separator}${rule.selector.slice(1)}`)}`;
            break;
          default:
            rule.selector = `.${e(`dark${separator}${rule.selector.slice(1)}`)}`;
            break;
        }
      });
    }
  };
};
