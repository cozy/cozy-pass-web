import React from 'react';
import PropTypes from 'prop-types';
import PresentationPage from '../../react/components/InstallationPage/components/PresentationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { StepWrapper } from 'cozy/react/components/StepWrapper'
import { STEPS } from 'cozy/react/steps'

const PresentationPageWrapper = ({
  reactWrapperProps,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <StepWrapper route={STEPS.PRESENTATION} navigate={navigate}>
        <PresentationPage navigate={navigate}></PresentationPage>
      </StepWrapper>
    </ReactWrapper>
  );
};

PresentationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
}

export default PresentationPageWrapper;
