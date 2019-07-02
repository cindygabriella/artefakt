var data = [];
var ready = false;

function setup() {
  d3.csv("Country_Trends.csv", function (d) {
    return {
      year: +d.year,
      Record: d.Record,
      Total: +d.Total
    };
  }).then(function (csv) {
    //einen der beiden records filtern, so dass es pro 
    //jahr nur einen eintrag gibt
    data = csv.filter(function (d) {
      return d.Record == 'BiocapTotGHA';
    });
    console.log('data');
    console.log(data);
    ready = true;
    redraw();
  });

  createCanvas(windowWidth, windowHeight);
  textSize(10);

  noLoop();
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

  var d, x, y, w, h;

  noStroke();
  fill(80, 80, 200);
  stroke(255);
  
  //total als Y-Achse, die Jahre als X-Achse.
  //Maximum Total finden
  var TotalMin = d3.min(data, function (d) {
    return d.Total;
  });
  //Minimum total finden
  var TotalMax = d3.max(data, function (d) {
    return d.Total;
  })
  //Kleinses Jahr finden
  var yearMin = d3.min(data, function (d) {
    return d.year;
  });
  //Grösstes Jahr finden
  var yearMax = d3.max(data, function (d) {
    return d.year;
  });
  //Anzhal Jahre rechnen
  var yearCount = yearMax - yearMin;
  for (var i = 0; i < data.length; i++) {
    d = data[i];

    //Jahr auf die x-Achse mappen
    x = map(d.year, yearMin, yearMax, 0, width);
    //y = (height / d.year) + 10;

    //total auf die y-Achse Mappen
    y = map(d.Total, TotalMin, TotalMax, 0, 100);

    //total auf y-Achse mappen, alternative Variante
    //y = map(d.Total, 0, TotalMax, 0, 100);

    //Breite des Balkens
    w = width / yearCount;
    //w = (width / map(d.Total, 7051336451, 20611944995, 0, 100));
    //h = (height * (i / data.length)) - 5;

    push();                    // <- push a drawing context
    //translate(x, y);        // <- move to position
    //rect(0, 0, w, h);    
    rect(x, 0, w, y);           // <- draw a rectangle
    fill(255);                 // <- change colors

    text(d.Record, 10, h / 2);  // <- draw the label
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
