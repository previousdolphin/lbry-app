import React from 'react';
import classnames from 'classnames';

type Props = {
  src: string,
  shouldObscure: boolean
};

class Thumbnail extends React.PureComponent {
  render() {
    const { className, src, shouldObscure } = this.props;
    return (
      <img
        ref="img"
        className={classnames({ "card--obscured": shouldObscure }, className)}
      />
    );
  }
}

export default Thumbnail;
