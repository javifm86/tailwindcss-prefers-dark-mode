const postcss = require('postcss');

module.exports = function(prefix = 'dark') {
  return function({ addVariant, e }) {
    addVariant(prefix, ({ container, separator }) => {
      const variant = '';
      return getSelector({ container, separator, variant });
    });

    addVariant(`${prefix}:hover`, ({ container, separator }) => {
      const variant = 'hover';
      return getSelector({ container, separator, variant });
    });

    addVariant(`${prefix}:focus`, ({ container, separator }) => {
      const variant = 'focus';
      return getSelector({ container, separator, variant });
    });

    addVariant(`${prefix}:active`, ({ container, separator }) => {
      const variant = 'active';
      return getSelector({ container, separator, variant });
    });

    addVariant(`${prefix}:group-hover`, ({ container, separator }) => {
      const variant = 'group-hover';
      return getSelector({ container, separator, variant });
    });

    addVariant(`${prefix}:focus-within`, ({ container, separator }) => {
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
            rule.selector = `.${e(`${prefix}:focus${separator}${rule.selector.slice(1)}`)}:focus`;
            break;
          case 'focus-within':
            rule.selector = `.${e(`${prefix}:focus-within${separator}${rule.selector.slice(1)}`)}:focus-within`;
            break;
          case 'hover':
            rule.selector = `.${e(`${prefix}:hover${separator}${rule.selector.slice(1)}`)}:hover`;
            break;
          case 'active':
            rule.selector = `.${e(`${prefix}:active${separator}${rule.selector.slice(1)}`)}:active`;
            break;
          case 'group-hover':
            rule.selector = `.group:hover .${e(`${prefix}:group-hover${separator}${rule.selector.slice(1)}`)}`;
            break;
          default:
            rule.selector = `.${e(`${prefix}${separator}${rule.selector.slice(1)}`)}`;
            break;
        }
      });
    }
  };
};
