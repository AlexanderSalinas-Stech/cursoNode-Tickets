//referencias html
const lblNuevoTicket= document.querySelector('#lblNuevoTicket');
const btnCrear= document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled=false;

});

socket.on('disconnect', () => {
    btnCrear.disabled=true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.on('ultimo-ticket', (payload) => {
    lblNuevoTicket.innerText='Ticket '+payload;
})


btnCrear.addEventListener( 'click', () => {

    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=ticket;
    });

});