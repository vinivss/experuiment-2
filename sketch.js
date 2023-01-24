'use strict';
var mode = 1;
var img;
var sound;
var started = false;

function preload()
{
  img = loadImage('data/pinky.png');
  sound = loadSound('data/Song.mp3');
}
function setup() {
  createCanvas(603, 873);
   print(img.width + ' • ' + img.height);
}

function draw() {
  background(255);
  
  var mouseDeltaX = map(mouseX, 0, width, 0.05, 1);
  var mouseDeltaY = map(mouseY, 0, height, 0.05, 1);

  for(var i = 0; i < img.width; i++)
    {
      for(var j =0; j < img.height; j++)
        {
          var tileWidth = width / img.width;
          var tileHeight = height / img.height;
          var posX = tileWidth* i;
          var posY = tileHeight * j;
          
          img.loadPixels();
          var col = color(img.get(i, j));
          var greyscale = round(red(col) * 0.222 + green(col) *0.707 + blue(col) *           0.071);
          
          switch(mode)
            {
                case 1:
                var w1 = map(greyscale,0, 255, 15 , 0.1);
                stroke(0);
                strokeWeight(w1 * mouseDeltaX);
                line(posX, posY, posX + 5, posY + 5);
                break;
                
                case 2:
                fill(0);
                noStroke();
                var r2 = 1.1824 * sqrt(tileWidth * tileWidth * (1 - greyscale /255));
                r2 *= mouseDeltaX * 3;
                ellipse(posX, posY, r2, r2);
                break;
                
                case 3:
                var l3 = map(greyscale, 0, 255, 10, 0);
                l3 *= mouseDeltaX;
                stroke(0);
                strokeWeight(10* mouseDeltaY);
                line(posX, posY, posX + l3, posY + l3);
                break;
                
                case 4:
                stroke(0);
                var w4 = map(greyscale, 0 , 255, 10, 0);
                strokeWeight(w4 * mouseDeltaX + 0.1);
                var l4 = map (greyscale, 0 , 255, 35 , 0);
                l4 *= mouseDeltaY;
                break;
                
                push();
                translate(posX, posY);
                rotate(greyscale / 255 * PI);
                line(0, 0, 0 + l4, 0 + l4);
                pop();
                break;
                
                case 5:
                
                  var w5 = map(greyscale,0,255, 5 , 0.2);
                  strokeWeight(w5 * mouseDeltaY + 0.1);
                  var c2 = color(img.get(min(i +1, img.width - 1), j))
                  stroke(c2);
                  var greyscale2= floor(red(c2) *0.222 + green(c2) * 0.707 + blue(c2) *0.071);
                  var h5 = 50 * mouseDeltaX;
                  var d1 = map(greyscale,0,255, h5, 0);
                  var d2 = map(greyscale2,0,255, h5, 0);
                  line(posX - d1, posY + d1, posX + tileWidth - d2, posY +d2);
                  break;
                
                
                case 6:
                
                  var w6 = map(greyscale, 0, 255, 25, 0);
                  noStroke();
                  fill(col);
                  ellipse(posX, posY, w5 * mouseDeltaX, w6 * mouseDeltaX);
                  break;
                
                case 7:
                
                  var tileCountX = mouseDeltaX / 3 +1;
                  var tileCountY = mouseDeltaY / 3 +1;
                  
                  var stepX = width / tileCountX;
                  var stepY = height / tileCountY;
                  
                  image(img, i, j, stepX, stepY);
                  break;
                
                
                case 8:
                                     
                  started = startEight(started);
                
                  
                  angle += 0.01;
                push()
                  translate(width / 2, height /2);
                  rotate(frameCount/60);
                 image(img,0, 0, 150, 150);
                pop();

                  break;
                
                case 9:
                
                  image(img, width /2, height /2);
                  
                  var x1 = floor(random(width));
                  var y1 = 50;
                  
                  var x2 = round(x1 + random(-7, 7));
                  var y2 = round(y1 + random(-5, 5));
                  
                  var w = floor(random(10, 40));
                  var h = height -100;
                  
                  set(x2, y2, get(x1, y1, w, h));
                  break;
                
                
            }
        }
    }
}
      function startEight(started)
{
  if( started == false)
    {
               
              sound.loop();
      started = true;
    }
  return started;
  
}
      function keyReleased()
      {
        if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
        if(key == ('1'))  mode = 1;
        if(key == ('2')) mode = 2;
        if(key == ('3')) mode = 3;      
        if(key == ('4')) mode = 4;
        if(key == ('5')) mode = 5;
        if(key == ('6')) mode = 6;
        if(key == ('7')) mode = 7;
        if(key == ('8')) mode = 8;
        if(key == ('9')) mode = 9;
      
         
      }