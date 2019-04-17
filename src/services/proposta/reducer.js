import {
  SELECIONAR_DECORACAO,
  FIND_SERVICOS_POR_TIPO_EVENTO,
  INSERIR_DADOS_PROPOSTA,
  SELECIONAR_SERVICO
} from './actionTypes';

const initialState = {
  selecaoServico: {},
  servicos: [],
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
      return {
        ...state,
        dadosProposta: action.payload
      };
    default:
      return state;
  }
}
