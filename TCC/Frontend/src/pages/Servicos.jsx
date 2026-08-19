import { useState } from "react";

function Servicos() {

  const [servicos, setServicos] = useState([
    {
      nome: "Banho",
      descricao: "Banho completo com produtos de qualidade",
      preco: "50,00"
    },
    {
      nome: "Tosa",
      descricao: "Tosa higiênica e estética",
      preco: "70,00"
    },
    {
      nome: "Banho e Tosa",
      descricao: "Pacote completo para seu pet",
      preco: "100,00"
    }
  ]);


  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);


  const [novoServico, setNovoServico] = useState({
    nome: "",
    descricao: "",
    preco: ""
  });



  function cadastrarServico(e) {

    e.preventDefault();

    setServicos([
      ...servicos,
      novoServico
    ]);

    limparFormulario();

  }



  function editarServico(index) {

    setEditando(index);

    setNovoServico({
      ...servicos[index]
    });

    setMostrarFormulario(true);

  }



  function salvarEdicao(e) {

    e.preventDefault();


    const listaAtualizada = servicos.map((servico, index) => {

      if(index === editando) {
        return novoServico;
      }

      return servico;

    });


    setServicos(listaAtualizada);

    limparFormulario();

  }



  function removerServico(index) {

    const confirmar = window.confirm(
      "Deseja remover este serviço?"
    );


    if(confirmar){

      const novaLista = servicos.filter(
        (_, i) => i !== index
      );

      setServicos(novaLista);

    }

  }



  function limparFormulario(){

    setNovoServico({
      nome: "",
      descricao: "",
      preco: ""
    });


    setEditando(null);

    setMostrarFormulario(false);

  }



  return (

    <div>


      <h1>Serviços</h1>


      <button onClick={() => setMostrarFormulario(true)}>
        + Novo Serviço
      </button>



      {mostrarFormulario && (

        <form 
          className="formulario"
          onSubmit={
            editando !== null
            ? salvarEdicao
            : cadastrarServico
          }
        >


          <input
            type="text"
            placeholder="Nome do serviço"
            value={novoServico.nome}
            onChange={(e)=>
              setNovoServico({
                ...novoServico,
                nome:e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Descrição"
            value={novoServico.descricao}
            onChange={(e)=>
              setNovoServico({
                ...novoServico,
                descricao:e.target.value
              })
            }
          />


          <input
            type="number"
            placeholder="Preço"
            value={novoServico.preco}
            onChange={(e)=>
              setNovoServico({
                ...novoServico,
                preco:e.target.value
              })
            }
          />


          <button type="submit">

            {editando !== null
              ? "Salvar Alterações"
              : "Salvar Serviço"}

          </button>


          <button 
            type="button"
            onClick={limparFormulario}
          >
            Cancelar
          </button>


        </form>

      )}




      <div className="pets-container">


        {servicos.map((servico,index)=>(


          <div className="pet-card" key={index}>


            <h2>{servico.nome}</h2>


            <p>
              <span className="info-label">
                Descrição:
              </span> {servico.descricao}
            </p>


            <p>
              <span className="info-label">
                Valor:
              </span> R$ {servico.preco}
            </p>



            <button onClick={() => editarServico(index)}>
              Editar
            </button>


            <button onClick={() => removerServico(index)}>
              Remover
            </button>


          </div>


        ))}


      </div>


    </div>

  );

}


export default Servicos;