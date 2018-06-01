import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput, AsyncStorage} from 'react-native'
const {width, height} = Dimensions.get('window')

export default class MainScreen extends Component{
    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props)
        this.state = {
            users:''
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('userArr').then((val)=>{
            let value = JSON.parse(val);
            this.setState({users: value})
        }).done
    }
    logOut(){
        this.state.users.map((user)=>{
            if(user.id){
                delete user.id
            }
        })
        this.setState({users: JSON.stringify(this.state.users)}, ()=>{
            try{
                AsyncStorage.setItem("userArr", this.state.users)
                this.props.navigation.goBack()
            }catch (error){
                alert(error)
            }
        })
    }
    render(){
        return(
            <View style={{width: width, height: height, justifyContent: 'center', alignItems:'center'}}>
                <View>
                    <TouchableOpacity onPress={()=> this.logOut()} style={{width: width* 0.7, height: height*0.07,borderRadius:7, marginTop:20, backgroundColor:'rgb(65,147,237)', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18, color:'white'}}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}