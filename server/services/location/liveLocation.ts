const io = require('socket.io')();

export default class LiveLocation {
    constructor(){
        io.listen(3000);
    }
    reister(userId: string, user2Id: string){ 

    }
    unRegister(id: string, user2Id: string){

    }
}