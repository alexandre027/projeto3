import { http } from './config'

export default {
    listarM:() =>{
        return http.get('motoristas')
    },

    salvarM:(motorista) =>{
        return http.post('motoristas', motorista)
    },

    atualizarM:(id,motorista) =>{
        return http.put('motoristas/'+id, motorista)
    },

    apagarM:(id) =>{
        return http.delete('motoristas/'+id)
    },

    pegarUm:(id) =>{
        return http.get('mototistas/'+id)
    }

}