import React from 'react';
import PropTypes from 'prop-types';
import HintPage from '../../react/components/InstallationPage/components/HintStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';

const HintPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route="installation/hint" navigate={navigate}/>
      <HintPage onSkipExtension={onSkipExtension}></HintPage>
    </ReactWrapper>
  );
};

HintPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default HintPageWrapper;
