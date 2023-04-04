import React from 'react';
import PropTypes from 'prop-types';
import InstallationPage from '../../react/components/InstallationPage/components/InstallationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';
import { STEPS } from 'cozy/react/steps'

// wrap original InstallationPage component
const InstallationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route={STEPS.INSTALLATION} navigate={navigate} />
      <InstallationPage onSkipExtension={onSkipExtension}></InstallationPage>
    </ReactWrapper>
  );
};

InstallationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default InstallationPageWrapper;
