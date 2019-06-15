import React, { Component } from 'react'
import io from 'socket.io-client';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import api from '../services/api';

import more     from '../assets/more.png';
import like     from '../assets/like.png';
import send     from '../assets/send.png';
import camera   from '../assets/camera.png';
import comment  from '../assets/comment.png';

export default class Feed extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('New')}>
                <Image source={camera} />
            </TouchableOpacity>
        ),
    });

    state = {
        feed: [],
    };

    async componentDidMount() {
        this.registerToSocket();

        api.get('posts').then((response) => {
            this.setState({ feed: response.data })
        }).catch(error => {
            console.log('Erro');
            console.log(error);
        })
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            console.log('Socket')
            console.log(newPost);
            this.setState({ feed: [newPost, ...this.state.feed ]});
        })
        console.log(this.state.feed);

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
            });
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={post => post._id}
                    renderItem={({ item }) => (
                        <View style={styles.feedItem}>
                            <View style={styles.FeedItemHeader}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.name}>{item.author}</Text>
                                    <Text style={styles.place}>{item.place}</Text>
                                </View>
                                <Image source={more} />
                            </View>

                            <Image style={styles.feedImage} source={{ uri: `http://localhost:3333/files/${item.image}` }} />
                            <View style={styles.FeedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                                        <Image source={like}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={comment}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={send}/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.likes}>{item.likes} curtidas</Text>
                                <Text style={styles.description}>{item.description} </Text>
                                <Text style={styles.hashtags}>{item.hashtags} </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    feedItem: {
        marginTop: 20,
    },
    FeedItemHeader: {
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 14,
        color: '#000'
    },
    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },
    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15
    },

    feedItem: {
        paddingHorizontal: 15,

    },
    actions: {
        flexDirection: 'row'
    },
    action: {
        marginRight: 8
    },
    likes: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    description: {
        lineHeight: 18,
        color: '#000',
    },
    hashtags: {
        color: '#7159c1'
    }
})

