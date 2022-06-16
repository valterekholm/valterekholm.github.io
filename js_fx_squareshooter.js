/*Gun movement must be max one degree at a time, se note A*/
GUN_SIZE = 100;
BEAM_SIZE = 25;
GUN_X_OFFSET = 350;
SVG_GUN_WIDTH = 100;//ALSO HEIGHT
WAIT_AFTER_HIT = 3000;
minHitDecay = 1000;
MAX_TARGET_STEP = 8//4//5;//higher is faster
angle = 1; oldAngle = 0;

INTERV_MOUSE_AIM = 40;

BOARD_HEIGHT = 700;//px, use as width also

MAX_GUN_ANGLE = 85;

STATS_DESCRIPTION = "The columns show the distance between 'beam' and target";

moveGunInterv = null;
intervBeam = null;
intervTarget = null;
intervAim = null; //for click on area


//heartImg = "hearts_dots_.svg"; //"heart.svg"; //replaced by inline svg
mouseDownTicks = 0; //counter increasing only if mouse is down

moveGunInterv_copy = null;
intervBeam_copy = null;
intervTarget_copy = null;

targTimeout = null;

var targetLowest = 170;//hight from "ground"
var minLen = 100, maxLen = 200; //target length limits

intervBeam_ = 40;//80;
targetStep = 1;
intervWindow_ = 20;
statusField = null;
gunImg = null;
fireBtn = null;
beamImg = null;
window_ = null;//target
info = null;
banner = null;//banner for info
board = null; //play board
fx = 2;

windowPos = {}; //for stats

mousePos = {}; //with x y relative to board, and lastMoveTick, used for mouse down

mousePos.lastMoveTick = -1;

windowPos.getCenterXY = function () {

    console.log(this);//return center of square in x,y
    var coord = {};
    coord.x = (this.x1 + this.x2) / 2;
    coord.y = (this.y1 + this.y2) / 2;
    return coord;

}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

hearts = null; //eleme
heartsCount = 10;

soundOn = 0;
soundBtn = null;

points = null; //eleme
pointsCount = 0;

svgGun = null;
svgBeam = null;
svgBeamOuter = null;
is_fired = false;

outerX = 700;
outerY = 700;//todo: make as board size

sizes = []; //img_sizes
sincoses = [];
sincoses1 = [];//real

beamObj = {};

saveStats = true;//to trace a fault with beam crossing the target
stats = [];

//todo: use obj for target(s):

var T = {};
T.dir = 'l'; //direction, l or r
T.speed = 50; //50 is normal
T.altitude = 400; //px up in the air
T.len = 100; //px of length
T.posX = 100; //from left in px
T.div = document.querySelector("#window");//Todo: make array of targets, initially one

