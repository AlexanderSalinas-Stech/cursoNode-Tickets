const { TicketControl } = require("../models/ticket-control");

const ticketControl=new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket',ticketControl.ultimo);
    socket.emit('estado-actual',ticketControl.ultimos4);
    socket.emit('tickets-pendientes',ticketControl.tickets.length);
   
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback(siguiente); 
        //notificar ticket pendiente
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
       

    })

    socket.on('atender-ticket',({escritorio},callback)=>{
        if (!escritorio) {
            return callback({
                error:true,
                msg:"El escritorio es obligatorio"
            });
        }

        const ticket=ticketControl.atenderTicket(escritorio);
        socket.emit('tickets-pendientes',ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
        //notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4);

        if (!ticket) {
            return callback({
                error:true,
                msg:"Ya no hay mas tickets pendientes"
            });
        }else{
            return callback({
                error:false,
               ticket
            });
        }
    });

}



module.exports = {
    socketController
}

