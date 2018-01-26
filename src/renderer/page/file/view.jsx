/* eslint-disable */
import React from 'react';
import lbry from 'lbry';
import { buildURI, normalizeURI } from 'lbryURI';
import Video from 'component/video';
import Thumbnail from 'component/common/thumbnail';
import FilePrice from 'component/filePrice';
import FileDetails from 'component/fileDetails';
import UriIndicator from 'component/uriIndicator';
import Icon from 'component/common/icon';
import WalletSendTip from 'component/walletSendTip';
import DateTime from 'component/dateTime';
import * as icons from 'constants/icons';
import Link from 'component/link';
import SubscribeButton from 'component/subscribeButton';
import Page from 'component/page';

class FilePage extends React.PureComponent {
  componentDidMount() {
    this.fetchFileInfo(this.props);
    this.fetchCostInfo(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchFileInfo(nextProps);
  }

  fetchFileInfo(props) {
    if (props.fileInfo === undefined) {
      props.fetchFileInfo(props.uri);
    }
  }

  fetchCostInfo(props) {
    if (props.costInfo === undefined) {
      props.fetchCostInfo(props.uri);
    }
  }

  render() {
    const {
      claim,
      fileInfo,
      metadata,
      contentType,
      tab,
      uri,
      rewardedContentClaimIds,
    } = this.props;

    const showTipBox = tab == 'tip';

    if (!claim || !metadata) {
      return <span className="empty">{__('Empty claim or metadata info.')}</span>;
    }

    const title = metadata.title;
    const isRewardContent = rewardedContentClaimIds.includes(claim.claim_id);
    const mediaType = lbry.getMediaType(contentType);
    const player = require('render-media');
    const obscureNsfw = this.props.obscureNsfw && metadata && metadata.nsfw;
    const isPlayable =
      Object.values(player.mime).indexOf(contentType) !== -1 || mediaType === 'audio';
    const { height, channel_name: channelName, value } = claim;
    const channelClaimId =
      value && value.publisherSignature && value.publisherSignature.certificateId;

    let subscriptionUri;
    if (channelName && channelClaimId) {
      subscriptionUri = buildURI({ channelName, claimId: channelClaimId }, false);
    }

    return (
      <Page>
        <section className={`card ${obscureNsfw ? 'card--obscured ' : ''}`}>
          <React.Fragment>
            {isPlayable && <Video className="video__embedded" uri={uri} />}
            {!isPlayable && metadata && metadata.thumbnail ? (
              <Thumbnail className="video__embedded" src={metadata.thumbnail} />
            ) : (
              <Thumbnail />
            )}
          </React.Fragment>
          <div className="card--content">
            <div className="card__title-identity">
              <h1>{title}</h1>
              {!fileInfo || fileInfo.written_bytes <= 0 ? (
                <React.Fragment>
                  <FilePrice uri={normalizeURI(uri)} />
                  {isRewardContent && (
                    <span>
                      {' '}
                      <Icon icon={icons.FEATURED} />
                    </span>
                  )}
                </React.Fragment>
              ) : null}
              <div className="card__subtitle card--file-subtitle">
                <UriIndicator uri={uri} link />
                <span className="card__publish-date">
                  Published on <DateTime block={height} show={DateTime.SHOW_DATE} />
                </span>
              </div>
            </div>
            <div className="card__actions">
              <SubscribeButton uri={subscriptionUri} channelName={channelName} />
              <Link alt icon="Send" label={__('Send a tip')} />
            </div>
            <FileDetails uri={uri} />
          </div>
        </section>
      </Page>
    );
  }
}

export default FilePage;
/* eslint-enable */
