var ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {

 };

 
ws.onmessage = (e) => { 
//get live user location
    console.log(e.data);
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
};