window.onload = function () {

    board = document.querySelector("#board");
    /*board.addEventListener("click", function(ev){
    
        console.log(ev);
    
    });*/

    board.addEventListener("mousedown", function (ev) {

        console.log(ev);
        mousePos.x = ev.layerX;
        mousePos.y = ev.layerY;
        mouseDown();//using global var

    });

    board.addEventListener("mouseup", function (ev) {

        console.log(ev);
        mouseUp(true);

    });
    /* did not work
    board.addEventListener("mousemove", function(ev){
        console.log(ev);
    
        //mouseDownTicks
        //mousePos.lastMoveTick
        if(mousePos.lastMoveTick != mouseDownTicks){
            mousePos.x = ev.layerX;
            mousePos.y = ev.layerY;
            console.log("move " + mousePos.x + ", " + mousePos.y);
            mouseUp(false);//test
            mouseDown();//test
            mousePos.lastMoveTick = mouseDownTicks;
        }
    });
    */

    /*sound*/
    sound1 = document.createElement("audio");
    sound1.src = "button-6.mp3";
    sound1.volume = 0.25;
    sound1.autoPlay = false;
    sound1.preLoad = true;


    soundOn = true;
    soundBtn = document.querySelector("#soundBtn");
    
    //onmousedown="toggleSound(this)"
    soundBtn.addEventListener("mousedown", function(){
            toggleSound(this);
        }
    );

    window.addEventListener("keydown", function (ev) {
        //todo make like keypress but for arrow btns
        console.log(ev);
        switch (ev.keyCode) {
            case 32:
                //console.log("SPACE");
                fireHit();
                break;
            case 38://up
            case 37://left
                moveGun(-1);
                break;
            case 39:
            case 40:
                moveGun(1);
                break;
            case 65: //a
                makeBreak();
                if (saveStats) {
                    alert("Presentings stats:\n" + STATS_DESCRIPTION);
                    presentStats();
                }
                saveStats = false;//prevent double statsGraphs
                break;
            case 73: //i
                increaseTargetSpeed();
                break;
            case 83: //s
                toggleSound(soundBtn);
                break;
        }
    });


    info = document.querySelector("#info");

    info.addEventListener("click", function () {
        var message_standard = "<h2>Instructions / alternatives</h2><h3>1. Use arrows to aim, fire with space-bar, 's' to toggle sound.<br><br>2. Use mouse to aim, click-hold on area.<br><br>3. Use slider and button</h3>";
        var message_mobile = "<h2>Instructions / alternatives</h2><h3>Touch game area to aim, release to fire.</h3>";
        messageBanner(message_standard, 7000);
    });
    
    //added this to fix issue with mobile screen usage (see touch2Mouse)
    info.addEventListener("mousedown", function () {
        var message_standard = "<h2>Instructions / alternatives</h2><h3>1. Use arrows to aim, fire with space-bar, 's' to toggle sound.<br><br>2. Use mouse to aim, click-hold on area.<br><br>3. Use slider and button</h3>";
        var message_mobile = "<h2>Instructions / alternatives</h2><h3>Touch game area to aim, release to fire.</h3>";
        messageBanner(message_mobile, 7000);
    });

    info.className = "";//for animation (transition)

    points = document.querySelector("#points");

    banner = document.querySelector("#banner");

    svgGun = document.querySelector("#line1");
    svgBeam = document.querySelector("#line2");
    svgBeamOuter = document.querySelector("#svgBeam");

    //test
    //var testy = 3;
    //var testx = getXFromY(testy);
    //console.log("testx from y "+testy+" :" + testx);

    for (var i = -90; i < 90; i++) {
        sincoses.push(getXYSvg(i, GUN_SIZE, GUN_SIZE / 2, GUN_SIZE));//getWidthHeight(i, GUN_SIZE));
        sincoses1.push({ x: Math.sin(i / 360 * Math.PI * 2), y: Math.cos(i / 360 * Math.PI * 2) });
        //console.log("i " + i + ": " + Math.sin(i / 360 * Math.PI * 2));
    }

    console.log(sincoses1);

    statusField = document.querySelector("#status");
    gunImg = document.querySelector("#gun_");
    //beamImg = document.querySelector("#beam");

    window_ = document.querySelector("#window");
    //setImgSizes(gunImg, sizes[20]);


    var decr = document.querySelector("#decrease");
    var incr = document.querySelector("#increase");
    var aimer = document.querySelector("#aimer");
    fireBtn = document.querySelector("#fire");
    /*
    decr.addEventListener("mousedown", function(){console.log("decrease down"); triggerGunMove(-1)});
    decr.addEventListener("mouseup", function(){console.log("decrease up"); abortGunMove()});
    
    incr.addEventListener("mousedown", function(){console.log("increase down"); triggerGunMove(+1)});
    incr.addEventListener("mouseup", function(){console.log("increase up"); abortGunMove()});
    */
    aimer.addEventListener("input", function () {
        console.log("aimer at " + this.value);
        angle = parseInt(this.value);
        setGunPointPos(sincoses[angle + 90].x, sincoses[angle + 90].y);
    });

    fireBtn.addEventListener("click", function () {
        fireHit();
    });
    //added this to fix issue with mobile screen usage (see touch2Mouse)
    fireBtn.addEventListener("mousedown", function () {
        fireHit();
    });




    //auto update the angle status field
    setInterval(function () { statusField.value = angle; }, 100);

    setGunPointPos(sincoses[angle + 90].x, sincoses[angle + 90].y);

    initTarget();
    initSvgBeam(angle);

    hearts = document.querySelector("#hearts");
    for (var i = 0; i < heartsCount; i++) {
        drawOneHeart("heart_" + i);
    }


    //test: capture touch screen...
    document.addEventListener("touchstart", touch2Mouse, true);
    document.addEventListener("touchmove", touch2Mouse, true);
    document.addEventListener("touchend", touch2Mouse, true);


}//end window onload

