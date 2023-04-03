import React from 'react';
import PropTypes from 'prop-types';
import PresentationPage from '../../react/components/InstallationPage/components/PresentationStep';
import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

const PresentationPageWrapper = ({
  reactWrapperProps,
  onSkipExtension,
  initialStep
}) => {
  return (
    <ReactWrapper reactWrapperProps={reactWrapperProps}>
      <PresentationPage onSkipExtension={onSkipExtension} initialStep={initialStep}></PresentationPage>
    </ReactWrapper>
  );
};

PresentationPageWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired,
  onSkipExtension: PropTypes.func.isRequired,
}

export default PresentationPageWrapper;
