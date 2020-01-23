var capture;
var tracker;
var w = 640,
    h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('Capture is ready')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
    //createCanvas(w, h);

}

function draw() {

    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }

    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var leftCheek = createVector(positions[0][0], positions[0][1]);
        var rightCheek = createVector(positions[14][0], positions[14][1]);
        var bottomChin = createVector(positions[7][0], positions[7][1]);

        var smile = mouthLeft.dist(mouthRight);
        var faceWidth = leftCheek.dist(rightCheek);
        var distanceToChin = bottomChin.y - mouthLeft.y;
        //var smileStrength = distanceToChin / 100.00;

        var ratio = smile / faceWidth;

        rect(20, 20, smile * ratio * 10, 20);
        //text(smile * ratio * 10, 40, 80);
        //text(ratio, 40, 110);
        if (smile * ratio * 10 >= 250) {
          text("Are you happy?", 40, 140);
        }

    }

    //ellipse(50, 50, 80, 80);
}
