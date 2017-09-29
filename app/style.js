import { StyleSheet, Platform } from 'react-native';

export const colors = {
  magenta: '#E62272',
  darkMagenta: '#C2185B',
  white: '#FFFFFF',
  background: '#FAFAFA',
  black: '#000000',
  lightGray: '#BBBBBB',
  gray: '#616161',
  textColour: '#313131',
  darkGrey: '#373737',
  dividerGrey: 'rgba(0, 0, 0, 0.12)',
  transparent: 'transparent',
  lightGreen: '#8fcc74',
  darkGreen: '#81b968',
  lightRed: '#e05c50',
  darkRed: '#d15348',
};

export function create(styles) {
  const platformStyles = {};
  Object.keys(styles).forEach((name) => {
// eslint-disable-next-line prefer-const
    let { ios, android, ...style } = { ...styles[name] };
    if (ios && Platform.OS === 'ios') {
      style = { ...style, ...ios };
    }
    if (android && Platform.OS === 'android') {
      style = { ...style, ...android };
    }

    if (name === 'ios' && Platform.OS === 'ios') {
      Object.keys(style).forEach((styleName) => {
        if (platformStyles[styleName]) {
          platformStyles[styleName] = { ...platformStyles[styleName], ...style[styleName] };
        }
      });
    }

    if (name === 'android' && Platform.OS === 'android') {
      Object.keys(style).forEach((styleName) => {
        if (platformStyles[styleName]) {
          platformStyles[styleName] = { ...platformStyles[styleName], ...style[styleName] };
        }
      });
    }

    if (name !== 'ios' && name !== 'android') {
      platformStyles[name] = style;
    }
  });

  return StyleSheet.create(platformStyles);
}
