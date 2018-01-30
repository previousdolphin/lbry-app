import React from 'react';
import Link from 'component/link';
import FileDownloadLink from 'component/fileDownloadLink';
import * as modals from 'constants/modal_types';
import classnames from 'classnames';

class FileActions extends React.PureComponent {
  render() {
    const { fileInfo, uri, openModal, claimIsMine, vertical } = this.props;

    const claimId = fileInfo ? fileInfo.claim_id : null;
    // showDelete = fileInfo && Object.keys(fileInfo).length > 0;

    const showDelete = true;
    return (
      <section className={classnames("card__actions", { "card__actions--vertical": vertical })}>
        <FileDownloadLink uri={uri} />
        {showDelete && (
          <Link
            alt
            icon="Trash"
            label={__('Remove')}
            onClick={() => openModal(modals.CONFIRM_FILE_REMOVE, { uri })}
          />
        )}
        {!claimIsMine && (
          <Link
            alt
            icon="Flag"
            href={`https://lbry.io/dmca?claim_id=${claimId}`}
            label={__('Report')}
          />
        )}

        {claimIsMine && (
          <Link
            primary
            icon="Edit3"
            label={__('Edit')}
            navigate="/publish"
            className="card__action--right"
            navigateParams={{ id: claimId }}
          />
        )}
      </section>
    );
  }
}

export default FileActions;
