import React from 'react';
import {Button, Card, CardContent, CardHeader, CardActions, Grid, Typography} from "@material-ui/core/es/index";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {selecionarServico, findServicosPorTipoEvento} from '../../../services/proposta/actions'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  servico: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
});

class SelecaoServico extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(serv, e) {
    this.props.selecionarServico(serv, this.props.secaoServico)
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          {this.props.servicos.map((serv) =>
            serv.secaoServicoId === this.props.secaoServico &&
             <Grid item md key={serv._id.str}>
                <Card key={serv._id.str} styles={classes.servico} onClick={(e) => this.handleOnSelect(serv, e)}>
                  <CardHeader key={serv._id.str} title={serv.nome} className={classes.cardHeader}/>
                  <CardContent key={serv._id.str}>
                    <Typography variant="h4">R$ {serv.precoCalculado}</Typography>
                    <Typography variant="body1">{serv.desc}</Typography>
                    {serv.itens.map((i) =>
                      typeof i.qtde === 'undefined' ?
                      <Typography  variant="body2">{i}</Typography>
                      :
                      <Typography variant="body2">{
                        i.qtde + " " +
                        (i.item != null ? i.item.unidade : 'undefined') + " - " +
                        (i.item != null ? i.item.desc : "undefined")}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions key={serv._id.str}>
                    <Button key={serv._id.str} variant="contained">Selecionar</Button>
                  </CardActions>
                </Card>
              </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

SelecaoServico.propTypes = {
  selecionarServico: PropTypes.func.isRequired,
  findServicosPorTipoEvento: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  servicos: state.proposta.servicos,
  dadosProposta: state.proposta.dadosProposta,
});

export default connect(mapStateToProps, { selecionarServico})(withStyles(styles)(SelecaoServico));
