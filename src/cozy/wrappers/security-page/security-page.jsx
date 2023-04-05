import React from 'react';
import PropTypes from 'prop-types';
import SecurityPage from '../../react/components/InstallationPage/components/SecurityStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { StepWrapper } from 'cozy/react/components/StepWrapper'
import { STEPS } from 'cozy/react/steps'

const SecurityPageWrapper = ({
  reactWrapperProps,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <StepWrapper route={STEPS.SECURITY} navigate={navigate}>
        <SecurityPage navigate={navigate}></SecurityPage>
      </StepWrapper>
    </ReactWrapper>
  );
};

SecurityPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
}

export default SecurityPageWrapper;
