import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableBody from "@material-ui/core/es/TableBody/TableBody";

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {titulo , itens} = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Detalhes
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{titulo}</DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itens.map(i => (
                  <TableRow key={i.itemId}>
                    <TableCell component="th" scope="row">
                      {i.item ? i.item.desc : ""}
                    </TableCell>
                    <TableCell align="right">{i.qtde}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Modificar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
