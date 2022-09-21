// http://127.0.0.1:5500/index.html

const fs = require('fs');

// node server which will handle socket io connections
const io = require('socket.io')(8000)
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name=>{
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});
