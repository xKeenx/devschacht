import React, {useEffect, useMemo, useState} from 'react';
import moment from 'moment'
import {
    Alert,
    Button,
    Platform,
    Text,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    StatusBar,
    DrawerLayoutAndroid
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {FontAwesome} from '@expo/vector-icons';
import data from "./src/data";

export const HomeScreen = (props) => {
    const [items, setItems] = useState({})
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        const getFetch = async () => {

            // for (let i = 0; i < 1; i++) {
            //     let newDate = new Date();
            //     let time = newDate.getTime() + i * 24 * 60 * 60 * 1000;
            //     let strTime = timeToString(time);
            //     strTime = moment(strTime, 'YYYY-MM-DD').format('DD.MM.YYYY');
            let url = 'http://dekanat.bsu.edu.ru/blocks/bsu_api/bsu_schedule/readStudent.php?os=android&dep=1112&form=2&group=12001802&date=03.07.2021&period=10';
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (typeof data.schedule !== 'undefined') {
                        let dataSchedule = data.schedule;
                        // console.log(dataSchedule)
                        dataSchedule.forEach(k => {
                            schedule.push(k);
                        })
                    }
                }).catch(e => {
                    console.log('ERROR');
                })
            // }
        };
        getFetch().then(r => console.log('Данные получены'));
    }, [schedule])


    let currDate = new Date();
    const loadItems = () => {

        schedule.forEach(e => {
            const NewDate = moment(e.date, 'DD.MM.YYYY').format('YYYY-MM-DD');
            items[NewDate] = []

        });
        schedule.forEach(e => {
            const NewDate = moment(e.date, 'DD.MM.YYYY').format('YYYY-MM-DD');
            items[NewDate].push({
                name: e.dis,
                pairNumber: e.pairnumber,
                room: e.room,
                area: e.area,
                teacher: e.teacher,
                timeStart: e.timestart,
                timeEnd: e.timeend,
                subGroup: e.subgroup,
            });
        });
        const newItems = {};
        Object.keys(items).forEach(key => {
            newItems[key] = items[key];
        });
        setItems(newItems)


    }

    const showRoom = (room) => {
        if (room === "null") {
            return <Text>Кабинет не указан</Text>
        } else return <Text>Кабинет: {room}</Text>
    }
    const showArea = (area) => {
        if (area === "null") {
            return <Text>Корпус не указан</Text>
        } else return <Text>Корпус: {area}</Text>
    }
    const showSubGroup = (subGroup) => {
        if (subGroup === "null") {
            return <Text>Подгруппа не указана</Text>
        } else {
            return <Text>Подгруппа №: {subGroup}</Text>
        }
    }

    const renderItem = (item) => {
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text style={{fontSize:22 , borderStyle:"solid",borderBottomWidth:3,borderColor:'#7cff'}}>{item.pairNumber} Пара {item.timeStart}-{item.timeEnd}</Text>
                <Text>{item.name}</Text>
                <Text>{showRoom(item.room)}</Text>
                <Text>{showArea(item.area)}</Text>
                <Text>{showSubGroup(item.subGroup)}</Text>
                <Text>Преподователь:{item.teacher}</Text>

            </View>
        );
    }


    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    // const timeToString=(time)=> {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    // }

    return (
        <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={currDate}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showRoom={showRoom}
            showArea={showArea}
            showSubGroup={showSubGroup}
        />
    )
}

// class HomeScreen extends React.Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//       items: {},
//       schedule: [],
//     };
//     }
//     componentDidMount() {
//       const getFetch = async () => {
//           let s = [];
//           for (let i = -5; i < 5; i++) {
//             let newDate = new Date();
//             let time = newDate.getTime() + i * 24 * 60 * 60 * 1000;
//             let strTime = this.timeToString(time);
//             strTime = moment(strTime, 'YYYY-MM-DD').format('DD.MM.YYYY');
//             let url = 'http://dekanat.bsu.edu.ru/blocks/bsu_api/bsu_schedule/readStudent.php?os=android&dep=1112&form=2&group=12001802&date=' + strTime;
//             await fetch(url)
//                 .then(response => response.json())
//                 .then(data => {
//                    if (typeof data.schedule !== 'undefined') {
//                        let dataschedule = data.schedule;
//                        dataschedule.forEach(k =>{
//                         this.state.schedule.push(k);
//                        })
//                    }
//                 }).catch(e => {
//                     console.log('ERROR');
//                 })
//           }
//       };
//       getFetch();
//     }
//     render() {
//     let currDate = new Date();
//     return (
//          <Agenda
//            items={this.state.items}
//            loadItemsForMonth={this.loadItems.bind(this)}
//            selected={currDate}
//            renderItem={this.renderItem.bind(this)}
//            renderEmptyDate={this.renderEmptyDate.bind(this)}
//            rowHasChanged={this.rowHasChanged.bind(this)}
//          />
//      );
//     }
//
//     loadItems(day) {
//
//       setTimeout(() => {
//         const { schedule } = this.state;
//
//         schedule.forEach(e =>{
//           const NewDate = moment(e.date, 'DD.MM.YYYY').format('YYYY-MM-DD');
//           this.state.items[NewDate] = []
//         });
//         schedule.forEach(e =>{
//             const NewDate = moment(e.date, 'DD.MM.YYYY').format('YYYY-MM-DD');
//             this.state.items[NewDate].push({
//               name: e.dis,
//             });
//         });
//         const newItems = {};
//         Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
//         this.setState({
//           items: newItems
//         });
//       }, 1000);
//     }
//
//     renderItem(item) {
//       return (
//         <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
//       );
//     }
//
//     renderEmptyDate() {
//       return (
//         <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
//       );
//     }
//
//     rowHasChanged(r1, r2) {
//       return r1.name !== r2.name;
//     }
//
//     timeToString(time) {
//       const date = new Date(time);
//       return date.toISOString().split('T')[0];
//     }
// }

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});

export default HomeScreen;
