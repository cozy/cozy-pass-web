import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import SharingProvider, { ShareModal, ShareButton, CozyPassFingerprintDialogContent } from 'cozy-sharing'
import flag from 'cozy-flags';

import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { CAN_SHARE_ORGANIZATION } from '../../flags';

const Sharing = ({ 
    file,
    reactWrapperProps,
    confirmationMethods,
    onShared,
    showSharingPaywall
}) => {
  const [showShareModal, setShowShareModal] = useState(false)
  const [hasRecipientsToBeConfirmed, setHasRecipientsToBeConfirmed] = useState(false)

  const twoStepsConfirmationMethods = {
    ...confirmationMethods,
    confirmRecipient: async (user) => {
      await confirmationMethods.confirmRecipient(user)

      const toBeConfirmed = await confirmationMethods.getRecipientsToBeConfirmed()
      setHasRecipientsToBeConfirmed(toBeConfirmed.length > 0)

      return toBeConfirmed
    },
    recipientConfirmationDialogContent: CozyPassFingerprintDialogContent,
  }

  const onClick = () => {
    if(flag(CAN_SHARE_ORGANIZATION)) {
      setShowShareModal(true)
    } else {
      showSharingPaywall()
    }
  }

  useEffect(() => {
    // As the component is the same when switching folder we want to reset the badge view
    // until checkRecipientsToBeConfirmed() result is retrieved
    setHasRecipientsToBeConfirmed(false)

    const updateRecipients = async () => {  
      const toBeConfirmed = await confirmationMethods.getRecipientsToBeConfirmed()
      setHasRecipientsToBeConfirmed(toBeConfirmed.length > 0)
    }

    updateRecipients()
  }, [file])

  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <SharingProvider doctype="com.bitwarden.organizations" documentType="Organizations" previewPath="" onShared={onShared}>
        {showShareModal && (
          <ShareModal
          document={file}
          documentType="Organizations"
          sharingDesc={file.name}
          onClose={() => setShowShareModal(false)}
          showShareOnlyByLink={false}
          twoStepsConfirmationMethods={twoStepsConfirmationMethods}
          />
        )}
        <ShareButton
          className={cx("u-mr-half", {
            "collectionWithUsersToValidate": hasRecipientsToBeConfirmed
          })}
          extension="full"
          useShortLabel
          docId={file.id}
          onClick={onClick}
        />
      </SharingProvider>
    </ReactWrapper>
  )
}

Sharing.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
}

export default Sharing
