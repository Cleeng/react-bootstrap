import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, bsSizes, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import { Size, State, Style } from './utils/StyleConfig';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  componentClass: elementType,
  href: PropTypes.string,
  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

const defaultProps = {
  active: false,
  block: false,
  disabled: false,
};

class Button extends React.Component {
  renderAnchor(elementProps, className) {
    return (
      <SafeAnchor
        {...elementProps}
        className={classNames(
          className, elementProps.disabled && 'disabled'
        )}
      />
    );
  }

  renderButton({ componentClass, ...elementProps }, className) {
    const Component = componentClass || 'button';

    if (Component === 'span') {
      return (
        <Component
          {...elementProps}
          className={className}
        />
      );
    }
    return (
      <Component
        {...elementProps}
        type={elementProps.type || 'button'}
        className={className}
      />
    );
  }

  render() {
    const { active, block, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      [prefix(bsProps, 'block')]: block,
    };
    const fullClassName = classNames(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default bsClass('btn',
  bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL],
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY, Style.LINK],
      Style.DEFAULT,
      Button
    )
  )
);
