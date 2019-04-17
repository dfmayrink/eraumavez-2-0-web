import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";
import SelecaoServico from "./Selecao";
import FormDados from "./Dados";
import {findServicosPorTipoEvento} from "../../services/proposta/actions";

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

class PainelServicos extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    if(this.props.dadosProposta == null) {
      return (
        <FormDados/>
      );
    } else {
      this.props.findServicosPorTipoEvento("festa-infantil", this.props.dadosProposta.numConvidados);
      return (
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.heading}>Decoração</Typography>
              <Typography className={classes.secondaryHeading}>
                {!!this.props.selecaoServico.decoracao &&
                (this.props.selecaoServico.decoracao.nome + " R$ " + this.props.selecaoServico.decoracao.precoCalculado)}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SelecaoServico secaoServico={"decoracao"}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.heading}>Buffet</Typography>
              <Typography className={classes.secondaryHeading}>
                {!!this.props.selecaoServico.buffet &&
                (this.props.selecaoServico.buffet.nome+ " R$" + this.props.selecaoServico.buffet.precoCalculado)}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SelecaoServico secaoServico={"buffet"}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.heading}>Mobiliário</Typography>
              <Typography className={classes.secondaryHeading}>
                {!!this.props.selecaoServico.mobiliario &&
                (this.props.selecaoServico.mobiliario.nome + " R$" + this.props.selecaoServico.mobiliario.precoCalculado)}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SelecaoServico secaoServico={"mobiliario"}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography className={classes.heading}>Recreação</Typography>
              <Typography className={classes.secondaryHeading}>
                {!!this.props.selecaoServico.recreacao &&
                (this.props.selecaoServico.recreacao.nome + " R$" + this.props.selecaoServico.recreacao.precoCalculado)}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SelecaoServico secaoServico={"recreacao"}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    }
  }
}

PainelServicos.propTypes = {
  classes: PropTypes.object.isRequired,
  findServicosPorTipoEvento: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  dadosProposta: state.proposta.dadosProposta
});

export default connect(mapStateToProps, {findServicosPorTipoEvento})(withStyles(styles)(PainelServicos));
