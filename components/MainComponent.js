import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import { View, ScrollView, Platform, Image, StyleSheet, Text, ToastAndroid } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes : () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders : () => dispatch(fetchLeaders()),
    fetchPromos : () => dispatch(fetchPromos())
});
const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
        })
    },
    Dishdetail: {screen: Dishdetail}
},
{
   initialRouteName: 'Menu',
   navigationOptions: {
       headerStyle: {
           backgroundColor: '#512DAB'
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
           color: '#fff'
       }
   } 
});
const LoginNavigator = createStackNavigator({
    Login :Login
},
{   
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        title: 'Login',
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});

const HomeNavigator = createStackNavigator({
    Home :{screen : Home}
},
{   
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});
const AboutUsNavigator = createStackNavigator({
    AboutUs :{screen : AboutUs}
},
{   
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});
const ContactUsNavigator = createStackNavigator({
    ContactUs :{screen : ContactUs}
},
{   
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});
const ReservationNavigator = createStackNavigator({
    Reservation : {screen : Reservation}
},
{   
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites : {screen : Favorites}
},
{   
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white' onPress={() => navigation.toggleDrawer()} />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);
const MainNavigator = createDrawerNavigator({
    Login: {
        screen : LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel : 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Home: {
        screen : HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel : 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    AboutUs: {
        screen: AboutUsNavigator,
        navigationOptions: {
            title: 'AboutUs',
            drawerLabel: 'AboutUs',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Menu: {
        screen : MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel : 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    ContactUs: {
        screen: ContactUsNavigator,
        navigationOptions: {
            title: 'ContactUs',
            drawerLabel: 'ContactUs',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                    />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My favorites',
            drawerLabel: 'My favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    }     
},
{
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});


class Main extends Component {

    componentDidMount()
    {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        
        NetInfo.fetch()
            .then(( connectionInfo ) => {
                ToastAndroid.show('Initial Network connectivity type: ' +
                    connectionInfo.type + ', effective type' + connectionInfo.effectiveType,
                    ToastAndroid.LONG
                );
            });

            NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount()
    {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => 
    {
        switch(connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to wifi', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to cellular', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection', ToastAndroid.LONG);
                break;
            default:
                break;

        }
    }
    render ()
    {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width:80,
        height: 60
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);