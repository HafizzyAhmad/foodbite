import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

/**
 * use this hook to remove unwanted padding after user
 * on focus at the text input
 * @returns { number, () => void}
 */
export const useOffset = () => {
  const [focusCount, setFocusCount] = useState<number>(1);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const heightOffset = focusCount * -keyboardHeight;

  function onIncrementFocus() {
    setFocusCount(count => count + 1);
  }

  /**
   * use this side effect to determine the height of device keyboard,
   * important to know that height of keyboard varies across devices
   */
  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent) {
      // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { heightOffset, onIncrementFocus };
};
