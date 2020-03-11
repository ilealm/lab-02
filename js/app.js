'use strict'

// Global variables
let arrKeywords = [];




// Constructor function

function Animal(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;

}

Animal.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
}
function populateArrKeywords(keyword){
  arrKeywords.includes(keyword) 

}

function loadAnimals(){
// Retrive info from file with ajax
  $.ajax('/data/page-1.json', {method:'GET', dataType: 'JSON'})
    .then( eleObj => {
      eleObj.forEach(element => {
        (new Animal(element).render());
        populateArrKeywords(element.keyword);
      });
    })
}




// retrieve the data from the file, but until is loaded
$().ready(() => {
  console.log ('Page loaded');
  loadAnimals();
}
)
