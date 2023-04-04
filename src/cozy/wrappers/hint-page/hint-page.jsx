import React from 'react';
import PropTypes from 'prop-types';
import HintPage from '../../react/components/InstallationPage/components/HintStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';
import { STEPS } from 'cozy/react/steps'

const HintPageWrapper = ({
  reactWrapperProps,
  navigate
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route={STEPS.HINT} navigate={navigate}/>
      <HintPage navigate={navigate}></HintPage>
    </ReactWrapper>
  );
};

HintPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired
}

export default HintPageWrapper;
