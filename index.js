const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const music = document.getElementById("music");
const startButton = document.getElementById("start-button");
let animationStarted = false;

startButton.addEventListener("click", function() {
    music.play(); 
    if (!animationStarted) {
    animationStarted = true;
    window.requestAnimationFrame(draw);
    }
    });

var images = [];
var minImages = 5; 
var maxImages = 20; 
var numImages = Math.floor(Math.random() * (maxImages - minImages + 1)) + minImages; 
var imageWidth = 40;
var imageHeight = 40;
var maxSpeed = 1; 
var minSpeed = 0.5; 


for (var i = 0; i < numImages; i++) {
  var image = new Image();
  image.width = imageWidth;
  image.height = imageHeight;
  image.src = ["paper.png", "scissor.png", "rock.png"][i % 3]; 
  images.push({
    image: image,
    x: Math.random() * (canvas.width - imageWidth),
    y: Math.random() * (canvas.height - imageHeight),
    dx: Math.random() * (maxSpeed - minSpeed) + minSpeed,
    dy: Math.random() * (maxSpeed - minSpeed) + minSpeed
  });
}

function drawImages() {
  for (var i = 0; i < numImages; i++) {
    var image = images[i].image;
    var x = images[i].x;
    var y = images[i].y;
    ctx.drawImage(image, x, y, imageWidth, imageHeight);
  }
}

function collisionDetection() {
    for (var i = 0; i < numImages; i++) {
      for (var j = i + 1; j < numImages; j++) {
        if (images[i].x < images[j].x + imageWidth && images[i].x + imageWidth > images[j].x && images[i].y < images[j].y + imageHeight && images[i].y + imageHeight > images[j].y) {
  
          var image1 = images[i].image.src.split('/').pop();
          var image2 = images[j].image.src.split('/').pop();
  
          if ((image1 === 'paper.png' && image2 === 'scissor.png') || (image1 === 'scissor.png' && image2 === 'paper.png')) {
            images[i].image.src = 'scissor.png';
            images[j].image.src = 'scissor.png';
          } else if ((image1 === 'scissor.png' && image2 === 'rock.png') || (image1 === 'rock.png' && image2 === 'scissor.png')) {
            images[i].image.src = 'rock.png';
            images[j].image.src = 'rock.png';
          } else if ((image1 === 'rock.png' && image2 === 'paper.png') || (image1 === 'paper.png' && image2 === 'rock.png')) {
            images[i].image.src = 'paper.png';
            images[j].image.src = 'paper.png';
          }
  
          var tempDx = images[i].dx;
          var tempDy = images[i].dy;
          images[i].dx = images[j].dx;
          images[i].dy = images[j].dy;
          images[j].dx = tempDx;
          images[j].dy = tempDy;

          
        }
      }
    }
}

function checkWinner() {
    let paperCount = 0;
    let rockCount = 0;
    let scissorCount = 0;
    for (let i = 0; i < numImages; i++) {
      if (images[i].image.src.split('/').pop() === 'paper.png') {
        paperCount++;
      } else if (images[i].image.src.split('/').pop() === 'rock.png') {
        rockCount++;
      } else if (images[i].image.src.split('/').pop() === 'scissor.png') {
        scissorCount++;
      }
    }
    if (paperCount === numImages) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Winner Paper!", canvas.width / 2, canvas.height / 2);
    } else if (rockCount === numImages) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Winner Rock!", canvas.width / 2, canvas.height / 2);
    } else if (scissorCount === numImages) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Winner Scissor!", canvas.width / 2, canvas.height / 2);
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImages();
    collisionDetection();
    checkWinner();
    for (let i = 0; i < numImages; i++) {
    if (images[i].x + images[i].dx > canvas.width - imageWidth || images[i].x + images[i].dx < 0) {
    images[i].dx = -images[i].dx;
    }
    if (images[i].y + images[i].dy > canvas.height - imageHeight || images[i].y + images[i].dy < 0) {
    images[i].dy = -images[i].dy;
    }
    images[i].x += images[i].dx;
    images[i].y += images[i].dy;
    }
    
    if (animationStarted) {
    window.requestAnimationFrame(draw);
    }
}


window.requestAnimationFrame(draw);   