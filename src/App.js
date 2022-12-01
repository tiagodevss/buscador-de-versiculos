import React, { useEffect, useState } from 'react'
import './App.css'
import Livros from './livros.json'

function App() {
  const [livro, setLivro] = useState("genesis")
  const [versiculo, setVersiculo] = useState()
  const [quantVersiculos, setQuantVersiculos] = useState()

  function buscarVersiculo(livro) {
    fetch(`/biblia_acf/${livro}.json`)
      .then(res => res.json())
      .then(res => (
        setQuantVersiculos(res.length)
      ))
  }

  useEffect(() => {
    buscarVersiculo(livro)
  }, [livro])

  return (
    <div className="App">
      <span>Selecione o livro:</span><br />
      <select
        onChange={(e) => setLivro(e.target.value)}
      >
        {
          Object.entries(Livros[0]).map((livro) => {
            return (
              <option
                value={livro[1].value}
                key={livro[1].id}
              >
                {livro[1].name}
              </option>
            )
          })
        }
        {quantVersiculos ?
          <>
            <span>Selecione o versiculo:</span><br />
            <select>
              {quantVersiculos.map(numVersiculo => {
                return (
                  <option>
                    
                  </option>
                )
              })}
            </select>
          </>
          : null
        }
      </select>
    </div>
  );
}

export default App;
