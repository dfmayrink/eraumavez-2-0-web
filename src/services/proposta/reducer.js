import {
  FIND_SERVICOS_POR_TIPO_EVENTO,
  INSERIR_DADOS_PROPOSTA,
  SELECIONAR_SERVICO,
  APAGAR_DADOS_PROPOSTA
} from './actionTypes';

const initialState = {
  selecaoServico: {},
  servicos: [],
  dadosProposta: JSON.parse(sessionStorage.getItem("dadosProposta"))
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECIONAR_SERVICO:
      return {
        ...state,
        selecaoServico: Object.assign({}, state.selecaoServico, action.payload)
      };
    case FIND_SERVICOS_POR_TIPO_EVENTO:
      return {
        ...state,
        servicos: action.payload
      };
    case INSERIR_DADOS_PROPOSTA:
      sessionStorage.setItem("dadosProposta", JSON.stringify(action.payload))
      return {
        ...state,
        dadosProposta: action.payload
      };
    case APAGAR_DADOS_PROPOSTA:
      sessionStorage.setItem("dadosProposta", JSON.stringify(action.payload))
      return {
        ...state,
        dadosProposta: action.payload
      };
    default:
      return state;
  }
}
