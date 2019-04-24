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
});

class Painel extends React.Component {
  state = {
    expanded: null,
    abaAberta: 1,
    numAbas: 4,
    sessoes: [{id: 1, sessao: "decoracao", desc: "Decoração"}, {id:2, sessao: "buffet", desc: "Buffet"},
      {id:3, sessao: "recreacao", desc: "Recreação"}, {id:4, sessao: "mobiliario", desc: "Mobiliário"}],
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
    const selecaoServico = this.props.selecaoServico;
    if(this.props.dadosProposta != null) {
      this.props.findServicosPorTipoEvento(this.props.dadosProposta.tipoEvento, this.props.dadosProposta.numConvidados);
      return (
        <React.Fragment>
          <Grid container spacing={16}>
            <Grid item md={12}>
            <div className={classes.root}>
              {this.state.sessoes.map(sessao => (
                <ExpansionPanel key={sessao.id} expanded={expanded === "panel" + sessao.id} onChange={this.handleChange(sessao.id)}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{sessao.desc}</Typography>
                    <Typography className={classes.secondaryHeading}>
                      {!!selecaoServico[sessao.sessao] &&
                      (selecaoServico[sessao.sessao].nome + " R$ " + selecaoServico[sessao.sessao].precoCalculado)}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <SelecaoServico secaoServico={sessao.sessao} changePanel={this.changePanel}/>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                )
              )}
            </div>
            </Grid>
            <Grid item md={12}>
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
