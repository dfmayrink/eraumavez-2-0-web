import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import SelecaoServico from "../Selecao";
import {findServicosPorTipoEvento} from "../../../services/proposta/actions";
import {Button} from "@material-ui/core/es";
import Grid from '@material-ui/core/Grid';
import * as ROUTES from '../../../constants/routes';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  botaoResumo: {
    textAlign: 'right'
  },
});

class Painel extends React.Component {
  state = {
    expanded: null,
    abaAberta: 1,
    numAbas: 4,
    secoes: [{id: 1, secao: "decoracao", desc: "Decoração"}, {id:2, secao: "buffet", desc: "Buffet"},
      {id:3, secao: "recreacao", desc: "Recreação"}, {id:4, secao: "mobiliario", desc: "Mobiliário"}],
  };

  constructor(props) {
    super(props);
    this.handleResumo = this.handleResumo.bind(this);
  }

  changePanel = () => {
    const abaAberta = (this.state.abaAberta + 1);
    this.setState({
      expanded: ('panel' + abaAberta),
      abaAberta: abaAberta
    })
  }

  componentWillMount() {
    const {dadosProposta} = this.props;
    if(dadosProposta != null)
      this.props.findServicosPorTipoEvento(dadosProposta.tipoEvento, dadosProposta.numConvidados);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? 'panel' + panel : false,
      abaAberta: panel
    });
  };

  handleResumo() {
    this.props.history.push(ROUTES.RESUMO_ESTIMATIVA);
  }


  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const { selecaoServico , dadosProposta }  = this.props;
    if(dadosProposta != null) {
      return (
        <React.Fragment>
          <Grid container spacing={16}>
            <Grid item md={12}>
            <div className={classes.root}>
              {this.state.secoes.map(secao => (
                <ExpansionPanel key={secao.id} expanded={expanded === "panel" + secao.id} onChange={this.handleChange(secao.id)}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{secao.desc}</Typography>
                    <Typography className={classes.secondaryHeading}>
                      {!!dadosProposta.servicosSelecionados[secao.secao] &&
                      (dadosProposta.servicosSelecionados[secao.secao].nome + " R$ " +
                        dadosProposta.servicosSelecionados[secao.secao].precoCalculado.toFixed(2))}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <SelecaoServico categoria={secao.secao} changePanel={this.changePanel}/>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                )
              )}
            </div>
            </Grid>
            <Grid item md={12} className={classes.botaoResumo}>
              <Button variant="outlined" color="primary" onClick={this.handleResumo}>Resumo</Button>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    } else {
      return <React.Fragment/>
    }
  }
}

Painel.propTypes = {
  classes: PropTypes.object.isRequired,
  findServicosPorTipoEvento: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  dadosProposta: state.proposta.dadosProposta
});

export default connect(mapStateToProps, {findServicosPorTipoEvento})
  (withRouter(withStyles(styles)(Painel)));
