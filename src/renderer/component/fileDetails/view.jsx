import React from 'react';
import ReactMarkdown from 'react-markdown';
import lbry from 'lbry.js';
import Link from 'component/link';
import DateTime from 'component/dateTime';

const path = require('path');

class FileDetails extends React.PureComponent {
  render() {
    const { claim, contentType, fileInfo, metadata, openFolder, uri } = this.props;

    if (!claim || !metadata) {
      return (
        <div className="card__content">
          <span className="empty">{__('Empty claim or metadata info.')}</span>
        </div>
      );
    }

    const { description, language, license } = metadata;
    const mediaType = lbry.getMediaType(contentType);

    const downloadPath = fileInfo ? path.normalize(fileInfo.download_path) : null;

    return (
      <div>
        <div className="card__content">
          <div className="card__subtext-title">
          About
          </div>
          <div className="card__subtext">
            <ReactMarkdown
              source={description || ''}
              escapeHtml
              disallowedTypes={['Heading', 'HtmlInline', 'HtmlBlock']}
            />
          </div>
          <div className="card__subtext-title">
          Info
          </div>
          <div className="card__subtext">
          <dl>
            <dt>{__('Content-Type')}</dt>
            <dd>{mediaType}</dd>
            <dt>{__('Language')}</dt>
            <dd>{language}</dd>
            <dt>{__('License')}</dt>
            <dd>{license}</dd>
            {downloadPath && (
              <React.Fragment>
              <dt>{__('Downloaded to')}</dt>
              <dd><Link fakeLink onClick={() => openFolder(downloadPath)} label={downloadPath}/></dd>
              </React.Fragment>
            )}
          </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default FileDetails;
