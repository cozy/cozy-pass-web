import React from 'react';
import PropTypes from 'prop-types';
import SecurityPage from '../../react/components/InstallationPage/components/SecurityStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';
import { STEPS } from 'cozy/react/steps'

const SecurityPageWrapper = ({
  reactWrapperProps,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route={STEPS.SECURITY} navigate={navigate}/>
      <SecurityPage navigate={navigate}></SecurityPage>
    </ReactWrapper>
  );
};

SecurityPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
}

export default SecurityPageWrapper;
