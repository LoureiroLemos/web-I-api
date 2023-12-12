async function getAllPosts(pg) {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${pg}`);
      const data = await res.json();
  
      if (!res.ok) {
        console.log(data.description);
        return;
      }
  
      const characters = data.results;
  
      characters.forEach((element) => {
        console.log(
          `Id do Personagem: ${element.id} \nNome: ${element.name} \nEspécie: ${element.species} \nStatus: ${element.status} \nLocalização: ${element.location.name}`
        );
  
        var container = document.querySelector(".container");
        let card = `
          <div class="card">
            <div class="card-img">
              <figure>
                <img src="${element.image}" alt="Imagem do ${element.name}" />
              </figure>
            </div>
            <div class="card-conteudo">
                <h2> Id: ${element.id}</h2>
                <h2>Nome: ${element.name}</h2>
                <p>
                    Espécie: ${element.species}
                </p>
                <p> Localização: ${element.location.name} </p>
            </div>
          </div>
        `;
        container.innerHTML += card;
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  var maisPersonagens = document.querySelector("#maisPersonagens");
  var menosPersonagens = document.querySelector("#menosPersonagens");
  getAllPosts();
  
  let pg = 1;
  maisPersonagens.addEventListener("click", (event) => {
    pg = pg + 1;
    getAllPosts(pg);
    let container = document.querySelector(".container");
    container.innerHTML = "";
    
    event.preventDefault();
  });

  menosPersonagens.addEventListener("click", (event) => {
    pg = pg - 1;
  
    getAllPosts(pg);
    let container = document.querySelector(".container");
    container.innerHTML = "";
    
    event.preventDefault();
  });

  getAllPosts();






















