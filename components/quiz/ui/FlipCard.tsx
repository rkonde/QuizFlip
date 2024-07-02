import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

type FlipCardProps = {
  frontText: string;
  backText: string;
  onComplete: () => void;
  onWrong: () => void;
  index: number;
};

const FlipCard = ({
  frontText,
  backText,
  onComplete,
  onWrong,
  index,
}: FlipCardProps) => {
  const isFlipped = useSharedValue(false);
  const rotation = useSharedValue(0);
  const translationX = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const cardRotation = useSharedValue(0);

  useEffect(() => {
    cardRotation.value = withSpring(index >= 3 ? 2 * 4 : index * 4);
  }, [index]);

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
      if (translationX.value >= 100) {
        translationX.value = withTiming(2 * width, {}, () =>
          runOnJS(onComplete)()
        );
      } else if (translationX.value <= -100) {
        translationX.value = withTiming(-2 * width, {}, () =>
          runOnJS(onWrong)()
        );
      } else {
        translationX.value = withSpring(0);
      }
    });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translationX.value,
      [-100, 0, 100],
      [Colors.light.delete, Colors.light.primary, Colors.light.confirm]
    );

    return {
      transform: [
        {
          rotateY: `${rotation.value}deg`,
        },
        {
          translateX: translationX.value,
        },
        {
          rotateZ: `${translationX.value / 10}deg`,
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
      [Colors.light.delete, Colors.light.primary, Colors.light.confirm]
    );

    return {
      transform: [
        {
          rotateY: `${rotation.value + 180}deg`,
        },
        {
          translateX: translationX.value,
        },
        {
          rotateZ: `${translationX.value / 10}deg`,
        },
      ],
      backgroundColor,
      backfaceVisibility: "hidden",
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${cardRotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <GestureDetector gesture={Gesture.Race(tapGesture, panGesture)}>
        <Animated.View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>{frontText}</Text>
          </Animated.View>
          <Animated.View
            style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
          >
            <Text style={styles.flipText}>{backText}</Text>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },

  flipCard: {
    width: width * 0.8,
    height: width,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 24,
    borderWidth: 2,
    padding: 4,
  },

  flipCardBack: {
    position: "absolute",
    top: 0,
  },

  flipText: {
    fontSize: 20,
    color: Colors.light.text,
  },
});

export default FlipCard;