function fireHit() {
    if (is_fired) { return }

    initSvgBeam(angle);
    shoot(angle);
    is_fired = true;

    disableButton(fireBtn);
    sound1.play();
}

/*pass 1 or -1*/
/*for buttons pushed, start moving gun by interval*/
function triggerGunMove(step) {
    moveGunInterv = setInterval(
        function () {
            oldAngle = angle; //Note A: save old to compare in order to know when to switch image file
            angle += parseInt(step);

            if (angle >= MAX_GUN_ANGLE) angle = MAX_GUN_ANGLE - 1;
            if (angle <= - MAX_GUN_ANGLE) angle = -(MAX_GUN_ANGLE) + 1;

            setGunPointPos(sincoses[angle + 90].x, sincoses[angle + 90].y);

        }, 100);
}
/*When button is released*/
function abortGunMove() {
    clearInterval(moveGunInterv);
}

function moveGun(step) {
    oldAngle = angle; //Note A: save old to compare in order to know when to switch image file
    angle += parseInt(step);
    if (angle >= MAX_GUN_ANGLE) angle = MAX_GUN_ANGLE - 1;
    if (angle <= - MAX_GUN_ANGLE) angle = -(MAX_GUN_ANGLE) + 1;

    setGunPointPos(sincoses[angle + 90].x, sincoses[angle + 90].y);
    //var _x2, _y2;

    //_x2 = sincoses1[angle+90].x * BEAM_SIZE;
    //_y2 = sincoses1[angle+90].y * -BEAM_SIZE + 100;

    //var wh = sizes[angle]; //getWidthHeight(angle, GUN_SIZE);
}

function setGunAngle(ang) {
    oldAngle = angle; //Note A: save old to compare in order to know when to switch image file
    angle = ang;
    if (angle >= MAX_GUN_ANGLE) angle = MAX_GUN_ANGLE - 1;
    if (angle <= - MAX_GUN_ANGLE) angle = -(MAX_GUN_ANGLE) + 1;

    setGunPointPos(sincoses[angle + 90].x, sincoses[angle + 90].y);
}

function getWidthHeight(ang, factor) {
    var sinus = Math.sin(ang / 360 * Math.PI * 2);
    var cosinus = Math.cos(ang / 360 * Math.PI * 2);
    var ret = {};
    ret.width = sinus * factor;
    ret.height = cosinus * factor;
    return ret;
}

function getXYSvg(ang, size, xoffset, yoffset) {
    var x = calcSvgGunXPos(ang, size, xoffset);
    var y = calcSvgGunYPos(ang, size, yoffset)
    var ret = {};
    ret.x = x;
    ret.y = y;
    return ret;
}

function setImgSizes(imgElem, sizes) {
    imgElem.style.width = sizes.width + "px";
    imgElem.style.height = sizes.height + "px";
}

function checkIfThinSwitch(angle_, oldAngle_) {
    if (angle_ == SWITCH_IMG_LOW2 && oldAngle_ == SWITCH_IMG_LOW2 + 1) return -2;
    else if (angle_ == SWITCH_IMG_LOW && oldAngle_ == SWITCH_IMG_LOW + 1 || angle_ == SWITCH_IMG_LOW2 + 1 && oldAngle_ == SWITCH_IMG_LOW2) return -1;
    else if (angle_ == SWITCH_IMG_HIGH && oldAngle_ == SWITCH_IMG_HIGH - 1 || angle_ == SWITCH_IMG_HIGH2 - 1 && oldAngle_ == SWITCH_IMG_HIGH2) return 1;
    else if (angle_ == SWITCH_IMG_HIGH2 && oldAngle_ == SWITCH_IMG_HIGH2 - 1) return 2;
    else if (angle_ == SWITCH_IMG_LOW + 1 && oldAngle_ == SWITCH_IMG_LOW || angle_ == SWITCH_IMG_HIGH - 1 && oldAngle_ == SWITCH_IMG_HIGH) return 0;
    return null;
}

function setImgSrc(imgElem, fileName) {
    imgElem.src = fileName;
}

