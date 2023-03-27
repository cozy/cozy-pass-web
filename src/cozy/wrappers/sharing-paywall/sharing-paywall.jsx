import React from 'react';

import { PasswordSharingPaywall } from 'cozy-ui/transpiled/react/Paywall'

import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

// wrap original SharingPaywall component
const SharingPaywallWrapper = ({
  reactWrapperProps,
  onClose,
  showDialog
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      {showDialog && <PasswordSharingPaywall onClose={onClose} />}
    </ReactWrapper>
  );
};

SharingPaywallWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired
}

export default SharingPaywallWrapper;
