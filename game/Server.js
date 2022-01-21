const GAME_NAME = "Cupido"

const {State} = require("./State");
const {move} = require("./Logic");
const { io } = require("socket.io-client");
const socket = io("https://browserjam-event-server.herokuapp.com/" + GAME_NAME);
const players = {}

function joinGame(roomName, playerName) {
    socket.emit('join', {
        room: roomName,
        player: { name: playerName }
    });
}

function doMoveAndUpdateState(cell1, cell2) {
    let newState = move(state, cell1, cell2)
    socket.emit('state', newState);
}

socket.on('join', player => {
    players[player.id] = player;

    if ( player.id !== socket.id && players.size === 2 ) {
        socket.emit('state', new State(41));
    }

    if (players.size > 2) {
        socket.emit('message', { message: 'intruder!' });
    }
});

socket.on('state', (state, player) => {
    if (player.id === state.id) {
        // ignore, player last moved
    } else {
        // update frontend: your turn!
    }
});
