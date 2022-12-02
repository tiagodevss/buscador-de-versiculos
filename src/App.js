import React, { useEffect, useState } from 'react';
import './App.css';
import GerarVersiculo from './components/GerarVersiculo';
import Livros from './livros.json';

function App() {
  const [livro, setLivro] = useState("genesis")
  const [quantCapitulos, setQuantCapitulos] = useState()
  const [capituloSelecionado, setCapituloSelecionado] = useState(1)

  const [quantVersiculos, setQuantVersiculos] = useState()
  const [numeroVersiculoSelecionado, setNumeroVersiculoSelecionado] = useState()


  const [livroCompleto, setLivroCompleto] = useState()
  const [versiculosCapitulo, setVersiculosCapitulo] = useState()

  function gerarArrayDeNumeros(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  function buscarVersiculo(livro) {
    fetch(`/biblia_acf/${livro}.json`)
      .then(res => res.json())
      .then(res => {
        setLivroCompleto(res);
        setQuantCapitulos(gerarArrayDeNumeros(res.length))
      })
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
      </select>
      <br />
      {quantCapitulos ? (
        <>
          <span>Selecione o Capítulo:</span><br />
          <select
            onChange={(e) => {
              const object = Object.values(livroCompleto[parseInt(e.target.value) - 1])[0]
              setVersiculosCapitulo(Object.values(object))
              setCapituloSelecionado(parseInt(e.target.value))
              setQuantVersiculos(gerarArrayDeNumeros(Object.values(object).length))
            }}
          >
            {quantCapitulos.map(numCapitulo => {
              return (
                <option key={numCapitulo} value={numCapitulo}>
                  {numCapitulo}
                </option>
              )
            })}
          </select>
          <br />
        </>
      ) : null
      }
      {versiculosCapitulo ? (
        <>
          <span>Selecione o Versículo:</span><br />
          <select
            onChange={(e) => {
              setNumeroVersiculoSelecionado(parseInt(e.target.value))
            }}
          >
            {quantVersiculos.map(numVersiculo => {
              return (
                <option key={numVersiculo} value={numVersiculo}>
                  {numVersiculo}
                </option>
              )
            })}
          </select>
        </>
      ) : null
      }
      {
        numeroVersiculoSelecionado ? (
          <GerarVersiculo
            versiculosCapitulo={versiculosCapitulo}
            numeroVersiculoSelecionado={numeroVersiculoSelecionado}
          />
        ) : null
      }
    </div>
  );
}

export default App;
