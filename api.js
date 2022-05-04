let currentPage = localStorage.currentPage ?? "https://rickandmortyapi.com/api/character";
let nextPage = localStorage.nextPage ?? null;
let prevPage = localStorage.prevPage ?? null;
const lista = document.getElementById("lista");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

function gerarLista(){
  nextButton.disabled = nextPage == null;
  prevButton.disabled = prevPage == null;
  lista.innerHTML = "";

  for(let i = 0; i < character.length; ++i){
    const li = document.createElement("li");
    const txt = document.createTextNode(
      `Nome: ${character[i].name} - Especie: ${character[i].species} - Gênero: ${character[i].gender}`
    );
    li.appendChild(txt);
    lista.appendChild(li);
  }
}

const fetchCharacter = () => {
  fetch("https://rickandmortyapi.com/api/character");
    .then((res) => res.json())
    .then((data) => {
      people = data.results;
      gerarLista();
    });
};
  const goToNextPage = () => {
    currentPage = nextPage;
    nextButton.disabled = true;
    fetchCharacter();
  }

  const goToPrevPage = () => {
    currentPage = prevPage;
    prevButton.disabled = true;
    fetchCharacter();
  }

  nextButton.onclick = goToNextPage;

  fetchCharacter();
  gerarLista();
}