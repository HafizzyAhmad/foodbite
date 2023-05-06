import React from 'react';
import Controller from './routes/controller';
import { StoreProvider } from './hooks/use-store';
import { Platform, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Controller />
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor="black"
      />
    </StoreProvider>
  );
};

export default App;
