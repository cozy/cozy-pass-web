import React from 'react';
import PropTypes from 'prop-types';
import PresentationPage from '../../react/components/InstallationPage/components/PresentationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';
import { STEPS } from 'cozy/react/steps'

const PresentationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route={STEPS.PRESENTATION} navigate={navigate} />
      <PresentationPage onSkipExtension={onSkipExtension} navigate={navigate}></PresentationPage>
    </ReactWrapper>
  );
};

PresentationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default PresentationPageWrapper;
