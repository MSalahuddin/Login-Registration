import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput, AsyncStorage} from 'react-native'
const {width, height} = Dimensions.get('window')

export default class MainScreen extends Component{
    componentWillMount(){
        AsyncStorage.getItem('userArr').then((val)=>{
            let value = JSON.parse(val);
            this.getData(value)
        }).done
    }
    async getData(users){
        if(users){
            users.map((user)=>{
                if(user.id){
                    console.log(user,'hhhhhhhhhhhhhhhhhhhhhhh')
                }
            })
        }
    }
    render(){
        return(
            <View style={{width: width, height: height, backgroundColor:'red'}}>
                <Text>Mainnnnnnnnnnnnnnnnnnnnnnn</Text>
            </View>
        )
    }
}