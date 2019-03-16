import { AuthSession } from 'expo';
import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    Image
} from 'react-native';

export default class App extends React.Component {

    state = {

    };
    
    loginWithAuth0 = async () => {
        const redirectUrl = AuthSession.getRedirectUrl();
        let auth0Domain = '';
        let auth0ClientId = '';
        const result = await AuthSession.startAsync({
            authUrl: `${auth0Domain}/authorize` + toQueryString({
                client_id: auth0ClientId,
                response_type: 'id_token',
                scope: 'openid profile',
                audience: 'https://graphql-tutorials.auth0.com/api/v2/',
                redirect_uri: redirectUrl,
                nonce: "randomstring"
            }),
        });
        console.log(result);

        // if success, handle the result
        if (result.type === 'success') {
            this.handleParams(result.params);
        }
    };

    handleParams = (responseObj) => {
        // handle error
        if (responseObj.error) {
            Alert.alert('Error', responseObj.error_description
                || 'something went wrong while logging in');
            return;
        }
        // store session in storage and redirect back to the app
        const encodedToken = responseObj.id_token;
        const decodedToken = this.jwtDecoder(encodedToken);
        AsyncStorage.setItem(
            '@todo-graphql:auth0',
            JSON.stringify({
                token: encodedToken,
                name: decodedToken.nickname,
                id: decodedToken.sub,
                exp: decodedToken.exp
            })
        ).then(() => {
            this.props.login(decodedToken.sub, decodedToken.nickname, encodedToken)
        })
    };
    jwtDecoder(token){
        return {};
    };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.loginWithAuth0}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}