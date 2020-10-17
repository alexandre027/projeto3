import { http } from './config'

export default {
    listar:() =>{
        return http.get('usuarios')
    },

    salvar:(usuario) =>{
        return http.post('usuarios', usuario)
    },

    atualizar:(id,usuario) =>{
        return http.put('usuarios/'+id, usuario)
    },

    apagar:(id) =>{
        return http.delete('usuarios/'+id)
    }

}

