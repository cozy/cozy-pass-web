import React from 'react';
import PropTypes from 'prop-types';
import HintPage from '../../react/components/InstallationPage/components/HintStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { StepWrapper } from 'cozy/react/components/StepWrapper'
import { STEPS } from 'cozy/react/steps'

const HintPageWrapper = ({
  reactWrapperProps,
  navigate
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <StepWrapper route={STEPS.HINT} navigate={navigate}>
        <HintPage navigate={navigate}></HintPage>
      </StepWrapper>
    </ReactWrapper>
  );
};

HintPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired
}

export default HintPageWrapper;
