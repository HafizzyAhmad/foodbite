import React from 'react';
import Controller from './routes/controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StoreProvider } from './hooks/use-store';
import { Platform, StatusBar } from 'react-native';
import { common } from './styles';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <GestureHandlerRootView style={common.basicFlex}>
        <Controller />
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          animated={true}
          backgroundColor="black"
        />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export default App;
