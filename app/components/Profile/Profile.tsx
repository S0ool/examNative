import {View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity} from "react-native";
import {useAuth} from "@/app/hooks/useAuth";
import React, {useEffect, useState} from "react";

const Login = ({login,setAction}:any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Auth = async () => {
        const response = await login({name:username,password});
        alert(response.status);
        Alert.alert(response.status);
    };

    return(
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
            />
            <Button
                title="Login"
                color= '#6828c1'
                onPress={() => {Auth()}}
            />
            <TouchableOpacity style={styles.button} onPress={setAction}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
};

const Register = ({reg,setAction}:any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const Auth= async () => {
        const response = await reg({name:username,password});
        alert(response.status);
        Alert.alert(response.status);
    };

    return(
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                    value={username}
                placeholder="username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
            />
            <Button
                title="Register"
                color= '#6828c1'
                onPress={() => {Auth()}}
            />
            <TouchableOpacity style={styles.button} onPress={setAction}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
};

const ProfilePage = ({logout,user}:any) => {
    const Auth= async () => {
        await logout();
    };
    return (
        <View>
            <Text>{user?.name}</Text>
            <Button
                title="Logout"
                color= '#6828c1'
                onPress={() => {Auth()}}
            />
        </View>
    );
};


export default function Profile(){
    const {user,login,logout,register} = useAuth();
    const [action,setAction] = useState('login');
    useEffect(() => {
        if (user) {
            setAction('profile');
        }
        else{
            setAction('login');
        }
    }, [user]);
    const navReg = () => setAction('register');
    const navLog = () => setAction('login');
    return (
        <View>
            {action == 'login' ? <Login login={login} setAction={navReg}/> : action == 'register' ?
                <Register reg={register} setAction={navLog}/> : <ProfilePage logout={logout} user={user}/>}
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: ''
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#6828c1'
    }

});