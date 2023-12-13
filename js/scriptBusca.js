const form = document.getElementById('personagem-form');
const container = document.querySelector(".container")

form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nome = encodeURIComponent(form.querySelector('#nome').value.trim());
    
  
    container.innerHTML = '';
  
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar personagens.');
      }
  
      const data = await response.json();
  
      if (!data.results.length) {
        container.innerHTML = `<p>Nenhum personagem encontrado.</p>`;
        return;
      }
  
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
  
        const p1 = document.createElement('p');
        p1.textContent = `Espécie: ${personagem.species}`;
        conteudo.appendChild(p1);
  
        const p2 = document.createElement('p');
        p2.textContent = `Status: ${personagem.status}`;
        conteudo.appendChild(p2);

        const p3 = document.createElement('p');
        p3.textContent = `Localização: ${personagem.location.name}`;
        conteudo.appendChild(p3);

        const divBtn = document.createElement('div');
        divBtn.classList.add('btn-container');

        const btnPost = document.createElement('button');
        btnPost.textContent = 'POST!';
        btnPost.id = `btnPost-${personagem.id}`;
        divBtn.appendChild(btnPost);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'DELETE!';
        btnDelete.id = `btnDelete-${personagem.id}`;
        divBtn.appendChild(btnDelete);
        
        card.appendChild(conteudo);
        card.appendChild(divBtn);
        container.appendChild(card);

        btnPost.addEventListener('click', () => {
          console.log(`clicou no personagem ${personagem.name}`);

          const createPost= async (novoPostJSON) => {
            try {
              const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json; charset=UTF-8",
                },
                body: novoPostJSON,
              });
          
              const data = await res.json();
              console.log(data);
          
              if (!res.ok) {
                console.log(data.description);
                return;
              }
          
            } catch (error) {
              console.log(`Erro - ${error}`);
            }
          }

          

          let novoPost ={
            userId: `${personagem.id}`,
            title: `Character: ${personagem.name}`,
            body: `This character was last seen in ${personagem.location.name}`,
          };

          let novoPostJSON = JSON.stringify(novoPost);

          createPost(novoPostJSON);
        });

        btnDelete.addEventListener('click', () => {
          console.log(`clicou no personagem ${personagem.name}`);

          async function deletePost(id) {
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
        let id = `${personagem.id}`
        deletePost(id);
        })

       
      });
    } catch (error) {
      console.error(error);
    }
});