function initBeam(beamImg_, angle_) {
    var wh = getWidthHeight(angle_, GUN_SIZE);
    beamImg_.style.left = wh.width + "px";
    beamImg_.style.bottom = wh.height + "px";//setting pos
    beamImg_.style.visibility = "hidden";
    is_fired = false;

    drawPoints();//test
    enableButton(fireBtn);
}

function initSvgBeam(angle_) {
    var xy = getXYSvg(angle_, BEAM_SIZE * 2, 0, BEAM_SIZE);
    var beamPos = getXYSvg(angle_, GUN_SIZE, 0, GUN_SIZE);

    /*GUN_X_OFFSET = 350;
    SVG_GUN_WIDTH = 100;*/

    svgBeamOuter.style.width = BEAM_SIZE + "px";
    svgBeamOuter.style.height = BEAM_SIZE + "px";
    svgBeamOuter.style.border = "0 solid gray";
    svgBeamOuter.style.visibility = "hidden";
    //svgBeamOuter.style.background = "#ccc";
    if (angle_ >= 0) {
        svgBeamOuter.style.left = GUN_X_OFFSET + beamPos.x + "px";
        setBeamPointPos(xy.x, xy.y, true);
    }
    else {
        svgBeamOuter.style.left = GUN_X_OFFSET - BEAM_SIZE + beamPos.x + "px";
        setBeamPointPos(xy.x, xy.y, false);
    }
    svgBeamOuter.style.bottom = SVG_GUN_WIDTH - beamPos.y + "px";


    is_fired = false;

    drawPoints();//test
    enableButton(fireBtn);
}

function drawPoints() {
    var h3 = document.createElement("h3");
    h3.innerHTML = pointsCount;
    points.innerHTML = "";
    points.appendChild(h3);
}

function shoot(angle_) {
    console.log("shoot angle " + angle_);
    /*
        var wh2 = getWidthHeight(angle_, BEAM_SIZE);
        var width = wh2.width;
        beamImg_.style.width = width + "px";
        var height = wh2.height;
        beamImg_.style.height = height + "px";
        beamImg_.style.visibility = "visible";//todo:hide when needed
    */
    //initSvgBeam(angle_);
    svgBeamOuter.style.visibility = "visible";

    var x = sincoses1[angle_ + 90].x;
    var y = sincoses1[angle_ + 90].y;
    //console.log("got x: " + x);
    x *= BEAM_SIZE;
    y *= BEAM_SIZE;

    var tan = Math.tan(angle_ * Math.PI / 180);
    fx = 1 / tan; //what could be used in a formula f(x), y as function of x
    //console.log("fx is set to " + fx);
    //console.log("Tan is " + tan + " fx? " + fx);
    intervBeam = setInterval(function () {
        moveSvgBeam(x, y);
    }, intervBeam_);//extract
    is_fired = true;//todo: depend on pos of beam
}
/*
function moveBeam(beamImg_, stepX, stepY){
    stepX *= .9;
    stepY *= .9;//test to make path covered

    var px = parseInt(beamImg.style.left);//removing the "px" or similar from css
    var py = parseInt(beamImg.style.bottom);
    px += parseInt(stepX);
    py += parseInt(stepY);//pos x y
    beamImg_.style.left = px + "px";
    beamImg_.style.bottom = py + "px";
    //console.log(px);
    if(px > outerX || py > outerY){
        cancelBeam();
        initBeam(beamImg, angle);
        is_fired = false;
    }
}
*/

function moveSvgBeam(x, y) {
    //console.log("moveSvgBeam med x y: " + x + " " + y + " isFired: " + is_fired);

    x *= .9;
    y *= .9;//test to make path covered

    var px = parseInt(svgBeamOuter.style.left);//removing the "px" or similar from css
    var py = parseInt(svgBeamOuter.style.bottom);

    if (saveStats && is_fired) {
        var middleX = (px + (px + parseInt(x))) / 2;
        var middleY = (py + (py + parseInt(y))) / 2;

        var wp = windowPos.getCenterXY();
        //saving distance between beam and target
        stats.push(getDist(middleX, middleY, wp.x, wp.y));
    }

    px += parseInt(x);
    py += parseInt(y);//pos x y





    //console.log("new x: " + px);
    svgBeamOuter.style.left = px + "px";
    svgBeamOuter.style.bottom = py + "px";
    //console.log(px);

    var baseX = 0;
    if (x > 0) {//if shooting left TODO: try invert case
        baseX = px + BEAM_SIZE;
    }
    else {
        baseX = px;
    }
    //console.log("baseX " + baseX);    

    if (baseX > outerX || baseX < 0 || py > outerY) {
        cancelBeam();
        //initBeam(beamImg, angle);
        initSvgBeam(angle);
        is_fired = false;
    }
}

