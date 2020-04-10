import React, { useState, useEffect } from 'react'
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response =>{
        setRepositories(response.data)
    })
  }, [])   

  async function handleAddRepository() {
    try {

        const response = await api.post('repositories',{
          "url": "https://github.com/Rocketseat/umbriel",
          "title": "Umbriel",
          "techs": ["Node", "Express", "TypeScript"]
        })

        const repository = response.data

        setRepositories([...repositories, repository])

      } catch(err){
        alert('Erro no cadastro, tente novamente.')
    }    
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repository => repository.id !== id))

    } catch (err) {
            alert('Erro ao deletar o repositório.')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repository => (
              <li key={repository.id}>
                {repository.title}
      
                <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
                  Remover
                </button>
              </li>
            )
          )
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
