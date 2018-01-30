import React from 'react';
import { Modal } from 'modal/modal';
import { FormRow, FormField } from 'component/common/form';

class ModalRemoveFile extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      deleteChecked: true,
      abandonClaimChecked: false,
    };
  }

  handleDeleteCheckboxClicked(event) {
    this.setState({
      deleteChecked: event.target.checked,
    });
  }

  handleAbandonClaimCheckboxClicked(event) {
    this.setState({
      abandonClaimChecked: event.target.checked,
    });
  }

  render() {
    const { claimIsMine, closeModal, deleteFile, fileInfo: { outpoint }, title } = this.props;
    const { deleteChecked, abandonClaimChecked } = this.state;

    return (
      <Modal
        isOpen
        contentLabel={__('Confirm File Remove')}
        type="confirm"
        confirmButtonLabel={__('Remove')}
        onConfirmed={() => deleteFile(outpoint, deleteChecked, abandonClaimChecked)}
        onAborted={closeModal}
      >
        <p>
          {__("Are you sure you'd like to remove")} <cite>{title}</cite> {__('from LBRY?')}
        </p>

        <FormRow padded>
          <FormField
            prefix={__('Also delete this file from my computer')}
            render={() => (
              <input
                type="checkbox"
                checked={deleteChecked}
                onChange={this.handleDeleteCheckboxClicked.bind(this)}
              />
            )}
          />
        </FormRow>
        {claimIsMine && (
          <FormRow>
            <FormField
              prefix={__('Abandon the claim for this URI')}
              render={() => (
                <input
                  type="checkbox"
                  checked={abandonClaimChecked}
                  onChange={this.handleAbandonClaimCheckboxClicked.bind(this)}
                />
              )}
            />
        </FormRow>
        )}
      </Modal>
    );
  }
}

export default ModalRemoveFile;
