<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Sistema Caronas</a>
      </div>
    </nav>

    <div id="mae">
      <div id="filho1">
        <nav>
          <div class="nav-wrapper blue-dark darken-1">
            <a href="#" class="brand-logo center">Usuario</a>
          </div>
        </nav>

        <div class="container">
          <form @submit.prevent="salvar">
            <label>Nome</label>
            <input type="text" placeholder="nome" v-model="usuario.nome" />
            <label>Destino</label>
            <input
              type="text"
              placeholder="destino"
              v-model="usuario.destino"
            />
            <label>Data</label>
            <input type="text" placeholder="data" v-model="usuario.data" />

            <button class="waves-effect waves-light btn-small">
              Salvar<i class="material-icons left">save</i>
            </button>
          </form>

          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>DESTINO</th>
                <th>DATA</th>
                <th>OPÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="usuario of usuarios" :key="usuario.id">
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.destino }}</td>
                <td>{{ usuario.data }}</td>
                <td>
                  <button
                    @click="editar(usuario)"
                    class="waves-effect btn-small blue darken-1"
                  >
                    <i class="material-icons">create</i>
                  </button>
                  <button
                    @click="remover(usuario)"
                    class="waves-effect btn-small red darken-1"
                  >
                    <i class="material-icons">delete_sweep</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="filho2">
        <nav>
          <div class="nav-wrapper green darken-1">
            <a href="#" class="brand-logo center">Motorista</a>
          </div>
        </nav>

        <div class="container">
          <form @submit.prevent="salvarM">
            <label>Nome</label>
            <input type="text" placeholder="nome" v-model="motorista.nome" />
            <label>Destino</label>
            <input
              type="text"
              placeholder="destino"
              v-model="motorista.destino"
            />
            <label>Data</label>
            <input type="text" placeholder="data" v-model="motorista.data" />

            <button class="waves-effect waves-light btn-small">
              Salvar<i class="material-icons left">save</i>
            </button>
          </form>

          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>DESTINO</th>
                <th>DATA</th>
                <th>OPÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="motorista of motoristas" :key="motorista.id">
                <td>{{ motorista.nome }}</td>
                <td>{{ motorista.destino }}</td>
                <td>{{ motorista.data }}</td>
                <td>
                  <button
                    @click="editarM(motorista)"
                    class="waves-effect btn-small blue darken-1"
                  >
                    <i class="material-icons">create</i>
                  </button>
                  <button
                    @click="removerM(motorista)"
                    class="waves-effect btn-small red darken-1"
                  >
                    <i class="material-icons">delete_sweep</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="cruz">
      <nav>
        <div class="nav-wrapper orange darken-1">
          <a href="#" class="brand-logo center">Sugestoes de Caronas</a>
        </div>
      </nav>
      <h3>{{ listaDeCaronas }}</h3>
      <td></td>
    </div>
  </div>
</template>

<script>
import Usuario from "./services/usuarios";
import Motorista from "./services/motoristas";
import axios from "axios";
import usuarios from "./services/usuarios";

export default {
  data() {
    return {
      usuario: {
        id: "",
        nome: "",
        destino: "",
        data: "",
      },
      motorista: {
        id: "",
        nome: "",
        destino: "",
        data: "",
      },
      usuarios: [],
      motoristas: [],
      listaDeCaronas: [],
    };
  },

  mounted() {
    this.listar();
    this.listarM();
  },

  methods: {
    listar() {
      Usuario.listar().then((resposta) => {
        this.usuarios = resposta.data;
      });
    },
    salvar() {
      if (!this.usuario.id) {
        Usuario.salvar(this.usuario).then((resposta) => {
          this.usuario = {};
          alert("salvo com sucesso");
          this.listar();
        });
      } else {
        Usuario.atualizar(this.usuario.id, this.usuario).then((resposta) => {
          this.usuario = {};
          alert("atualizado com sucesso");
          this.listar();
        });
      }
    },

    editar(usuario) {
      this.usuario = usuario;
    },
    remover(usuario) {
      Usuario.apagar(usuario.id).then((resposta) => {
        alert("Usuario Apagado");
        this.listar();
      });
    },

    listarM() {
      Motorista.listarM().then((resposta) => {
        this.motoristas = resposta.data;
      });
    },
    salvarM() {
      if (!this.motorista.id) {
        Motorista.salvarM(this.motorista).then((resposta) => {
          this.carona(this.motorista);
          this.motorista = {};
          alert("salvo com sucesso");
          this.listarM();
        });
      } else {
        Motorista.atualizarM(this.motorista.id, this.motorista).then(
          (resposta) => {
            this.motorista = {};
            alert("atualizado com sucesso");
            this.listarM();
          }
        );
      }
    },

    editarM(motorista) {
      this.motorista = motorista;
    },
    removerM(motorista) {
      Motorista.apagarM(motorista.id).then((resposta) => {
        alert("Motorista Apagado");
        this.listarM();
      });
    },

    carona(motorista) {
      var nomeMotorista = this.motorista.nome;
      var destinoMotorista = this.motorista.destino;
      var dataMotorista = this.motorista.data;

      Usuario.listar().then((resposta) => {
        this.usuarios = resposta.data;

        this.usuarios.forEach((e) => {
          var nome = e.nome;
          var destino = e.destino;
          var data = e.data;

          alert(
            "CARONA DISPONIVEL :::" +
              "MOTORISTA : " +
              nomeMotorista +
              " => Usuario Com o Mesmo Destino e Data: " +
              nome +
              " DESTINO: " +
              destino +
              " DATA: " +
              data
          );

          if (destinoMotorista === destino && dataMotorista === data) {
            console.log("deu bom");
            this.listaDeCaronas.push(
              "CARONA DISPONIVEL :::" +
                "MOTORISTA : " +
                nomeMotorista +
                " => Usuario Com o Mesmo Destino e Data: " +
                nome +
                " DESTINO: " +
                destino +
                " DATA: " +
                data
            );
          }
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#mae {
  display: inline-block;
}

#filho1 {
  display: inline-block;
  width: 50%;
}

#filho2 {
  width: 50%;
  float: right;
}

#cruz {
  text-align: center;
}
</style>
