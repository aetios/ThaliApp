import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Index from '../app/app';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />,
  );
});