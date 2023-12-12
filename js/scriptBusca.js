const form = document.getElementById('personagem-form');
const resultados = document.querySelector(".resultados")

form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const nome = encodeURIComponent(form.querySelector('#nome').value.trim());
    const tipo = form.querySelector('#tipo').value;
  
    resultados.innerHTML = '';
  
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nome}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar personagens.');
      }
  
      const data = await response.json();
  
      if (!data.results.length) {
        resultados.innerHTML = `<p>Nenhum personagem encontrado.</p>`;
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
  
        
        card.appendChild(conteudo);
        resultados.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      resultados.innerHTML = '<p>Ocorreu um erro durante a busca.</p>';
    }
  });