import React from 'react';
import PropTypes from 'prop-types';
import PresentationPage from '../../react/components/InstallationPage/components/PresentationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';
import { OnboardingStepper } from '../../react/components/OnboardingStepper/OnboardingStepper';

const PresentationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  navigate,
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <OnboardingStepper route="installation/presentation" navigate={navigate} />
      <PresentationPage onSkipExtension={onSkipExtension}></PresentationPage>
    </ReactWrapper>
  );
};

PresentationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default PresentationPageWrapper;
