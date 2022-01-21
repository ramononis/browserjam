// TODO: index.html en visualize implementeren
function visualize(state) {
    const canvas = document.querySelector('#canvas');
    console.log(canvas)
    console.log("hallo")
    const width = canvas.width;
    const height = canvas.height;

    let ctx = canvas.getContext('2d');
    ctx.strokeRect(50, 50, 150, 100);
}

exports.visualize = visualize