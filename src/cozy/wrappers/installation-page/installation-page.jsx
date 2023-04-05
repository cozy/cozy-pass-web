import React from 'react';
import PropTypes from 'prop-types';
import InstallationPage from '../../react/components/InstallationPage/components/InstallationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { StepWrapper } from 'cozy/react/components/StepWrapper'
import { STEPS } from 'cozy/react/steps'

// wrap original InstallationPage component
const InstallationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <StepWrapper route={STEPS.INSTALLATION} navigate={navigate}>
        <InstallationPage onSkipExtension={onSkipExtension}></InstallationPage>
      </StepWrapper>
    </ReactWrapper>
  );
};

InstallationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default InstallationPageWrapper;
