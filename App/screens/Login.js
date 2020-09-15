import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/AuthenticationAction';
import Toast from 'react-native-simple-toast';

/**
 * Screen Login - User Authentication Screen
 */

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',  // username value for UserName TextBox
            password: '',  // Password value for Password TextBox
            usernameerror: false, // username error value for Validating UserName Field
            passworderror: false, // password error value for Validating password Field
            loginloading: false  // loader for Indicating user wait for authentication to complete
        }
    }

    componentWillReceiveProps(newProps) {

        const { loading, loginresponse, employees } = newProps.authentication; // Destructring authentication from redux

        if (loginresponse !== null) {

            if (loginresponse === 'Login_Failed') {
                
                // If User Enter Wrong UserName or Password to indicate them with Toast Message
                Toast.show('UserName or Password is incorrect');
            } else if (loginresponse === 'Login_Success') {

                // If User Enter Correct Crendential navigate them to Employee List Screen
                this.props.navigation.navigate('Employees', { employeeList: employees });
            }
        }

        this.setState({loginloading: loading}); // Setting Loading for Button
    }

    /**
     * Setting Form Value Method For Validating  and Setting User enter credential
     * @param {string} Value - Value of Textboxes UserName and Password
     * @param {string} type  - Type of Fields
     */
    setFormValues = (value, type) => {

        if (type === 'username') {

            const emailIdRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email Regx for Validating EmailId

            if (emailIdRegx.test(value) === false || value === "") {  // Check If User Enter Correct EmailId or Not

                this.setState({
                    usernameerror: true
                });
            } else {

                this.setState({
                    usernameerror: false
                });
            }
        } else if (type === 'password') {

            const passwordRegx = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;  // Password Regx for Validating Password (Password Contains Any Number or Not)

            if (passwordRegx.test(value) === false || value === "") {  // Check If User Enter Correct Password or Not

                this.setState({
                    passworderror: true
                });
            } else {

                this.setState({
                    passworderror: false
                });
            }
        }

        this.setState({
            [type]: value    // Setting Values for Username and Password
        });
    }

    /**
     * Login Method for LoggingIn User
     */
    login = () => {
        const { password, username, usernameerror, passworderror } = this.state;
        if (!usernameerror && !passworderror) {
            let userObj = {
                username: username,
                password: password 
            }
            this.props.loginUser(userObj);  // Send Credential to Action Method for validating
        }
    }


    render() {
        const { usernameerror, passworderror, username, password, loginloading } = this.state;
        return (
            <View style={styles.container}>
                <Input
                    value={username}
                    placeholder={"Username"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    {...usernameerror && { errorMessage: 'Incorrect User Name' }}
                    errorStyle={{ alignSelf: 'center', fontSize: 12, marginTop: 10, marginBottom: 10 }}
                    onChangeText={value => this.setFormValues(value, "username")}
                />
                <Input
                    value={password}
                    placeholder={"Password"}
                    secureTextEntry
                    autoCapitalize="none"
                    {...passworderror && { errorMessage: 'Password Must Contain atleast One Number' }}
                    errorStyle={{ alignSelf: 'center', fontSize: 12, marginTop: 0, marginTop: 10, marginBottom: 10 }}
                    onChangeText={value => this.setFormValues(value, "password")}
                />
                <Button
                    buttonStyle={styles.button}
                    title="Login"
                    loading={loginloading}
                    onPress={() => this.login()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    return { authentication };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loginUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/**
 * Styles for Screen Login
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 24,
        marginLeft: 24
    },
    button: {
        width: 250
    }
});