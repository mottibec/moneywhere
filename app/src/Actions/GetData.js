import axios from 'axios';

export const getData = () => async dispatch => {
    try {
        let { data } = await axios.get('https://moneywhere.herokuapp.com/user');
        return dispatch({ type: 'fetch_data_success', payload: data });
    } catch(e) {}
}