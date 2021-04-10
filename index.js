var c = document.getElementById("game");
var ctx = c.getContext("2d");

var p = {
    x: (c.width / 2) - 10,
    y: (c.height / 2) - 10,
    dir: null,
    alive: true,
    length: 1,
    blocksX: [12],
    blocksY: [12]
}

var apple = {
    x: null,
    y: null
}

var best = null;

function generateApple(){
    apple.x = Math.floor((Math.random() * 25)) * 20;
    apple.y = Math.floor((Math.random() * 25)) * 20;
    for(var i4 = 0; i4<p.length; i4++){
        if(p.blocksX[i4]*20 == apple.x && p.blocksY[i4]*20 == apple.y){
            generateApple();
        }
    }
}

generateApple();

var keyMap = {
    68: "right",
    65: "left",
    87: "up",
    83: "down",
    39: "right",
    37: "left",
    38: "up",
    40: "down"
}

function keyDown(event){
    if(p.alive){
        if(event.keyCode == 68 || event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 83 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 37){
            var key = keyMap[event.keyCode]
            p.dir = key;
        }
        if(event.keyCode == 66){
            p.dir = null;
        }
    } else {
        if(event.keyCode == 13){
            p = {
                x: (c.width / 2) - 10,
                y: (c.height / 2) - 10,
                dir: null,
                alive: true,
                length: 1,
                blocksX: [12],
                blocksY: [12]
            }
            generateApple();
        }
    }
}

window.addEventListener("keydown",keyDown,false);

function testOverlap(){
    for(var i2 = 0; i2<p.length; i2++){
        for(var i3 = 0; i3<p.length; i3++){
            if(p.blocksX[i2] == p.blocksX[i3] && p.blocksY[i2] == p.blocksY[i3] && i2 != i3){
                death();
            }
        }
    }
}

var better;

function death(){
    if(best==null){
        best = p.length;
        better = true;
    } else {
        if(p.length > best){
            best = p.length;
            better = true;
        } else {
            better = false;
        }
    }
    p.alive = false;
}

var t = 0;

function update(){
    t++;

    document.querySelector("#scoreText").innerHTML = p.length;

    if(p.alive){
        document.querySelector("#scoreLine").style.backgroundColor = "transparent";
    } else {
        if(best==null){
            document.querySelector("#bestText").innerHTML = 0;
            if(better){
                document.querySelector("#scoreLine").style.backgroundColor = "#00ff00";
                document.querySelector("#bestLine").style.backgroundColor = "#ff0000";    
            } else {
                if(better==false){
                    document.querySelector("#scoreLine").style.backgroundColor = "#ff0000";
                    document.querySelector("#bestLine").style.backgroundColor = "#00ff00";
                }
            }
        } else {
            if(better){
                document.querySelector("#scoreLine").style.backgroundColor = "#00ff00";
                document.querySelector("#bestLine").style.backgroundColor = "#ff0000";    
            } else {
                if(better==false){
                    document.querySelector("#scoreLine").style.backgroundColor = "#ff0000";
                    document.querySelector("#bestLine").style.backgroundColor = "#00ff00";
                }
            }
            document.querySelector("#bestText").innerHTML = best;
        }
    }


    for(var i4 = 0; i4<p.length; i4++){
        if(p.blocksX[i4]*20 == apple.x && p.blocksY[i4]*20 == apple.y){
            generateApple();
        }
    }

    if(t>20){
        if(p.alive){
            if(p.dir == "right"){
                for(var i = p.length - 1; i > 0; i-=1){
                    p.blocksX[i] = p.blocksX[i-1];
                    p.blocksY[i] = p.blocksY[i-1];
                }
                p.blocksX[0] = p.blocksX[0] + 1;
                p.x += 20;
                if (p.x > c.width){
                    death();
                }
            } else {
                if(p.dir == "left"){
                    for(var i = p.length - 1; i > 0; i-=1){
                        p.blocksX[i] = p.blocksX[i-1];
                        p.blocksY[i] = p.blocksY[i-1];
                    }
                    p.blocksX[0] = p.blocksX[0] - 1;
                    p.x -= 20
                    if (p.x < 0){
                        death();
                    }
                } else {
                    if(p.dir == "up"){
                        for(var i = p.length - 1; i > 0; i-=1){
                            p.blocksX[i] = p.blocksX[i-1];
                            p.blocksY[i] = p.blocksY[i-1];
                        }
                        p.blocksY[0] = p.blocksY[0] - 1;
                        p.y -= 20
                        if (p.y < 0){
                            death();
                        }
                    } else {
                        if(p.dir == "down"){
                            for(var i = p.length - 1; i > 0; i-=1){
                                p.blocksX[i] = p.blocksX[i-1];
                                p.blocksY[i] = p.blocksY[i-1];
                            }
                            p.blocksY[0] = p.blocksY[0] + 1;
                            p.y += 20
                            if (p.y > c.height){
                                death();
                            }
                        } else {
                            if(p.dir == null){
                                // Don't move
                            }
                        }
                    }
                }
            }
        }

        t=0;
    }

    testOverlap();

}

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    if(p.alive){
        ctx.fillStyle = "lime";
        for(var i = 0; i < p.length; i++){
            ctx.fillRect((p.blocksX[i]*20), (p.blocksY[i]*20), 20, 20);
        }
        if(p.x == apple.x && p.y == apple.y){
            p.length++;
            generateApple();
        }
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x + 5, apple.y + 5, 10, 10);
    } else {
        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.fillText("YOU DIED", 50, 50);
        ctx.font = "30px Arial";
        ctx.fillText("Press ENTER to play again", 50, 100);
    }
}

function loop(timestamp){
    update();
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
