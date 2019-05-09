import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core/es";
import FormDialog from "./Detalhes";
import {receberPropostaEmail} from '../../services/proposta/actions'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  botaoEmail: {
    textAlign: 'right'
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class ResumoEstimativa extends React.Component {
  constructor(props) {
    super(props);
    this.handleReceberEmail = this.handleReceberEmail.bind(this);
  }

   handleReceberEmail() {
    this.props.receberPropostaEmail(this.props.dadosProposta);
  }

  render() {
    const { classes } = this.props;
    const { dadosProposta } = this.props;
    const selecaoServico = dadosProposta.servicosSelecionados;
    let total = 0.0;

    return (
      <Grid container spacing={16}>
        <Grid item md={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Produto</CustomTableCell>
                  <CustomTableCell align="right"></CustomTableCell>
                  <CustomTableCell align="right">Preço</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(selecaoServico).map(ser => {
                  total += selecaoServico[ser].precoCalculado
                  return (
                  <TableRow className={classes.row} key={selecaoServico[ser]._id.str}>
                    <CustomTableCell component="th" scope="row">
                      {selecaoServico[ser].nome}
                    </CustomTableCell>
                    <CustomTableCell align="right"><FormDialog titulo={selecaoServico[ser].nome} itens={selecaoServico[ser].itens}/></CustomTableCell>
                    <CustomTableCell align="right">R$ {selecaoServico[ser].precoCalculado.toFixed(2)}</CustomTableCell>
                  </TableRow>
                )})}
                <TableRow className={classes.row}>
                  <CustomTableCell colSpan={2} align="right">Total</CustomTableCell>
                  <CustomTableCell align="right">R$ {total.toFixed(2)}</CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item md={12} className={classes.botaoEmail}>
          <Button variant="outlined" color="primary"
                  onClick={this.handleReceberEmail}>Receber por email</Button>
        </Grid>
      </Grid>
    );
  }
}


ResumoEstimativa.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  selecaoServico: state.proposta.selecaoServico,
  dadosProposta: state.proposta.dadosProposta
});

export default connect(mapStateToProps, {receberPropostaEmail})(withStyles(styles)(ResumoEstimativa));
