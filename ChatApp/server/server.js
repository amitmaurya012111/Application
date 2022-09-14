const mongoose = require('mongoose');
const Msg = require('./Mess')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})
const mongoDB = 'mongodb+srv://amitmaurya:Amit1234@cluster1.x9pcb.mongodb.net/chat1-database?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrLParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))

io.on('connection', socket => {

    socket.on('clientready', payload => {

        Msg.find().then((result) => {
            io.emit('previous', result);
        })
    })
 


    console.log('connection made successfully')
    socket.on('message', payload => {
        const message1 = new Msg({ name:payload.name, message:payload.message, time:payload.time, cursor:payload.cursor });
        message1.save().then(() => {
            console.log('Message received on server: ', payload)
            io.emit('message', payload)
        })
    });



    // socket.on('read-data', (rdata) =>{
    //     Msg.findOneAndUpdate().then((result)=>{
    //       {result.payload.time: rdata.time},{result.payload.cursor: true}
    //     })
    // })

    socket.on('read-data', (rdata) =>{
        Msg.findOneAndUpdate({time: rdata.time}, {cursor: true}, {new: true}, (error, data) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log(data);
            }
        })
    })
})


server.listen(7171, () => {
    console.log('I am listening at port: 7171)');
})

