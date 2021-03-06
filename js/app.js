'use strict';

var imgParentElement = document.getElementById('imageArea');
var randomImage = 0;
var totalClicks = getLocalStorage('totalClicks');
if (!totalClicks) totalClicks = 0;
var maxClicks = 25;
var nowShowing = [];
var lastShowing = getLocalStorage('lastShowing');
if (!lastShowing) lastShowing = [];

var Products = function(imgName, fileName) {
  this.imgName = imgName;
  this.filepath = 'img/' + fileName;
  this.timesShown = 0;
  this.timesClicked = 0;
};

var allImageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];


var productsArray = getLocalStorage('products');
if (!productsArray) {
  productsArray = [];
  addProductsToArray();
}

show3RandomImages();

imgParentElement.addEventListener('click', function(event) {
  if (totalClicks >= 1) {
    getLocalStorage('totalClicks');
  }
  totalClicks++;
  setLocalStorage('totalClicks', totalClicks);
  var clickedId = event.target.getAttribute('id');
  for (var i = 0; i < productsArray.length; i++) {
    if (productsArray[i].imgName == clickedId) {
      productsArray[i].timesClicked += 1;
      setLocalStorage('products', productsArray);
    }
  }
  lastShowing = nowShowing;
  setLocalStorage('lastShowing', lastShowing);
  nowShowing = [];
  remove3Images();
  if (totalClicks < maxClicks) {
    show3RandomImages();
  } else {
    addChart();
  }
});


///////////////////////////////////////
// FUNCTIONS

function setLocalStorage(key, value){
  var stringifiedValues = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValues);
  return stringifiedValues;
}

function getLocalStorage(key){
  var stringifiedValues = localStorage.getItem(key);
  var parsedValues = JSON.parse(stringifiedValues);
  return parsedValues;
}

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

function remove3Images() {
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
  imgParentElement.removeChild(imgParentElement.lastChild);
}

function show3RandomImages() {
  for (var j = 0; j < 3; j++) {
    randomImageGenerator();
      // while the nowShowing array or the lastShowing array INCLUDE any objects with the same imgName, re-run the randomImageGenerator function
    while (nowShowing.indexOf(productsArray[randomImage]) !== -1 || lastShowing.indexOf(productsArray[randomImage]) !== -1) {
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

function randomImageGenerator() {
  randomImage = Math.floor(Math.random() * productsArray.length);
}

function addChart() {
  var chartLabels = [];
  var chartClicks = [];
  var chartShown = [];
  for (var i = 0; i < productsArray.length; i++) {
    chartLabels.push(productsArray[i].imgName);
    chartClicks.push(productsArray[i].timesClicked);
    chartShown.push(productsArray[i].timesShown);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  /* eslint-disable no-unused-vars */
  var myChart = new Chart(ctx, {
  /* eslint-enable no-unused-vars */
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Number of Times Chosen',
        data: chartClicks,
        backgroundColor: 'rgba(203, 75, 41, 0.5)',
        borderColor: 'rgba(203, 75, 41,1)',
        borderWidth: 1
      }, {
        label: 'Number of Times Shown',
        data: chartShown,
        backgroundColor: 'rgba(41, 154, 203, 0.5)',
        borderColor: 'rgba(41, 154, 203,1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
