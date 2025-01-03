import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    FadeInUp,
    FadeOutDown,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { Posts } from "@/app/components/Posts";
import { useAuth } from "@/app/hooks/useAuth";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function Search() {
    const styles = StyleSheet.create({
        search: {
            marginLeft: -25,
            width: "140%",
            height: 40,
            padding: 10,
            paddingLeft: 40,
            borderRadius: 10,
        },
        wrapper: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: 10,
            marginLeft: 0,
            marginBottom: 20,
        },
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            padding: 10,
            paddingRight: 0,
            height: 40,
        },
    });

    const [search, setSearch] = useState("");
    const [getPosts, setGetPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [debouncedValue, setDebouncedValue] = useState("");
    const animationTrigger = useSharedValue(0);
    const { posts } = useAuth();

    useEffect(() => {
        setGetPosts(posts);
    }, [posts]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(search);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const filteredPosts = getPosts.filter((post) =>
            post.title.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        setFilteredPosts(filteredPosts.length === 0 || debouncedValue === "" ? [] : filteredPosts);

        // Trigger animation each time the search value changes
        animationTrigger.value = withTiming(animationTrigger.value + 1, { duration: 500 });
    }, [debouncedValue]);

    return (
        <View>
            <View style={styles.wrapper}>
                <Animated.View style={styles.container}>
                    <Icon name="search" size={15} color={"grey"} />
                    <AnimatedInput
                        style={styles.search}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        placeholder="Search post by title"
                    />
                </Animated.View>
            </View>
            <Animated.View
                entering={FadeInUp.duration(500)}
                exiting={FadeOutDown.duration(500)}
                key={animationTrigger.value}
            >
                {filteredPosts.length > 0 ? (
                    <Posts posts={filteredPosts} />
                ) : (
                    <Image
                        style={{ width: '90%', height: 200,alignSelf:'center' }}
                        source={
                            debouncedValue === ""
                                ? require("@/assets/images/what.webp")
                                : require("@/assets/images/noPost.webp")
                        }
                    />
                )}
            </Animated.View>
        </View>
    );
}