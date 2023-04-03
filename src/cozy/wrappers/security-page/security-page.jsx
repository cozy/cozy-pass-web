import React from 'react';
import PropTypes from 'prop-types';
import SecurityPage from '../../react/components/InstallationPage/components/SecurityStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

const SecurityPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  initialStep
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <SecurityPage onSkipExtension={onSkipExtension} initialStep={initialStep}></SecurityPage>
    </ReactWrapper>
  );
};

SecurityPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default SecurityPageWrapper;
