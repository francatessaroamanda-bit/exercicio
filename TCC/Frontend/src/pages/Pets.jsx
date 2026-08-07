import { useState } from "react";

function Pets() {

  const [pets, setPets] = useState([
    {
      nome: "Thor",
      especie: "Cachorro",
      raca: "Golden Retriever",
      dono: "Maria"
    },
    {
      nome: "Luna",
      especie: "Gato",
      raca: "Persa",
      dono: "João"
    }
  ]);


  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);


  const [novoPet, setNovoPet] = useState({
    nome: "",
    especie: "",
    raca: "",
    dono: ""
  });



  function cadastrarPet(e) {

    e.preventDefault();

    setPets([
      ...pets,
      novoPet
    ]);

    limparFormulario();

  }



  function editarPet(index) {

    setEditando(index);

    setNovoPet(pets[index]);

    setMostrarFormulario(true);

  }



  function salvarEdicao(e) {

    e.preventDefault();


    const listaAtualizada = pets.map((pet, index) => {

      if (index === editando) {
        return novoPet;
      }

      return pet;

    });


    setPets(listaAtualizada);

    limparFormulario();

  }



  function removerPet(index) {

    const confirmar = window.confirm(
      "Deseja remover este pet?"
    );


    if (confirmar) {

      const novaLista = pets.filter(
        (_, i) => i !== index
      );


      setPets(novaLista);

    }

  }



  function limparFormulario() {

    setNovoPet({
      nome: "",
      especie: "",
      raca: "",
      dono: ""
    });


    setEditando(null);

    setMostrarFormulario(false);

  }



  return (

    <div>

      <h1>🐶 Pets cadastrados</h1>


      <button onClick={() => setMostrarFormulario(true)}>
        + Novo Pet
      </button>



      {mostrarFormulario && (

        <form
          className="formulario"
          onSubmit={
            editando !== null
              ? salvarEdicao
              : cadastrarPet
          }
        >


          <input
            type="text"
            placeholder="Nome do pet"
            value={novoPet.nome}
            onChange={(e) =>
              setNovoPet({
                ...novoPet,
                nome: e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Espécie"
            value={novoPet.especie}
            onChange={(e) =>
              setNovoPet({
                ...novoPet,
                especie: e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Raça"
            value={novoPet.raca}
            onChange={(e) =>
              setNovoPet({
                ...novoPet,
                raca: e.target.value
              })
            }
          />


          <input
            type="text"
            placeholder="Nome do dono"
            value={novoPet.dono}
            onChange={(e) =>
              setNovoPet({
                ...novoPet,
                dono: e.target.value
              })
            }
          />


          <button type="submit">

            {editando !== null
              ? "Salvar Alterações"
              : "Salvar Pet"}

          </button>


        </form>

      )}




      <div className="pets-container">

        {pets.map((pet, index) => (

          <div className="pet-card" key={index}>


            <h2>{pet.nome}</h2>


            <p>
              <span className="info-label">Espécie:</span> {pet.especie}
            </p>

            <p>
              <span className="info-label">Raça:</span> {pet.raca}
            </p>

            <p>
              <span className="info-label">Dono:</span> {pet.dono}
            </p>



            <button onClick={() => editarPet(index)}>
              Editar
            </button>


            <button onClick={() => removerPet(index)}>
              Remover
            </button>


          </div>

        ))}


      </div>


    </div>

  );

}


export default Pets;