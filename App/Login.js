import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, TextInput,AsyncStorage,} from 'react-native'
const {width, height} = Dimensions.get('window')

export default class Login extends Component{

    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            users: ''
        }
    }


    componentWillMount(){
        this.getData()
    }
    async getData(){
        const value = await AsyncStorage.getItem('userArr');
        const user = JSON.parse(value)
        this.setState({users: user})
    }
    logIn(){
        const {email, password } = this.state
        console.log(this.state.users,'ssssssssssssssdddddddddddd')
        let id = email + password
        let userExist = false
        if(email == '' || password == ''){
            alert('All FIelds Required')
        }
        else{
            if(this.state.users){
                this.state.users.map((user)=>{
                    if(user.email === email){
                        user.id = id
                        userExist = true
                    }
                })
            }
            if(userExist){
                this.setState({users: JSON.stringify(this.state.users)}, ()=>{
                    try{
                        AsyncStorage.setItem("userArr", this.state.users)
                    }catch (error){
                        alert(error)
                    }
                })
            }
            else{
                alert('Please First SignUp')
            }
        }

    }
    render(){
        console.log(this.state.users,'ssssssssfffffffffffff')
        return(
                    <View style={{width: width, height:height}}>
                        <View style={{width: width* 0.15, height: height* 0.05, marginTop: height* 0.03, marginLeft: width* 0.03}}>
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                                <Image source={require('./Images/leftArrow.png')} style={{width: 25, height: 25}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width, height: height* 0.1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize: 22, fontWeight: 'bold'}}>LOG IN</Text>
                        </View>
                        <View style={{width:width, height: height* 0.5, alignItems:'center', marginTop:height * 0.05}}>
                            <View>
                                <TextInput
                                    underlineColorAndroid = 'transparent'
                                    placeholder= 'Email'
                                    style={{width: width* 0.7, height: height*0.07, borderWidth:1, borderColor:'grey', borderRadius:7}}
                                    onChangeText = {(text)=> this.setState({email: text})}
                                />
                            </View>
                            <View>
                                <TextInput
                                    underlineColorAndroid = 'transparent'
                                    placeholder= 'Password'
                                    style={{width: width* 0.7, height: height*0.07, borderWidth:1, borderColor:'grey', borderRadius:7, marginTop:10}}
                                    onChangeText = {(text)=> this.setState({password: text})}
                                />
                            </View>

                            <View>
                                <TouchableOpacity onPress= {()=> this.logIn()} style={{width: width* 0.7, height: height*0.07,borderRadius:7, marginTop:height* 0.05, backgroundColor:'rgb(65,147,237)', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:18, color:'white'}}>Log In</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

        )
    }
}