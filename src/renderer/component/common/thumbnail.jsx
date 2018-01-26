import React from 'react';
import classnames from 'classnames';

type Props = {
  src: string,
};

class Thumbnail extends React.PureComponent {
  handleError() {
    // if (this.state.imageUrl != this._defaultImageUri) {
    //   this.setState({
    //     imageUri: this._defaultImageUri,
    //   });
    // }
  }

  // constructor(props) {
  //   super(props);
  //
  //   this._defaultImageUri = lbry.imagePath('default-thumb.svg');
  //   this._maxLoadTime = 10000;
  //   this._isMounted = false;
  //
  //   this.state = {
  //     imageUri: this.props.src || this._defaultImageUri,
  //   };
  // }

  // componentDidMount() {
  //   this._isMounted = true;
  //   setTimeout(() => {
  //     if (this._isMounted && !this.refs.img.complete) {
  //       this.setState({
  //         imageUri: this._defaultImageUri,
  //       });
  //     }
  //   }, this._maxLoadTime);
  // }
  //
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  render() {
    // const className = this.props.className ? this.props.className : '',
    //   otherProps = Object.assign({}, this.props);
    // delete otherProps.className;
    console.log('this.prosp', this.props);
    const { className, src } = this.props;
    return (
      <img
        ref="img"
        onError={() => {
          this.handleError();
        }}
        className={className}
        src={src}
      />
    );
  }
}

export default Thumbnail;
