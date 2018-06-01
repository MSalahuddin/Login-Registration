import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput, AsyncStorage} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import _ from 'underscore';
import data from './MLSRegion'
const {width, height} = Dimensions.get('window')

export default class SignUpScreen extends Component{

    static navigationOptions = {
        header : null
    };
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            retypePass:'',
            users: '',
            mlsRegion: data,
            mlsID:'',
            selMls:'',
            showPass: false,
            showRetypePass: false
        }
    }
    componentWillMount(){
        console.log('kkkkkkkkkkkkkkkkllllllllllllllllllllllllll')
        this.getUsers()
    }
    async getUsers(){
        const value = await AsyncStorage.getItem('userArr');
        const user = JSON.parse(value)
        this.setState({users: user})

    }
    signUp(){
        const {email, password, users, date, firstName, lastName, retypePass } = this.state
        let id = email + password
        var userArr = []
        let user = { email: email, password: password, id: id}
        userArr.push(user)
        let emailExist = false
        if(firstName == '' || lastName == '' || email == '' || password == '' || retypePass == '' || date == ''){
            alert('All Fields Required')
        }
        else{
            if(users){
                this.state.users.map((user)=>{
                    if(user.email == email){
                        emailExist = true
                        alert('Email Already Exist')
                    }
                })
            }
            if(!emailExist){
                let allUsers = _.union(userArr, this.state.users)
                this.setState({users: JSON.stringify(allUsers)}, ()=>{
                    try{
                        AsyncStorage.setItem("userArr", this.state.users)
                        this.props.navigation.navigate("MainScreen", {screen: "MainScreen"})
                    }catch (error){
                        alert(error)
                    }
                })
            }
        }

    }
    render(){
        return(
            <View style={{width: width, height:height}}>
                <View style={{width: width* 0.15, height: height* 0.05, marginTop: height* 0.03, marginLeft: width* 0.03}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Image source={require('./Images/leftArrow.png')} style={{width: 25, height: 25}}/>
                    </TouchableOpacity>
                </View>
                <View style={{width:width, height: height* 0.07, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>Create an Account</Text>
                </View>
                <View style={{width:width, height: height* 0.6, alignItems:'center'}}>
                    <View>
                        <TextInput
                            placeholder= 'First Name'
                            style={{width: width* 0.7, height: height*0.07, borderRadius:7}}
                            onChangeText = {(text)=> this.setState({firstName: text})}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder= 'last Name'
                            style={{width: width* 0.7, height: height*0.07, borderRadius:7, marginTop:10}}
                            onChangeText = {(text)=> this.setState({lastName: text})}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder= 'Email'
                            style={{width: width* 0.7, height: height*0.07, borderRadius:7, marginTop:10}}
                            onChangeText = {(text)=> this.setState({email: text})}
                        />
                    </View>
                    <View style={{width: width* 0.7, height: height*0.07, borderRadius:7, marginTop:10}}>
                        <TextInput
                            placeholder= 'Password'
                            secureTextEntry={this.state.showPass ? false : true}
                            onChangeText = {(text)=> this.setState({password: text})}
                        />
                        <TouchableOpacity style={{ height: 25, width: 25,marginTop: -height*0.055, marginLeft:  215, marginBottom:  30}} onPress={()=> this.setState({showPass: !this.state.showPass})}>
                            {this.state.showPass ?
                                <Image source={require('./Images/showPassw.png')} style={{height: 25, width: 25}}/> :
                                <Image source={require('./Images/showPass.png')} style={{height: 25, width: 25}}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width* 0.7, height: height*0.07, borderRadius:7, marginTop:10}}>
                        <TextInput
                            placeholder= 'Re-type Password'
                            secureTextEntry={this.state.showRetypePass ? false : true}
                            onChangeText = {(text)=> this.setState({retypePass: text})}
                        />
                        <TouchableOpacity style={{ height: 25, width: 25,marginTop: -height*0.055, marginLeft:  215, marginBottom:  30}} onPress={()=> this.setState({showRetypePass: !this.state.showRetypePass})}>
                            {this.state.showRetypePass ?
                                <Image source={require('./Images/showPassw.png')} style={{height: 25, width: 25}}/> :
                                <Image source={require('./Images/showPass.png')} style={{height: 25, width: 25}}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Dropdown
                            label='MLS Region'
                            containerStyle= {{width: width* 0.7, paddingLeft: 5, paddingBottom: 25, height: height*0.07, borderRadius:7, marginTop:10, justifyContent:'center'}}
                            data={this.state.mlsRegion}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder= 'MLS ID'
                            style={{width: width* 0.7, height: height*0.07, borderRadius:7, marginTop:10}}
                            onChangeText = {(text)=> this.setState({mlsID: text})}
                        />
                    </View>
                    <View>
                        <DatePicker
                            style={{width: width* 0.7, height: height*0.06,borderRadius:7, marginTop:10}}
                            date={this.state.date}
                            showIcon= {false}
                            mode="date"
                            placeholder="select date"
                            format="MM-DD-YYYY"
                            minDate="2016-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateInput: {
                                borderWidth: 0
                              }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                        <View style={{borderBottomWidth:1, borderBottomColor: 'black'}}></View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=> this.signUp()} style={{width: width* 0.7, height: height*0.07,borderRadius:7, marginTop:20, backgroundColor:'rgb(65,147,237)', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:18, color:'white'}}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}