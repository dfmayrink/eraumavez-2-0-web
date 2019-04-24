import React from 'react';
import {Button, Card, CardContent, CardHeader, CardActions, Grid, Typography} from "@material-ui/core/es/index";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {selecionarServico, findServicosPorTipoEvento} from '../../../services/proposta/actions'
import { withStyles } from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";

const styles = theme => ({
  servico: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class SelecaoServico extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handlePularSecao = this.handlePularSecao.bind(this);
  }

  handleOnSelect(serv, e) {
    this.props.selecionarServico(serv, this.props.secaoServico);
    if(this.props.changePanel != null)
      this.props.changePanel();
  }

  handlePularSecao() {
    if(this.props.changePanel != null)
      this.props.changePanel();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          {this.props.servicos.map((serv) =>
            serv.secaoServicoId === this.props.secaoServico &&
             <Grid item md key={serv._id.str}>
                <Card key={serv._id.str} styles={classes.servico}>
                  <CardHeader key={serv._id.str} title={serv.nome} className={classes.cardHeader}/>
                  <CardMedia key={serv._id.str}
                    className={classes.media}
                    image={require("../../../static/salmao.jpg")}
                    title="Salmao"
                  />
                  <CardContent key={serv._id.str}>
                    <Typography key={serv._id.str} variant="h4">R$ {serv.precoCalculado}</Typography>
                    <Typography key={serv._id.str} variant="body1">{serv.desc}</Typography>
                    {serv.itens.map((i) =>
                      typeof i.qtde === 'undefined' ?
                      <Typography key={i._id} variant="body2">{i}</Typography>
                      :
                      <Typography key={i._id} variant="body2">{
                        i.qtde + " " +
                        (i.item != null ? i.item.unidade : 'undefined') + " - " +
                        (i.item != null ? i.item.desc : "undefined")}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions key={serv._id.str}>
                    <Button key={serv._id.str} variant="contained"  onClick={(e) => this.handleOnSelect(serv, e)}>Selecionar</Button>
                    <Button key={serv._id.str} variant="contained"  onClick={(e) => this.handleOnSelect(serv, e)}>Modificar</Button>
                  </CardActions>
                </Card>
              </Grid>
          )}
          <Grid item md>
            <Button variant="contained" onClick={this.handlePularSecao}>Pular essa seção</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SelecaoServico.propTypes = {
  selecionarServico: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  servicos: state.proposta.servicos,
  dadosProposta: state.proposta.dadosProposta,
});

export default connect(mapStateToProps, { selecionarServico})(withStyles(styles)(SelecaoServico));
