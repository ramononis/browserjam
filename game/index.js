const {State} = require("./State");
const {visualize} = require("./Interface");

let state = new State(1)

console.log(state)

document.addEventListener("DOMContentLoaded", () => { visualize({}) })

    // document.onload(() => { visualize({}) })


