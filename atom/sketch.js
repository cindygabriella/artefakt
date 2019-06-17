var data = [];
var ready = false;

function setup() {
  d3.csv("Country_Trends.csv", function(d) {
        return {
        year: +d.year,
        Record: d.Record,
        Total: +d.Total
      };
    }).then(function(csv) {
      data = csv;
      ready = true;
    });

  createCanvas(windowWidth, windowHeight);
  textSize(10);

  // noLoop();
  //pixelDensity(10);


}

function draw() {
  if (!ready) {
    background(255, 0, 0);
    noStroke();
    return;
  } else {
    background(255);
  }

  var d,x,y,w,h;

  noStroke();
  fill(80,80,200);

  for(var i = 0; i < data.length; i++) {
     d = data[i];
     x = 10;
     y = (height/d.year)+10;
     w = (width/map(d.Total, 7051336451, 20611944995, 0, 100));
     h = (height*(i/data.length))-5;


     push();                    // <- push a drawing context
     translate(x,y);            // <- move to position
     rect(0,0,w,h);             // <- draw a rectangle
     fill(255);                 // <- change colors
     text(d.Record,10,h/2);      // <- draw the label
     pop();                     // <- reset the drawing context
   }

        // test slider
        yearSlider = createSlider(d.year);
        yearSlider.position(300, 300);

        const year = yearSlider.value();
        text('year', yearSlider.x * 2 + yearSlider.width, yearSlider.height);
        // text(str, x, y, [x2], [y2])
        rect(year);
}
