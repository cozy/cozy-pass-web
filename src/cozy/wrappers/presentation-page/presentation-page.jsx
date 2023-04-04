import React from 'react';
import PropTypes from 'prop-types';
import PresentationPage from '../../react/components/InstallationPage/components/PresentationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';
import { STEPS } from 'cozy/react/steps'

const PresentationPageWrapper = ({
  reactWrapperProps,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route={STEPS.PRESENTATION} navigate={navigate} />
      <PresentationPage navigate={navigate}></PresentationPage>
    </ReactWrapper>
  );
};

PresentationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
}

export default PresentationPageWrapper;