function cancelBeam() {
    clearInterval(intervBeam);
    is_fired = false;
}

function initTarget() {
    var targetHighest = BOARD_HEIGHT - 100; //600;
    //targetLowest = 170;//hight from "ground"

    //window_ is target - like a window for the beam to pass through

    window_.style.left = outerX + "px";
    var rand = Math.random();
    var diff = targetHighest - targetLowest;
    var y = rand * diff + targetLowest;



    window_.style.bottom = parseInt(y) + "px";
    //console.log("window_ bottom set to " + y + ", " + window_.style.bottom);
    var rand2 = Math.random();
    var diff2 = maxLen - minLen;
    var len = parseInt(rand2 * diff2 + minLen);//target width
    window_.style.width = len + "px";
    window_.style.visibility = "visible";
    window_.className = "";

    //for direction l/r

    if (parseInt(y) % 2 == 0) { T.dir = 'l'; }
    else { T.dir = 'r'; }
    T.altitude = y;
    T.width = len;

    if (T.dir == 'r') {
        T.posX = len * -1;//out left
    }
    else {
        T.posX = outerX;//out right
    }

    //moving
    intervTarget = setInterval(function () {

        var posx = parseInt(window_.style.left);


        if (saveStats) {
            windowPos.x1 = posx;
            windowPos.x2 = posx + len;
        }



        if (T.dir == 'r') {
            T.posX += parseInt(targetStep);
        }
        else {
            T.posX -= parseInt(targetStep);
        }
        posx -= parseInt(targetStep); //moving
        //window_.style.left = T.posX + "px"; //posx + "px"; //todo extract function
        T.div.style.left = T.posX + "px";
        var width = parseInt(window_.style.width);

        var posy = parseInt(window_.style.bottom);

        if (saveStats) {
            windowPos.y1 = posy;
            windowPos.y2 = posy + 1;//TODO: define height in variable
        }

        //collision check
        //1. is beam in same x
        var beamL = getElemLeft(svgBeamOuter);
        var beamR = getElemRight(svgBeamOuter);
        var beamBottom = getElemBottom(svgBeamOuter);
        var beamTop = getElemTop(svgBeamOuter);
        if (T.dir == 'l') {
            if (T.posX < parseInt(len) * -1) {//has passed over screen
                console.log("<0");
                clearInterval(intervTarget);
                initTarget();
                heartsCount--;
                removeLastChild(hearts);
                if (heartsCount == 0) {
                    makeBreak();
                    messageBanner("<h1>Game Over</h1>");
                }
                //setTimeout(function(){}, 300);            
            }
        }
        else if (T.dir == 'r') {
            if (T.posX > parseInt(BOARD_HEIGHT)) {//has passed over screen
                console.log(BOARD_HEIGHT);
                clearInterval(intervTarget);
                initTarget();
                heartsCount--;
                removeLastChild(hearts);
                if (heartsCount == 0) {
                    makeBreak();
                    messageBanner("<h1>Game Over</h1>");
                }
                //setTimeout(function(){}, 300);            
            }
        }
        if (AOverlapsB(beamL, beamR, posx, posx + width) && is_fired) {
            //2. get x for y (window)
            var x = getXFromY(posy, GUN_X_OFFSET); //x for y the height of the window
            //is x inbetween window x1, x2
            if (x >= posx && x <= posx + width) {
                //console.log("Crossing path x:" + x + ", posx1:" + posx + "posx2: " + (posx+width));
                if (beamBottom < posy && beamTop > posy) {
                    console.log("Hit x:" + x + ", posx1:" + posx + ", posx2: " + (posx + width));
                    pointsCount += parseInt(posy * targetStep) + len + angle; //height of target, speed of it, angle of gun
                    cancelBeam();
                    initSvgBeam(angle);
                    window_.className += " blow";
                    clearInterval(intervTarget);//moved from timeOuted function below because of error if shooting again after hit
                    if (targetStep <= MAX_TARGET_STEP) { increaseTargetSpeed() }

                    targTimeout = setTimeout(
                        function () {
                            //clearInterval(intervTarget); //moved up
                            initTarget();
                        }, WAIT_AFTER_HIT);
                    if (WAIT_AFTER_HIT > minHitDecay) { WAIT_AFTER_HIT -= 100; }
                    fx = 0;
                }
            }
            else {
                //console.log("Miss x:" + x + ", posx1:" + posx + "posx2: " + (posx+width));
            }
        }
    }, intervWindow_);
}

