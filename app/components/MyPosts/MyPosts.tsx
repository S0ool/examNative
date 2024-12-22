import {
    Button,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    Animated,
    Easing,
} from "react-native";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "expo-router";
import { Post } from "@/app/components/Posts/Post";

const AdminPage = ({ user }: any) => {
    const [userPosts, setUserPosts] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const { posts, setPosts } = useAuth();

    const animatedOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Запуск анимации появления постов
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    }, [userPosts]);

    // Фильтрация постов пользователя
    useEffect(() => {
        const userFilteredPosts = posts.filter((post: any) => post.user === user.name);
        setUserPosts(userFilteredPosts);
    }, [posts]);

    // Создание нового поста
    const createPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: postTitle,
            description: desc,
            image: img,
            user: user.name,
        };
        setPosts([...posts, newPost]);
        setPostTitle('');
        setDesc('');
        setImg('');
    };

    return (
        <>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setPostTitle}
                    value={postTitle}
                    placeholder="Post title"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDesc}
                    value={desc}
                    placeholder="Description"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setImg}
                    value={img}
                    placeholder="Image URL"
                />
                <Button title="Create" color="#6828c1" onPress={createPost} />
            </View>
            <Animated.FlatList
                data={userPosts}
                renderItem={({ item }) => (
                    <Animated.View
                        style={{
                            opacity: animatedOpacity,
                            transform: [
                                {
                                    translateY: animatedOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Post admin={true} post={item} setLikes={setUserPosts} likes={userPosts} id={item.id} />
                    </Animated.View>
                )}
                keyExtractor={(item: any) => item.id.toString()}
            />
        </>
    );
};

export default function MyPosts() {
    const { user } = useAuth();
    return (
        <ScrollView>
            {user ? <AdminPage user={user} /> : <Redirect href={'/components/Profile/Profile'} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#6828c1',
    },
});
