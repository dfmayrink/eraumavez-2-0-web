import {
  FIND_SERVICOS_POR_TIPO_EVENTO,
  INSERIR_DADOS_PROPOSTA,
  SELECIONAR_SERVICO
} from "./actionTypes";

export const selecionarServico = (postData, servico)  =>
  // fetch('http://localhost:8080/selecionarServico/' + servico, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json'
  //   },
  //   body: JSON.stringify(postData)
  // })
  // .then(res => res.json())
  // .then(selecaoDecoracao =>
  //   dispatch({
  //     type: SELECIONAR_DECORACAO,
  //     payload: selecaoDecoracao
  //   })
  // );
  ({
    type: SELECIONAR_SERVICO,
    payload: {[servico]: postData}
  });

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
