import React from 'react';
import Link from 'component/link';

class VideoPlayButton extends React.PureComponent {
  componentDidMount() {
    this.keyDownListener = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownListener);
  }

  onKeyDown(event) {
    if (event.target.tagName.toLowerCase() !== 'input' && event.code === 'Space') {
      event.preventDefault();
      this.watch();
    }
  }

  watch() {
    this.props.play(this.props.uri);
  }

  render() {
    const { button, label, isLoading, fileInfo, mediaType } = this.props;

    /*
     title={
     isLoading ? "Video is Loading" :
     !costInfo ? "Waiting on cost info..." :
     fileInfo === undefined ? "Waiting on file info..." : ""
     }
     */

    const disabled = isLoading || fileInfo === undefined;
    const icon = ['audio', 'video'].indexOf(mediaType) !== -1 ? 'PlayCircle' : 'Folder';

    return (
      <Link
        media
        disabled={disabled}
        label={label || ''}
        icon={icon}
        onClick={() => this.watch()}
      />
    );
  }
}

export default VideoPlayButton;
