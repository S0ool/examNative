import React, { createContext, useContext, useState, useEffect } from 'react';
import users from './users.json'

interface UserType {
    id?: number;
    name?: string;
    password?: string;
}
interface AuthContextType {
    user?: UserType | null;
    register?: (userData: any) => { user: UserType | undefined; status: string };
    login?: (userData: any) => { user: UserType | undefined; status: string };
    logout?: () => null;
    posts?: any,
    setPosts?: any,
    addState?: any,
    setAddState?: any
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }:any) => {
    const [user, setUser] = useState<UserType | null>(null);


    const login = (userData:any) => {
        const getUser =users.users.find((user) => user.name == userData.name && user.password === userData.password);
        if (getUser) {
            localStorage.setItem('user', JSON.stringify(getUser));
            setUser(getUser);
        }
        const status = getUser ? 'success' : 'user not found';
        return{
            user:getUser,
            status: status
        }
    };
    const register = (userData:any) => {
        let getUser = users.users.find((user) => user.name == userData.name);
        if (!getUser) {
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        }
        else getUser = userData
        const status = getUser ? 'user already exists' : 'success';
        return{
            user:getUser,
            status: status
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        return null
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'First Post',
            description: 'This is the first postqweqweqwewqewqewqeqwewqoekiwqekqwpoeiqweowqiepwq',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 2,
            title: 'Second Post',
            description: 'This is the second post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 3,
            title: 'Third Post',
            description: 'This is the third post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 4,
            title: 'Fourth Post',
            description: 'This is the fourth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 5,
            title: 'Fifth Post',
            description: 'This is the fifth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 6,
            title: 'Sixth Post',
            description: 'This is the sixth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 7,
            title: 'Seventh Post',
            description: 'This is the seventh post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 8,
            title: 'Eighth Post',
            description: 'This is the eighth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 9,
            title: 'Ninth Post',
            description: 'This is the ninth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        },
        {
            id: 10,
            title: 'Tenth Post',
            description: 'This is the tenth post',
            image:'https://cdn.pixabay.com/photo/2015/10/07/12/17/post-976115_1280.png',
            user: null
        }]);
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('posts'))){
            setPosts(JSON.parse(localStorage.getItem('posts')))
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    return (
        <AuthContext.Provider value={{ user, register, login, logout,posts,setPosts}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
