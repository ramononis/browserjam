const random = require('random')
const seedrandom = require('seedrandom')

const BOARD_SIZE = 10
const N_COLORS = 5
class State {
    constructor(seed) {
        random.use(seedrandom(seed))
        this.seed = seed
        // this.board = new Array(BOARD_SIZE).map(() => new Array(BOARD_SIZE))
        this.board = []
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board.push([]);
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i].push(random.int(0, N_COLORS))
            }
        }
    }

    seed
    score1 = 0
    score2 = 0
    board
}
exports.State = State
