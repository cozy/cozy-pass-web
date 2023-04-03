import React from 'react';
import PropTypes from 'prop-types';
import InstallationPage from '../../react/components/InstallationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

// wrap original InstallationPage component
const InstallationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  initialStep
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <InstallationPage onSkipExtension={onSkipExtension} initialStep={initialStep}></InstallationPage>
    </ReactWrapper>
  );
};

InstallationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default InstallationPageWrapper;
