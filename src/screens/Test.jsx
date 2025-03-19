import 'react-native-reanimated';
import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const Test = () => {
  // Create a reference to the bottom sheet
  const bottomSheetRef = useRef(null);

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // Handlers for the bottom sheet
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('Sheet position changed to index:', index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Bottom Sheet Example</Text>
          <View style={styles.buttonContainer}>
            <Button title="Open Sheet" onPress={handleOpenPress} />
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.indicator}
        >
          <View style={styles.sheetContentContainer}>
            <Text style={styles.sheetTitle}>This is a Bottom Sheet</Text>
            <Text style={styles.sheetDescription}>
              You can swipe up to expand and down to close this sheet.
              Different snap points are available at 25%, 50%, and 75% of the screen.
            </Text>
            <Button title="Close Sheet" onPress={handleClosePress} />
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: 150,
  },
  sheetBackground: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  indicator: {
    backgroundColor: '#a0a0a0',
    width: 40,
    height: 5,
  },
  sheetContentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sheetDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
});

export default Test;