const postcss = require('postcss');

module.exports = function(options) {
  // Default prefix for naming Tailwind variants
  const DEFAULT_PREFIX = 'dark';

  // Default activator class name
  const DEFAULT_CLASS = '.dark-mode';

  // Default settings
  let settings = {
    type: 'mediaQuery',
    prefix: null,
    className: null
  };

  // Allow maintining invoking plugin without params or with just one string
  if (options == null) {
    options = DEFAULT_PREFIX;
  }

  // Default behaviour is @media (prefers-color-scheme: dark)
  if (typeof options === 'string' || options instanceof String) {
    settings.prefix = options;
  } else {
    settings.type = options.type;
    settings.prefix = options.prefix != null ? options.prefix : DEFAULT_PREFIX;

    if (options.type === 'class') {
      settings.className = options.className != null ? options.className : DEFAULT_CLASS;
    }
  }

  return function({ addVariant, e, prefix }) {
    addVariant(settings.prefix, ({ container, separator, modifySelectors }) => {
      const variant = '';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:hover`, ({ container, separator, modifySelectors }) => {
      const variant = 'hover';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:focus`, ({ container, separator, modifySelectors }) => {
      const variant = 'focus';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:active`, ({ container, separator, modifySelectors }) => {
      const variant = 'active';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:disabled`, ({ container, separator, modifySelectors }) => {
      const variant = 'disabled';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:group-hover`, ({ container, separator, modifySelectors }) => {
      const variant = 'group-hover';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:focus-within`, ({ container, separator, modifySelectors }) => {
      const variant = 'focus-within';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:odd`, ({ container, separator, modifySelectors }) => {
      const variant = 'odd';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    addVariant(`${settings.prefix}:even`, ({ container, separator, modifySelectors }) => {
      const variant = 'even';
      return getSelector({ container, separator, variant, modifySelectors });
    });

    /**
     * Bridge function that returns media query selector or activator CSS class selector.
     */
    function getSelector({ container, separator, variant, modifySelectors }) {
      if (settings.type === 'mediaQuery') {
        return getMediaQuerySelector({ container, separator, variant });
      }
      return getClassSelector({ separator, variant, modifySelectors });
    }

    /**
     * Generate variants for @media (prefers-color-scheme: dark)
     */
    function getMediaQuerySelector({ container, separator, variant }) {
      const supportsRule = postcss.atRule({ name: 'media', params: '(prefers-color-scheme: dark)' });
      supportsRule.append(container.nodes);
      container.append(supportsRule);
      supportsRule.walkRules(rule => {
        switch (variant) {
          case 'focus':
            rule.selector = `.${e(`${settings.prefix}:focus${separator}${rule.selector.slice(1)}`)}:focus`;
            break;
          case 'focus-within':
            rule.selector = `.${e(
              `${settings.prefix}:focus-within${separator}${rule.selector.slice(1)}`
            )}:focus-within`;
            break;
          case 'hover':
            rule.selector = `.${e(`${settings.prefix}:hover${separator}${rule.selector.slice(1)}`)}:hover`;
            break;
          case 'active':
            rule.selector = `.${e(`${settings.prefix}:active${separator}${rule.selector.slice(1)}`)}:active`;
            break;
          case 'disabled':
            rule.selector = `.${e(`${settings.prefix}:disabled${separator}${rule.selector.slice(1)}`)}:disabled`;
            break;
          case 'group-hover':
            rule.selector = `${prefix('.group')}:hover .${e(
              `${settings.prefix}:group-hover${separator}${rule.selector.slice(1)}`
            )}`;
            break;
          case 'odd':
            rule.selector = `.${e(`${settings.prefix}:odd${separator}${rule.selector.slice(1)}`)}:nth-child(odd)`;
            break;
          case 'even':
            rule.selector = `.${e(`${settings.prefix}:even${separator}${rule.selector.slice(1)}`)}:nth-child(even)`;
            break;
          default:
            rule.selector = `.${e(`${settings.prefix}${separator}${rule.selector.slice(1)}`)}`;
            break;
        }
      });
    }

    /**
     * Generate variants with an activator css class in root element (html or body for example)
     */
    function getClassSelector({ separator, variant, modifySelectors }) {
      modifySelectors(({ className }) => {
        switch (variant) {
          case 'focus':
            return `${settings.className} .${e(`${settings.prefix}:focus${separator}${className}`)}:focus`;
          case 'focus-within':
            return `${settings.className} .${e(
              `${settings.prefix}:focus-within${separator}${className}`
            )}:focus-within`;
          case 'hover':
            return `${settings.className} .${e(`${settings.prefix}:hover${separator}${className}`)}:hover`;
          case 'active':
            return `${settings.className} .${e(`${settings.prefix}:active${separator}${className}`)}:active`;
          case 'disabled':
            return `${settings.className} .${e(`${settings.prefix}:disabled${separator}${className}`)}:disabled`;
          case 'group-hover':
            return `${settings.className} ${prefix('.group')}:hover .${e(
              `${settings.prefix}:group-hover${separator}${className}`
            )}`;
          case 'odd':
            return `${settings.className} .${e(`${settings.prefix}:odd${separator}${className}`)}:nth-child(odd)`;
          case 'even':
            return `${settings.className} .${e(`${settings.prefix}:even${separator}${className}`)}:nth-child(even)`;
          default:
            return `${settings.className} .${e(`${settings.prefix}${separator}${className}`)}`;
        }
      });
    }
  };
};
