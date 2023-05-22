import React from 'react';
import { SafeAreaView } from 'react-native';
import color from '../styles/color';
import common from '../styles/common';

/*
 * created to be the parent of component for device without notch
 * added background white as base color
 * children can be from multiple components
 */

type LayoutProps = {
  custom: object;
  children: React.ReactNode;
};

function Layout({ children, custom }: LayoutProps) {
  return (
    <SafeAreaView style={[common.flex1, color.bgLightestBrand, custom]}>
      {children}
    </SafeAreaView>
  );
}

export default Layout;
