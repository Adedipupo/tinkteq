import { Server } from 'socket.io';

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Here - chat socket');
    console.log('Connected to socket server with socket id - ' + socket.id);

    socket.on('subscribeToOrder', (orderId) => {
      socket.join(orderId);
      console.log(`Client subscribed to order updates for ${orderId}`);
    });

    socket.on('orderUpdate', (order) => {
      console.log('Order update event received', order);
      io.to(order._id).emit('orderUpdate', order); // Emit to clients subscribed to this order
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

export { io, initializeSocket };