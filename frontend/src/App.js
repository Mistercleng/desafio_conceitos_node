import React, {useState, useEffect} from 'react';
// import Header from './componets/Header';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        console.log(response.data)
        setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
     // TODO
     const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now}`,
      url: "teste.dev.com",
      techs: ["Node.js", "ReactDOM", "ReactNative"],
      likes: "1"
     }); 

     const repository = response.data;

     setRepositories([...repositories, repository])

   
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
    const response = await api.delete(`repositories/${id}`, id);
    window.location.reload(false);
    console.log(response);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}

      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
