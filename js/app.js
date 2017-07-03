'use strict';

var productsArray = [];
var imgParentElement = document.getElementById('imageArea');
var randomImage = 0;
var totalClicks = 0;
var maxClicks = 5;
var nowShowing = [];
var lastShowing = [];

var Products = function(imgName, fileName) {
  this.imgName = imgName;
  this.filepath = 'img/' + fileName;
  this.timesShown = 0;
  this.timesClicked = 0;
};

var allImageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

addProductsToArray();


// get 3 random images from img folder and display them on index.html
function show3RandomImages() {
  for (var j = 0; j < 3; j++) {
    randomImageGenerator();
      // if the nowShowing array or the lastShowing array DOES include any objects with the same imgName, re-run the randomImageGenerator function
    if (nowShowing.indexOf(productsArray[randomImage]) !== -1 || lastShowing.indexOf(productsArray[randomImage]) !== -1) {
      randomImageGenerator();
    }
    nowShowing.push(productsArray[randomImage]);
    productsArray[randomImage].timesShown += 1;
    var selectedImage = productsArray[randomImage].filepath;
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', selectedImage);
    imgElement.setAttribute('id', productsArray[randomImage].imgName);
    imgParentElement.appendChild(imgElement);
  }
}

show3RandomImages();

// TODO: after 25 clicks, turn off event listener
imgParentElement.addEventListener('click', function(event) {
  console.log(totalClicks);
  totalClicks += 1;
  var clickedId = event.target.getAttribute('id');
  for (var i = 0; i < productsArray.length; i++) {
    if (productsArray[i].imgName == clickedId) {
      productsArray[i].timesClicked += 1;
    }
  }
  lastShowing = nowShowing;
  nowShowing = [];
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
  show3RandomImages();
});

//    TODO: display list of products with number of clicks for each '3 votes for Banana Slicer'

// create objects of all of the products and store them in an array
function addProductsToArray() {
  for (var i = 0; i < allImageNames.length; i++) {
      // take extension off image names
    var dotSplit = allImageNames[i].split('.');
    var prodName = dotSplit[0];
      // and capitalize first letter
    var capProdName = prodName.charAt(0).toUpperCase() + prodName.slice(1);
    prodName = new Products(capProdName, allImageNames[i]);
    productsArray.push(prodName);
  }
}

function randomImageGenerator() {
  randomImage = Math.floor(Math.random() * productsArray.length);
}
