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
  // const $newSection = $('<section></section>');
  const $newSection = $(`<section id=${this.keyword}></section>`);
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
}

// imageClone.attr('class', this.keyword);

function populateArrKeywords(keyword) {
  if( !arrKeywords.includes(keyword) ) {
    arrKeywords.push(keyword);
  }
}

function loadAnimals(){
// Retrive info from file with ajax
  $.ajax('data/page-1.json', {method:'GET', dataType: 'JSON'})
    .then( eleObj => {
      eleObj.forEach(element => {
        (new Animal(element).render());
        populateArrKeywords(element.keyword);
      });
      populateDropbox();
    })
}

function populateDropbox() {
  arrKeywords.forEach(key => {
    let $option = $(`<option class="${key}">${key}</option>`);
    $('#list').append($option);
  });
}

// Event listener

$(() => {
  $('select').on('change', function() {
    // console.log(this.value);
    if (this.value === 'all') {
      $('section').show();
      $('#photo-template').hide();
    } else if (this.value !== 'default') {
      $('section').hide();
      $(`section[id="${this.value}"]`).show();
    }
  });
});

// retrieve the data from the file, but until is loaded
$().ready(() => {
  console.log ('Page loaded');
  loadAnimals();
});

