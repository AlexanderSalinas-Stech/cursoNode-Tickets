//referencias html
const lblEscritorio=document.querySelector('h1');
const btnAtender=document.querySelector('button');
const lblticket=document.querySelector('small');
const lblAlert=document.querySelector('.alert');
const lblPendientes=document.querySelector('#lblPendientes');


const searchParams= new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location='index.html';
    throw new Error('El escritorio es Obligatorio');
}

const escritorio=searchParams.get('escritorio');
lblEscritorio.innerText=escritorio;

lblAlert.style.display='none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled=false;

});

socket.on('disconnect', () => {
    btnAtender.disabled=true;
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.on('tickets-pendientes', (payload) => {

    if (payload===0) {
        lblPendientes.style.display='none';
    }else{
        lblPendientes.style.display='';
    }
    lblPendientes.innerText=payload;
})

socket.on('ultimo-ticket', (payload) => {
    // lblNuevoTicket.innerText='Ticket '+payload;
})


btnAtender.addEventListener( 'click', () => {

    const payload={
        escritorio
    }
    
    socket.emit( 'atender-ticket', payload, ( {error,ticket,msg} ) => {
        if (error) {
            lblticket.innerText='Nadie';
            lblAlert.innerText=msg;
            return lblAlert.style.display='';
        }

        lblticket.innerText=`Ticket ${ticket.numero}`;
    });

});