import React from 'react';
import PropTypes from 'prop-types';
import HintPage from '../../react/components/InstallationPage/components/HintStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

const HintPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  initialStep
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <HintPage onSkipExtension={onSkipExtension} initialStep={initialStep}></HintPage>
    </ReactWrapper>
  );
};

HintPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default HintPageWrapper;