function increaseTargetSpeed() {
    targetStep += 0.5; //it should then be rounded to integer
}

function getElemBottom(elem) {
    var py = parseInt(elem.style.bottom);
    return py;
}

function getElemTop(elem) {
    var py = parseInt(elem.style.bottom);
    var height = parseInt(elem.style.height);
    return py + height;
}

function getFx(x) {
    return x * fx;
}

function getXFromY(y, xOffset) {
    if (typeof xOffset == "undefined") xOffset = 0;
    //console.log("getXFromY " + y + " and fx is " + fx);
    return y / fx + xOffset;
}

function getElemLeft(elem) {
    var px = parseInt(elem.style.left);
    return px;
}

function getSvgBeamLeft() {
    var px = parseInt(svgBeamOuter.style.left);
    return px;
}

function getElemRight(elem) {
    var px = parseInt(elem.style.left);
    var width = parseInt(elem.style.width);
    return px + width;
}

function getSvgBeamRight() {
    var px = parseInt(svgBeamOuter.style.left);
    var width = parseInt(svgBeamOuter.style.width);
    return px + width;
}

function AOverlapsB(aMin, aMax, bMin, bMax) {
    if (aMin > aMax || bMin > bMax) return false;

    var overlap = aMin < bMax && bMin < aMax;

    return overlap;// from https://stackoverflow.com/questions/13513932/algorithm-to-detect-overlapping-periods
}

function messageBanner(html, duration) {
    if (typeof duration === "undefined") {
        duration = 3500;
    }
    banner.innerHTML = "";
    banner.className = "showing";
    setTimeout(function () { banner.innerHTML = html }, 500);
    setTimeout(function () { banner.className = "" }, duration);
}

//brakes game
function makeBreak() {
    clearInterval(moveGunInterv);
    clearInterval(intervTarget);//todo: make startable
    clearTimeout(targTimeout);
    cancelBeam();
}

