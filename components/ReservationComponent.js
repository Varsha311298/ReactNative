import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal,Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar'
import { Notifications} from 'expo';

class Reservation extends Component 
{

    constructor(props)
    {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    // toggleModal()
    // {
    //     this.setState({showModal: !this.state.showModal})
    // }

    handleReservation()
    {
        console.log(JSON.stringify(this.state));
        //this.toggleModal();
        this.addReservationToCalendar(this.state.date);
    }
    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.allowsModifications === true);
        const defaultCalendar = defaultCalendars[0];
        console.log(defaultCalendar);
        return defaultCalendar;
    }

    async addReservationToCalendar(dateInfo)
    {
        await this.obtainCalendarPermission();
        const calendar = await this.getDefaultCalendarSource();

        const modifiedStart = new Date(Date.parse(dateInfo));
        const modifiedEnd = new Date(Date.parse(dateInfo) + 2*60*60*1000);
        
        const defaultCalendarSource =
                Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
                
        const calendarId = await Calendar.createEventAsync(
            calendar.id , {
                title:  'Con Fusion Table Reservation',
                startDate : modifiedStart,
                endDate: modifiedEnd,
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
        ).then((event) => {
            console.log('Calendar create Event Async success');
        }).catch((error) => {
            console.log(error+'Calendar  createEvent async failure');
        });

    }
    async obtainCalendarPermission()
    {
        let calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);
        if(calendarPermission.status !== 'granted')
        {
             Alert.alert('Permission not granted');
            
        }
        return calendarPermission;
    }
    resetForm()
    {
        this.setState(
            {
                guests: 1,
                smoking: false,
                date: ''
            }
        );
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if( permission.status !== 'granted')
        {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted')
            {
                Alert.alert('Permission not granted to show notifications');

            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
            Notifications.presentLocalNotificationAsync({
                title: 'Your Reservation',
                body: 'Reservation for '+date+' requested',
                ios: {
                    sound: true
                },
                android: {
                    sound: true,
                    vibrate: true,
                    color: '#512DA8'
                }
            });
        }
    render()
    {
        return(
            <Animatable.View animation="zoomInUp" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Number of Guests
                    </Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Smoking/Non-Smoking
                    </Text> 
                    <Switch style={styles.formItem} value={this.state.smoking} onTintColor='#512DA8' onValueChange={(value) => this.setState({smoking : value})} >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Date and Time
                    </Text>
                    <DatePicker 
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode='date'
                        placeholder='select date and time'
                        minDate='2017-01-01'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    >
                    </DatePicker>
                </View>
                <View style={styles.formRow}>
                    <Button title='Reserve' color='#512DA8' onPress={() => {
                        Alert.alert(
                            'Your Reservation OK?',
                            'Number of Guests:' +this.state.guests + '\nSmoking? '+this.state.smoking+'\nDate and Time:'+this.state.date+'\n',
                            [
                                {
                                     text: 'Cancel', 
                                     onPress: () => this.resetForm(), 
                                     style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        this.handleReservation();
                                        this.presentLocalNotification(this.state.date);
                                        this.resetForm()
                                    }
                                }
                            ],
                            {cancelable: false}
                        );
                    }} accessibilityLabel='Learn more about this purple button' />
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight:'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin : 10
    }
})
export default Reservation;