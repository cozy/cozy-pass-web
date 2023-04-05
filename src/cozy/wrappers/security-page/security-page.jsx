import React from 'react';
import PropTypes from 'prop-types';
import SecurityPage from '../../react/components/InstallationPage/components/SecurityStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';

const SecurityPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route="installation/security" navigate={navigate} />
      <SecurityPage onSkipExtension={onSkipExtension}></SecurityPage>
    </ReactWrapper>
  );
};

SecurityPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default SecurityPageWrapper;
