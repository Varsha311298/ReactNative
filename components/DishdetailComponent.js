import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments : state.comments,
        favorites : state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite : (dishId) => dispatch(postFavorite(dishId)),
    postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props)
{
    const dish = props.dish;

    //For rubberband effect - taking the reference of the view
    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if( dx < -200 )
            return true;
        else
            return false;
    };
    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx > 200)
            return true;
        else
            return false;
    };
    //Gesture handling
    const panResponder = PanResponder.create(
        {
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(1000)
                    .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
            },
            onPanResponderEnd: (e, gestureState) => {
                if(recognizeDrag(gestureState))
                {
                    Alert.alert(
                        'Add to Favorites?',
                        'Are you sure you wish to add dish ' + dish.name + '?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                            }
                        ],
                        {cancelable: false}
                    );
                }
                if(recognizeComment(gestureState))
                {
                    props.toggleModal();
                }
                return true;
            }
        }
    );
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, 
        {
            dialogTitle: 'Share ' + title
        });
    }
    if(dish != null)
    {
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
                    ref={this.handleViewRef} 
                    {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri : baseUrl + dish.image }}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                        <View style={styles.iconPosition}>
                            <Icon raised
                                reverse name={ props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'  onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                            <Icon raised
                                reverse type='font-awesome' name={'pencil'} color='#512DA8' onPress={()=> props.toggleModal()} />
                            <Icon raised reverse name='share' type='font-awesome' color='#51D2A8' onPress={() => shareDish(dish.name, dish.description, baseUrl+dish.image)}
                            />
                    </View>
                        <Modal animationType={'slide'} transparent={false} visible={props.showModal} onDismiss={()=> props.toggleModal()} onRequestClose={()=> props.toggleModal()}>
                            <View style={styles.modal}>
                            <Rating
                                showRating
                                onFinishRating={(rating) => props.setRating(rating)}
                                style={{ paddingVertical: 10 }}
                            />
                            </View>
                            <View style={styles.modal}>
                                <Input placeholder='   Author' value={props.author} leftIcon={{type: 'font-awesome', name: 'user-o'}} onChangeText={(name) => props.setAuthor(name)} ></Input>
                            </View>
                            <View style={styles.modal}>
                                <Input placeholder='  Comment' value={props.comment} leftIcon={{type: 'font-awesome', name: 'comment-o'}} onChangeText={(comment) => props.setComment(comment)}></Input>
                            </View>
                            <View style={styles.modal}>
                                <Button title='SUBMIT' color='#512DA8' onPress={() => props.handleComments()} accessibilityLabel='Learn more about this purple button' />
                            </View>
                            <View style={styles.modal}>
                                <Button title='CANCEL' color='#d3d3d3' onPress={() => props.toggleModal()} accessibilityLabel='Learn more about this purple button' />
                            </View>
                        </Modal>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    else{
        return(<View></View>)
    }
}
function RenderComments(props)
{
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key = {index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                    
                <Rating imageSize={20} style={styles.ratingStyle} readonly={true} startingValue={item.rating} />
                
                <Text style={{fontSize: 12}}>
                    {'--' + item.author + ',' + item.date}
                </Text>
            </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}></FlatList>
            </Card>
        </Animatable.View>
    );
}
class Dishdetail extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            author: '',
            rating: 1,
            comment: ''
        };
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    handleComments(dishId)
    {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        //console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    setAuthor(name)
    {
        this.setState({author : name})
    }
    setComment(comment)
    {
        this.setState({comment : comment})
    }
    toggleModal()
    {
        this.setState({showModal : !this.state.showModal})
    }
    setRating(rating)
    {
        this.setState({rating: rating})
    }
    static navigationOptions = {
        title: 'Dishdetails'
    };
    render()
    {
        const dishId = this.props.navigation.getParam('dishId', '');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)} 
                showModal={this.state.showModal} 
                toggleModal={() => this.toggleModal()} 
                setAuthor={(name)=> this.setAuthor(name)}
                setComment={(comment)=>this.setComment(comment)}
                setRating={(rating)=>this.setRating(rating)}
                handleComments={()=>this.handleComments(dishId)}
                onPress={() => this.markFavorite(dishId)}></RenderDish>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    iconPosition :{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8
    },
    modal: {
        justifyContent: 'center',
        margin: 10
    },
    ratingStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 8
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);