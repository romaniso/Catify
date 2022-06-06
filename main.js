const API = "https://api.thecatapi.com/v1/breeds";
let cats;

async function start() {
  // implement catch /try
  try {
    const response = await fetch(API);
    const data = await response.json();
    cats = data;
    createBreedList(data);
  } catch (e) {
    console.log(
      "Something went wrong :( Maybe, you've lost your Internet connection..."
    );
  }
}

function createBreedList(breeds) {
  document.getElementById("breed").innerHTML = `
  <select class="select" onchange="loadByBreed(this.value)">
     <option>Choose your favorite cat</option>
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
  const { url: image } = obj;
  const info = obj.breeds[0];
  const {
    origin,
    description,
    name,
    temperament,
    life_span,
    child_friendly,
    energy_level,
  } = info;

  document.getElementById("photo").innerHTML = `
  <img src=${image} alt="a lovely kitty">
  `;
  document.getElementById("description").innerHTML = `
  <h2>Hello human! I am ${name} Cat</h2>
  <p>I come from ${origin}, find out something about me...</p>
  <p>${description}</p>
  <p>I am ${temperament.toLowerCase()} kitty!</p>
  <p>I can live for ${life_span} years!</p>
  <p>${amIfriendlytoKids(child_friendly)}</p>
  <p>${amIenergeticKitty(energy_level)}</p>
  `;

  function amIfriendlytoKids(child_friendly) {
    if (child_friendly === 0)
      return "Unfortunately, I hate children. Consider this fact!";
    else if (child_friendly === 1)
      return "I am not a big fan of kids, but nevermind...";
    else if (child_friendly === 2) return "I don't mind kids.";
    else if (child_friendly === 3) return "I get along with kids :)";
    else if (child_friendly === 4) return "I like kids!";
    else if (child_friendly === 5) return "I love kids!";
  }

  function amIenergeticKitty(energy_level) {
    if (energy_level === 0)
      return "I am extremely lazy cat! You won't play with me all day! Maybe from time to time...";
    else if (energy_level === 1)
      return "I don't like playing but I can fool around occasionally..";
    else if (energy_level === 2)
      return "In general, I like running and I may break a vase or two quite often.";
    else if (energy_level === 3)
      return "I am quite energetic kitty. You should often play with me! ";
    else if (energy_level === 4)
      return "I am energizer! You have to keep an eye on me. Otherwise, I'll destroy your house human!";
    else if (energy_level === 5)
      return "You cannnot control me! I swear you'll freak out with me! I am extremely energetic kitty! ";
  }
}

start();
