import React, {useState} from "react";
import {Posts} from "@/app/components/Posts";
import {useAuth} from "@/app/hooks/useAuth";


 const Index = () => {
     const {posts} = useAuth();
    const [likedPosts, setLikedPosts] = useState<any[]>([]);;
    const [favoriteState, setFavoriteState] = useState(false);
    return (
        <>
            {/*<Animated.View style={styles.container} entering={LightSpeedInRight} exiting={LightSpeedOutLeft} />*/}

            {/*<View>*/}
            {/*    <Button title="start animate" onPress={startAnimate} />*/}
            {/*    <Animated.View style={animatedStyles}/>*/}
            {/*</View>*/}

            {/*<TouchableOpacity onPress={startAnimate} style={{ marginTop: 20 }}>*/}
            {/*    <Text>Start Animation</Text>*/}
            {/*</TouchableOpacity>*/}


            {posts? <Posts posts={posts} /> : null}

        </>
    );
}
export default Index