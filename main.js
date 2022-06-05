const API = "https://api.thecatapi.com/v1/breeds";
let cats;

async function start() {
  const response = await fetch(API);
  const data = await response.json();
  cats = data;
  createBreedList(data);
}

function createBreedList(breeds) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
     <option>Choose your favorite cat breed</option>
        ${breeds
          .map(function (breed) {
            return `<option>${breed.name}</option>`;
          })
          .join("")}
  </select>
  `;
}

async function loadByBreed(breedName) {
  if (breedName != "Choose your favorite cat breed" || !breedName) {
    const selectedCat = cats.filter((cat) => cat.name === breedName);
    let id = selectedCat.map((cat) => cat.id);

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
    );
    const data = await response.json();
    // Think it over, 'cause I don't like this hardcoded implementation but I still need to handle this array of objects issue
    createImage(data[0]);
  }
}

function createImage(obj) {
  document.getElementById("photo").innerHTML = `
  <img src=${obj.url} alt="">
  `;
}

start();
