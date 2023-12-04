const getAllPosts = async () => {
    try{
        const res = await fetch(`https://rickandmortyapi.com/api/character/`);
        const data  = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        const characters = data.results;

        characters.forEach((element) => {
            console.log(
                `Id do Personagem: ${element.id} \nNome: ${element.name} \nEspécie: ${element.species} \nStatus: ${element.status} \nLocalização: ${element.location.name}`
            )           
        });

    } catch (error) {
        console.log(error);
    }



}

getAllPosts();