function drawOneHeart(id) {
    if (typeof id === "undefined") { id = ""; }
    var newHeart = document.createElement("img");
    //newHeart.src = heartImg;
    newHeart.id = id;
    newHeart.className = "heart_";
    setTimeout(function () {
        newHeart.className = "heart";

    }, 1000);
    //hearts.appendChild(newHeart);

    newHeart.addEventListener("click", function () {
        console.log(this);
    });

    var div = document.createElement("div");
    //div.innerHTML = '<svg width="33mm" height="23.67mm" version="1.1" viewBox="0 0 33 23.67" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,-273.33)"><path d="m16.5 296.36s15.964-10.643 15.964-17.561c-2e-6 -5.3215-7.9822-7.7162-15.964 0-7.9822-7.7162-15.964-5.3215-15.964 0 1e-7 6.918 15.964 17.561 15.964 17.561z" style="fill:#d68d00;stroke-opacity:.6338;stroke-width:1.071;stroke:#72be7d" class="heartSVG" /></g></svg>';

    /*<svg width="33mm" height="23.67mm" version="1.1" viewBox="0 0 33 23.67" xmlns="http://www.w3.org/2000/svg">
 <g transform="translate(0,-273.33)">
  <path d="m16.5 296.36s15.964-10.643 15.964-17.561c-2e-6 -5.3215-7.9822-7.7162-15.964 0-7.9822-7.7162-15.964-5.3215-15.964 0 1e-7 6.918 15.964 17.561 15.964 17.561z" style="fill:#d68d00;stroke-opacity:.6338;stroke-width:1.071;stroke:#72be7d"/>
 </g>
</svg>*/
    //div.innerHTML = '<svg width="36.7mm" height="28mm" version="1.1" viewBox="0 0 36.7 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><pattern id="pattern2591" patternTransform="matrix(10 0 0 10 106.93 163.56)" xlink:href="#Packedcircles"/><pattern id="Packedcircles" width="1" height="1.73205080756" patternTransform="translate(0) scale(10)" patternUnits="userSpaceOnUse"><circle cy=".5" r=".5"/><circle cx="1" cy=".5" r=".5"/><circle cx=".5" cy="1.366" r=".5"/><circle cx=".5" cy="-.36603" r=".5"/></pattern></defs><g transform="translate(0,-269)"><path d="m18.294 293.88s15.875-10.583 15.875-17.462c0-5.2916-7.9375-7.6729-15.875 0-7.9375-7.6729-15.875-5.2916-15.875 0 0 6.8792 15.875 17.462 15.875 17.462z" style="fill:#ff422a;stroke-width:4.865;stroke:url(#pattern2591)"/></g></svg>';

    //div.innerHTML = '<svg width="31.3mm" height="23.9mm" version="1.1" viewBox="0 0 31.3 23.9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><pattern id="pattern2591" patternTransform="matrix(8.5036 0 0 8.5036 90.927 183.5)" xlink:href="#Packedcircles"/><pattern id="Packedcircles" width="1" height="1.73205080756" patternTransform="translate(0) scale(10)" patternUnits="userSpaceOnUse"><circle cy=".5" r=".5"/><circle cx="1" cy=".5" r=".5"/><circle cx=".5" cy="1.366" r=".5"/><circle cx=".5" cy="-.36603" r=".5"/></pattern></defs><g transform="translate(0,-273.1)"><path d="m15.555 294.31s13.499-8.9996 13.499-14.849c0-4.4998-6.7497-6.5247-13.499 0-6.7497-6.5247-13.499-4.4998-13.499 0 0 5.8498 13.499 14.849 13.499 14.849z" style="fill:#ff422a;stroke-width:4.137;stroke:url(#pattern2591)"/></g></svg>';
    //div.innerHTML = '<svg width="29.4mm" height="21.9mm" version="1.1" viewBox="0 0 29.4 21.9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="linearGradient833"><stop offset="0"/><stop style="stop-opacity:0" offset="1"/></linearGradient><radialGradient id="radialGradient835" cx="15.555" cy="284.8" r="13.525" gradientTransform="matrix(2.0241 .54235 -.22684 .84657 48.675 35.26)" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient833"/></defs><g transform="translate(-.83298 -274.04)" style="stroke-width:2.4871;stroke:url(#radialGradient835)"><path d="m15.555 294.31s13.499-8.9996 13.499-14.849c0-4.4998-6.7497-6.5247-13.499 0-6.7497-6.5247-13.499-4.4998-13.499 0 0 5.8498 13.499 14.849 13.499 14.849z" style="fill:#ff422a;stroke-width:2.4871;stroke:url(#radialGradient835)"/></g></svg>';
    div.innerHTML = '<svg width="16.21mm" height="12mm" version="1.1" viewBox="0 0 16.21 12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="linearGradient833"><stop offset="0"/><stop style="stop-opacity:0" offset="1"/></linearGradient><radialGradient id="radialGradient835" cx="15.555" cy="284.8" r="13.525" gradientTransform="matrix(2.0241 .54235 -.22684 .84657 48.675 35.26)" gradientUnits="userSpaceOnUse" xlink:href="#linearGradient833"/></defs><g transform="matrix(.55 0 0 .55 -.44685 -150.69)" style="stroke-width:2.4871;stroke:url(#radialGradient835)"><path d="m15.555 294.31s13.499-8.9996 13.499-14.849c0-4.4998-6.7497-6.5247-13.499 0-6.7497-6.5247-13.499-4.4998-13.499 0 0 5.8498 13.499 14.849 13.499 14.849z" style="fill:#ff422a;stroke-width:2.4871;stroke:url(#radialGradient835)"/></g></svg>';
    hearts.appendChild(div);
}


function removeLastChild(container) {
    var lc = container.lastElementChild;
    container.removeChild(lc);
}

