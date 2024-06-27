import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const FlipCard = () => {
  const isFlipped = useSharedValue(false);
  const rotation = useSharedValue(0);
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);

  const tapGesture = Gesture.Tap().onStart(() => {
    if (isFlipped.value) {
      rotation.value = withSpring(0);
    } else {
      rotation.value = withSpring(180);
    }
    isFlipped.value = !isFlipped.value;
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - (width * 0.4) / 2;
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
    })
    .onEnd(() => {
      translationX.value = withSpring(0);
    });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationX.value,
      [-100, 0, 100],
      ["red", "white", "green"]
    );

    return {
      transform: [
        {
          rotateY: `${rotation.value}deg`,
        },
        {
          translateX: translationX.value,
        },
      ],
      backgroundColor,
      backfaceVisibility: "hidden",
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationX.value,
      [-100, 0, 100],
      ["red", "white", "green"]
    );

    return {
      transform: [
        {
          rotateY: `${rotation.value + 180}deg`,
        },
        {
          translateX: translationX.value,
        },
      ],
      backgroundColor,
      backfaceVisibility: "hidden",
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Race(tapGesture, panGesture)}>
        <Animated.View style={{ position: "relative" }}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>Front Side</Text>
          </Animated.View>
          <Animated.View
            style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
          >
            <Text style={styles.flipText}>Back Side</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCard: {
    width: width * 0.4,
    height: width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 24,
    borderWidth: 4,
  },

  flipCardBack: {
    position: "absolute",
    top: 0,
  },

  flipText: {
    fontSize: 20,
    color: "black",
  },
});

export default FlipCard;
