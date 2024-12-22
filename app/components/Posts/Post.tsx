import React, {useEffect, useState} from "react";
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useAuth} from "@/app/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";




export const Post = ({admin = false, post, likes, id, setLikes}: any) => {
    const {posts, setPosts, user} = useAuth();
    const [title, setTitle] = useState(post.title);
    const [desc, setDesc] = useState(post.description);
    const [descState, setDescState] = useState(true);
    const [needShow, setNeedShow] = useState(false);
    const lengthDesc = 50;
    useEffect(() => {
        if (desc.length > lengthDesc) {
            setDescState(false);
            setNeedShow(true);
            setDesc(desc.slice(0, lengthDesc) + '...')
        }
    }, []);
    const titleChange = (title: string) => {
        const newPost = {id: post.id, title: title, description: desc, image: post.image, user: post.user};
        setPosts([...posts.map(item => item.id === post.id ? newPost : item)]);
        setTitle(title)
    };
    const descChange = (desc: string) => {
        const newPost = {id: post.id, title: title, description: desc, image: post.image, user: post.user};
        setPosts([...posts.map(item => item.id === post.id ? newPost : item)]);
        setDesc(desc)
    };
    const isValidUrl = (url) => {
        const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
        return regex.test(url);
    };
    return (
        <View style={styles.post} key={post.id}>
            {admin ? <TextInput
                style={[styles.title, styles.input]}
                onChangeText={(title) => titleChange(title)}
                value={title}
                placeholder="title"
            /> : <Text style={styles.title}>{title}</Text>}
            {isValidUrl(post.image) ? (
                <Image style={styles.img} source={{uri: post.image}}/>
            ) : (
                <Image style={styles.img}
                       source={{uri: 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}}/>
            )}
            {needShow && <TouchableOpacity onPress={() => setDescState(!descState)}><Text
                style={{color: 'red'}}>{descState ? 'Show less' : 'Show more'}</Text></TouchableOpacity>}
            {admin ? <TextInput
                style={[styles.desc, styles.input]}
                onChangeText={(desc) => descChange(desc)}
                value={desc}
                placeholder="description"
            /> : descState ? <Text style={styles.desc}>{post.description}</Text> :
                <Text style={styles.desc}>{desc}</Text>
            }
            {
                user?.name != post.user &&
                <TouchableOpacity onPress={() => {
                    const newLikes = [...likes];
                    if (newLikes[id-1] == 1) newLikes[id-1] = 0;
                    else newLikes[id-1] = 1;
                    setLikes(newLikes);
                    // localStorage.setItem('userLikes', JSON.stringify(newLikes))
                    AsyncStorage.setItem('userLikes', JSON.stringify(newLikes));
                }}>
                    {likes[id-1] == 0 ?
                        <Icon name="heart-o" style={{margin: 10, alignSelf: 'flex-end'}} size={25}
                              color={"grey"}></Icon>
                        :
                        <Icon name="heart" style={{margin: 10, alignSelf: 'flex-end'}} size={25} color={"red"}></Icon>}
                </TouchableOpacity>
            }
            {user?.name == post.user && user &&
                <TouchableOpacity onPress={() => {
                    const newPosts = posts.filter(item => item.id !== post.id);
                    setPosts(newPosts)
                }}>
                    <Icon name={"trash"} style={{margin: 10, alignSelf: 'flex-end'}} size={25} color={"black"}></Icon>
                </TouchableOpacity>
            }

        </View>
    )
};

const styles = StyleSheet.create({
    post: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        gap: 10,
        backgroundColor: 'lightgrey',
    },
    title: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    img: {
        alignSelf: 'center',
        width: '100%',
        height: 300,
        marginBottom: 10,
        backgroundColor: '#2a2a2a'
    },
    desc: {
        fontSize: 14,
        marginBottom: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'purple',
        borderRadius: 10,
        borderColor: '#6828c1'
    },
});