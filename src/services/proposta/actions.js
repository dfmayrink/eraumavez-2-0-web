import {
  FIND_SERVICOS_POR_TIPO_EVENTO,
  INSERIR_DADOS_PROPOSTA,
  SELECIONAR_SERVICO,
  APAGAR_DADOS_PROPOSTA,
  RECEBER_PROPOSTA_EMAIL
} from "./actionTypes";

import axios from 'axios';

export const selecionarServico = (dados, servico, idProposta)  => dispatch => {
  axios.post('http://localhost:8080/selecionarServico/' + servico, {
    idProposta: idProposta,
    dados: dados
  }).then(res =>
    dispatch(
      {
        type: SELECIONAR_SERVICO,
        payload: res.data
      }
    )
  )
}

export const receberPropostaEmail = (dadosProposta)  => dispatch => {
  axios.post('http://localhost:8080/receberPropostaEmail/', dadosProposta)
    .then(res =>
      dispatch(
        {
          type: RECEBER_PROPOSTA_EMAIL,
          payload: res.data
        }
      )
  )
}

export const inserirDadosProposta = (postData) => dispatch => {
  fetch('http://localhost:8080/inserirDadosProposta/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(dadosProposta =>
      dispatch({
        type: INSERIR_DADOS_PROPOSTA,
        payload: dadosProposta
      })
    );
};

export const findServicosPorTipoEvento = (tipoEvento, numConvidados) =>  dispatch =>  {
  fetch('http://localhost:8080/findServicosByTipoEventoId/' + tipoEvento + '?numConvidados=' + numConvidados, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(servicos =>
      dispatch({
        type: FIND_SERVICOS_POR_TIPO_EVENTO,
        payload: servicos
      })
    );
};

export const apagarDadosProposta = () =>
  ({
    type: APAGAR_DADOS_PROPOSTA,
    payload: null
  })
