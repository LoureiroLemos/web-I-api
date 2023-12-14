const form = document.getElementById('personagem-form');
const container = document.querySelector(".container")


//método POST
const createPost = async (novoPostJSON) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: novoPostJSON,
    });

    const data = await res.json();
    return data;

    if (!res.ok) {
      console.log(data.description);
      return;
    }

  } catch (error) {
    console.log(`Erro - ${error}`);
  }

};

const deletePost = async (id) => {
  try {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, 
      {
      method: 'DELETE',
      }
  );

  const data = await res.json();

  if (!res.ok) {
      console.log(data.description);
      return;
  }

  console.log(data);

  } catch (error) {
  console.log(`Erro - ${error}`);
  }
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nome = form.querySelector('#nome').value.trim();
      
    container.innerHTML = '';
  
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`);
      
      if (!res.ok) {
        throw new Error('Erro ao buscar personagens.');
      }
  
      const data = await res.json();
  
  
      data.results.forEach((personagem) => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        const img = document.createElement('img');
        img.src = personagem.image;
        img.alt = `Imagem de ${personagem.name}`;
        card.appendChild(img);
  
        const conteudo = document.createElement('div');
        conteudo.classList.add('card-conteudo');
  
        const h2 = document.createElement('h2');
        h2.textContent = `Nome: ${personagem.name}`;
        conteudo.appendChild(h2);
  
        const divBtn = document.createElement('div');
        divBtn.classList.add('btn-container');

        const btnPost = document.createElement('button');
        btnPost.textContent = 'Mostrar informações';
        btnPost.id = `btnPost-${personagem.id}`;
        divBtn.appendChild(btnPost);
        
        card.appendChild(conteudo);
        card.appendChild(divBtn);
        container.appendChild(card);

        btnPost.addEventListener('click', async () => {
          console.log(`clicou em mostrar informações do personagem ${personagem.name}`);

          let novoPost = {
            userId: `${personagem.id}`,
            title: `Status: ${personagem.status}`,
            body: `Last known location: ${personagem.location.name}`,
            };
  
            novoPostJSON = JSON.stringify(novoPost);

          const data = await createPost(novoPostJSON);

          const divPost = document.createElement('div');
          divBtn.classList.add('div-post');
          conteudo.appendChild(divPost);

          const p1 = document.createElement('p');
          p1.textContent = data.title;
          divPost.appendChild(p1);

          const p2 = document.createElement('p');
          p2.textContent = data.body;
          divPost.appendChild(p2);

          btnPost.style.display = "none";
          const btnDelete = document.createElement('button');
          btnDelete.textContent = 'Esconder Informações';
          btnDelete.id = `btnDelete-${personagem.id}`;
          divBtn.appendChild(btnDelete);


          btnDelete.addEventListener('click', async () =>{
          console.log(`clicou em esconder informações do personagem ${personagem.name}`);

          deletePost(novoPost.userId);

          btnDelete.style.display="none";
          btnPost.style.display = "";
          divPost.innerHTML = '';
});
        });
       
      });

    } catch (error) {
      console.error(error);
    }
});













