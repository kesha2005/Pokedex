const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');



document.querySelectorAll(".list-item").forEach(el => el.addEventListener("click", function(event) {
  handleListItemClick(event);
}, true));

const TYPES = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy' 
]; 

let prevUrl = null;
let nextUrl = null;






//Function For Mr Whalen
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove('normal');
  mainScreen.classList.remove('fighting');
  
};



const fetchPokeList = url => {
  fetch(url)
  .then(res => res.json())
  .then(data =>{
  ;
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;
  
    pokeListItems.forEach((pokeListItem, i) => {
      const resultData = results[i];
    
  
    if (resultData) { const { name, url } = resultData;
    const urlArray = url.split('/');
    const id = urlArray[urlArray.length - 2];
      pokeListItem.textContent = id + '.' + capitalize(name);
    } else{
      pokeListItem.textContent = '';
    }
    })


    const mytext = document.getElementById("mytext");
    
    document.querySelectorAll(".list-item").forEach(el => 
      el.classList.remove('found')
    );

    if (mytext.value.trim() != '') {
      const filtered = Array.from(pokeListItems).filter(item => item.innerHTML.toLowerCase().indexOf(mytext.value.toLowerCase()) > -1);
      if (filtered.length) {
        filtered.forEach(el => el.classList.add('found'));
      }
    }




    document.getElementById("mysearch").addEventListener("click", function(event) {

      const mytext = document.getElementById("mytext");
    
      document.querySelectorAll(".list-item").forEach(el => 
        el.classList.remove('found')
      );
  
      document.querySelectorAll(".list-item").forEach(el => 
        el.classList.remove('found')
      );
      
      const filtered = Array.from(pokeListItems).filter(item => 
        item.innerHTML.toLowerCase().indexOf(mytext.value.toLowerCase()) > -1);
      if (filtered.length) {
        filtered.forEach(el => el.classList.add('found'));
      }
      
    }, true);

    
  });
};


const fetchPokeData = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(res=> res.json())
.then(data => {

  var main = document.querySelector(".main-screen");
  if (main) {
    main.setAttribute("class", "main-screen")
    //main.classList.remove('grass');
    //main.classList.remove('bug');
    main.classList.add(data.types[0].type.name);

  }


  // .
  console.log('data', data.types[0].type.name)
resetScreen();

  const dataTypes = data['types'];
  const dataFirstType = dataTypes [0];
  const dataSecondType = dataTypes[1];
  pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
  if (dataSecondType) {
    
   pokeTypeTwo.classList.remove('hide');
    pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name'])
  } else {
    pokeTypeTwo.classList.add('hide');
   pokeTypeTwo.textContent = '';
  }
  mainScreen.classList.add(dataFirstType['type']['name']);
mainScreen.classList.remove('hide');

 pokeName.textContent = capitalize(data['name']); 
 pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
 pokeWeight.textContent = data['weight'];
 pokeHeight.textContent = data['height'];


pokeFrontImage.src = data['sprites']['front_default']  || '';
pokeBackImage.src = data['sprites']['back_default'];

});
}



const handleLeftButtonClick = () => {
  if (prevUrl) {
    fetchPokeList(prevUrl);
  }

  };
  


const handleRightButtonClick = () => {
if (nextUrl) {
  fetchPokeList(nextUrl);
}
};


const handleListItemClick = (e) => {
  if (!e.target) return; 

  const listItem = e.target;
  if (!listItem.textContent) return;

const id = listItem.textContent.split('.')[0];
fetchPokeData(id);

};




// Left Side Data Mr Whalen

 


// Right Side Data Mr Whalen



// Utilizing Mr Whalens Event Listeners

leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);



//for (const pokeListItem of pokeListItems) {
//  pokeListItem.addEventListener('click', handleListItemClick)
//}

//Start The PokeAPI app for Mr Whalen

fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');