import React, { useEffect, useState, useRef } from "react";
import {
    FlatList,
    Animated,
    View,
    Easing,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from "@/app/components/Posts/Post";
import { useFocusEffect } from '@react-navigation/native';

export const Posts = ({ posts }: any) => {
    const [userLikes, setUserLikes] = useState<any[]>([]);
    const animatedValues = useRef<Animated.Value[]>([]);

    // Initialize animatedValues to match the length of posts
    useEffect(() => {
        if (posts?.length) {
            animatedValues.current = posts.map(() => new Animated.Value(0));
        }
    }, [posts]);

    // Load userLikes from AsyncStorage
    useEffect(() => {
        const loadUserLikes = async () => {
            const localUserLikes = await AsyncStorage.getItem('userLikes');
            if (localUserLikes) {
                setUserLikes(JSON.parse(localUserLikes));
            } else {
                setUserLikes(posts.map(() => 0));
            }
        };
        loadUserLikes();
    }, [posts]);

    // Reset animations when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            animatedValues.current.forEach((animValue) => animValue.setValue(0));
            Animated.stagger(
                150,
                animatedValues.current.map((animValue) =>
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.ease,
                        useNativeDriver: true,
                    })
                )
            ).start();
        }, [posts])
    );

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const animationStyle = animatedValues.current[index]
            ? {
                  opacity: animatedValues.current[index],
                  transform: [
                      {
                          translateY: animatedValues.current[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [20, 0],
                          }),
                      },
                  ],
              }
            : {};

        return (
            <Animated.View style={animationStyle}>
                <Post post={item} setLikes={setUserLikes} likes={userLikes} id={item.id} />
            </Animated.View>
        );
    };

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id.toString()}
        />
    );
};
