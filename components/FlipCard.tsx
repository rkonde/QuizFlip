import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  const rotation = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value + 180}deg` }],
    };
  });

  const handleFlip = () => {
    if (flipped) {
      rotation.value = withSpring(0);
    } else {
      rotation.value = withSpring(180);
    }

    setFlipped(!flipped);
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler onActivated={handleFlip}>
        <Animated.View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>Front Side</Text>
          </Animated.View>
          <Animated.View
            style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
          >
            <Text style={styles.flipText}>Back Side</Text>
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
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
    width: width * 0.8,
    height: width * 0.8,
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
