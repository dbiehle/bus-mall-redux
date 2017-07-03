'use strict';

var products = [];
var imgParentElement = document.getElementById('imageArea');
var randomImage = 0;

var Products = function(imgName, fileName) {
  this.imgName = imgName;
  this.filepath = 'img/' + fileName;
  this.numShown = 0;
  this.numClicks = 0;
};

var allImageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

for (var i = 0; i < allImageNames.length; i++) {
    // take extension off image names
  var dotArray = allImageNames[i].split('.');
  var prodName = dotArray[0];
    // and capitalize first letter
  var capProdName = prodName.charAt(0).toUpperCase() + prodName.slice(1);
  prodName = new Products(capProdName, allImageNames[i]);
  products.push(prodName);
}

// get 3 random images from img folder and display them on index.html
var nowShowing = [];
var lastShowing = [];
for (var j = 0; j < 3; j++) {
  randomImageGenerator();
  // if the nowShowing array DOES include any objects with the same imgName, re-run the randomImageGenerator function
  //    TODO: make sure images are not duplicates of previous 3 images
  if (nowShowing.indexOf(products[randomImage]) !== -1) {
    randomImageGenerator();
  }
  nowShowing.push(products[randomImage]);
  var selectedImage = products[randomImage].filepath;
  var imgElement = document.createElement('img');
  imgElement.setAttribute('src', selectedImage);
  imgParentElement.appendChild(imgElement);
}

function randomImageGenerator() {
  randomImage = Math.floor(Math.random() * products.length);
}


// TODO: store how many times each image is shown

// TODO: take a click on one of those images (event listener/handler)
//    TODO: store how many clicks each image gets

// TODO: show 3 new random images

// TODO: after 25 clicks, turn off event listener
//    TODO: display list of products with number of clicks for each '3 votes for Banana Slicer'
