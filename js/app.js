function Animal(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}


function loadAnimals(){
// Retrive info from file with ajax
  $.ajax('/data/page-1.json', {method:'GET', dataType: 'JSON'})
    .then( eleObj => {
      eleObj.forEach(element => {
        console.log(new Animal(element));
      });
    })
}




// retrieve the data from the file, but until is loaded
$().ready(() => {
  console.log ('Page loaded');
  loadAnimals();
}
)
