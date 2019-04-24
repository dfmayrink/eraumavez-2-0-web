import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import FormDados from "./Dados";
import {findServicosPorTipoEvento} from "../../services/proposta/actions";
import Painel from "./Painel";

class PainelServicos extends React.Component {
  state = {
    expanded: null,
    abaAberta: 1,
    numAbas: 4
  };

  changePanel = () => {
    const abaAberta = (this.state.abaAberta + 1);
    this.setState({
      expanded: ('panel' + abaAberta),
      abaAberta: abaAberta
    })
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? 'panel' + panel : false,
      abaAberta: panel
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
        <React.Fragment>
          <FormDados/>
          <Painel/>
        </React.Fragment>
      );
  }
}

PainelServicos.propTypes = {
  findServicosPorTipoEvento: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  dadosProposta: state.proposta.dadosProposta
});

export default connect(mapStateToProps, {findServicosPorTipoEvento})(PainelServicos);