function disableButton(elem) {
    elem.disabled = true;
}
function enableButton(elem) {
    elem.disabled = false;
}

/*for x2, y2    */
function setGunPointPos(x, y) {
    //console.log("sGPP " + x + "," + y);
    //console.log(svgGun);
    svgGun.x2.baseVal.value = x;
    svgGun.y2.baseVal.value = y;
}

function setBeamPointPos(x, y, positiveAngle) {
    if (positiveAngle) {
        svgBeam.x2.baseVal.value = x;
        //base
        svgBeam.x1.baseVal.value = 0;
    }
    else {
        svgBeam.x2.baseVal.value = x + BEAM_SIZE;
        //base
        svgBeam.x1.baseVal.value = BEAM_SIZE;
    }
    svgBeam.y2.baseVal.value = y;
    svgBeam.y1.baseVal.value = BEAM_SIZE;
}

function calcSvgGunXPos(angle_, size, offset) {
    return Math.sin(angle_ / 360 * Math.PI * 2) * (size / 2) + offset;
}
function calcSvgGunYPos(angle_, size, offset) {
    return Math.cos(angle_ / 360 * Math.PI * 2) * (-size / 2) + offset;
}

function toggleSound(imgElem) {
    console.log("toggleSound");
    soundOn = !soundOn;

    var fileName = soundOn ? "sound_on_black.png" : "sound_off_black.png";

    imgElem.src = fileName;
    sound1.volume = sound1.volume == 1.0 ? 0.0 : 1.0;
}

function getDist(x1, y1, x2, y2) {

    var distX = x1 < x2 ? x2 - x1 : x1 - x2;
    var distY = y1 < y2 ? y2 - y1 : y1 - y2;

    var dist = Math.sqrt(distX + distY);
    return dist;
}

function presentStats() {
    var statsArea = document.querySelector("#statsArea");
    var len = stats.length;
    if(len == 0){
        alert("The 'stats' is empty");
    }
    for (var i = 0; i < len; i++) {
        /*var span = document.createElement("span");
        span.innerHTML = stats[i];
        statsArea.appendChild(span);*/
        var div = document.createElement("div");
        div.style.width = "10px";
        div.style.height = parseInt(stats[i]) + "px";
        statsArea.appendChild(div);
    }
}

function mouseDown() {
    board.className = "aiming";
    var mouseAng = getCrosshairAngle(mousePos.x, mousePos.y);
    //setGunAngle(parseInt(ang));//test

    intervAim = setInterval(function () {

        if (angle < mouseAng) {
            moveGun(1);
        }
        else if (angle > mouseAng) {
            moveGun(-1);
        }
        mouseDownTicks++;

    }, INTERV_MOUSE_AIM);
}

function mouseUp(fire) {
    clearInterval(intervAim);
    if (fire) {
        board.className = "";
        fireHit();
    }
}

function getCrosshairAngle(x, y) {
    //use Math.asin / acos (pos x / y)?
    console.log("getCrosshairAngle med x,y " + x + "," + y);
    //get dist x, y then divide
    var dx = x - GUN_X_OFFSET;
    var dy = BOARD_HEIGHT - y;

    console.log("dx,dy: " + dx + "," + dy);

    yx = dy / dx; //like fx

    if (yx == 1) { //45 deg
        return 45;
    }

    var right = yx >= 0;//aiming right side


    var grad = 0, asin = 0, acos = 0;
    var hyp = Math.sqrt(dx * dx + dy * dy);//hypotenusan

    var xKvot = dx / hyp;
    var yKvot = dy / hyp;

    asin = Math.asin(xKvot);

    grad = asin / (2 * Math.PI) * 360;
    console.log(grad);
    return Math.round(grad);
}

//test: to capture touch screen
//issue: might remove click event response
function touch2Mouse(e) {
    var theTouch = e.changedTouches[0];
    var mouseEv;
    switch (e.type) {
        case "touchstart": mouseEv = "mousedown"; break;
        case "touchend": mouseEv = "mouseup"; break;
        case "touchmove": mouseEv = "mousemove"; break;
        default: return;
    }
    var mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX,
        theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
    theTouch.target.dispatchEvent(mouseEvent);
    e.preventDefault();
}
