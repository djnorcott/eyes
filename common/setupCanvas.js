//Create a Pixi Application
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
    backgroundColor: 0xffffff
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

var currentMousePos = {
    x: -1,
    y: -1
};
$(function() {
    document.addEventListener("touchstart", onTouchStart, true);
    document.addEventListener("touchend", onTouchEnd, true);
    document.addEventListener("touchmove", onTouchMove, true);
    document.addEventListener("mousemove", onMouseMove, true);
});

function onTouchStart(event) {
    currentMousePos.x = event.touches[0].clientX;
    currentMousePos.y = event.touches[0].clientY
}

function onTouchMove(event) {
    currentMousePos.x = event.touches[0].clientX;
    currentMousePos.y = event.touches[0].clientY
}

function onTouchEnd(event) {
    currentMousePos.x = event.touches[0].clientX;
    currentMousePos.y = event.touches[0].clientY
}

function onMouseMove(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
}

function rotateToPoint(mx, my, px, py) {
    var self = this;
    var dist_Y = my - py;
    var dist_X = mx - px;
    var angle = Math.atan2(dist_Y, dist_X);
    //var degrees = angle * 180/ Math.PI;
    return angle;
}

function preLoader() {
    Object.keys(sprites).forEach((name) => {
        PIXI.loader.add(sprites[name].image)
    })

    PIXI.loader.load(setup);
}

function getSprite(name, number = null) {
    if (number === null) {
        return sprites[name].sprite;
    }
    return sprites[name].sprites[number];
}

function setup() {
    Object.keys(sprites).forEach((name) => {
        if (!sprites[name].number || sprites[name].number === 1) {
            sprites[name].sprite = new PIXI.Sprite(PIXI.utils.TextureCache[sprites[name].image]);
            app.stage.addChild(sprites[name].sprite);
        } else {
            sprites[name].sprites = [];
            for (i = 0; i < sprites[name].number; i++) {
                sprites[name].sprites.push(new PIXI.Sprite(PIXI.utils.TextureCache[sprites[name].image]));
                app.stage.addChild(sprites[name].sprites[i]);
            }
        }
    })

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop(delta));
    preGame();
}