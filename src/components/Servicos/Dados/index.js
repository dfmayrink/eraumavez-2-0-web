import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {findServicosPorTipoEvento, inserirDadosProposta, selecionarServico} from "../../../services/proposta/actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

// While you can use any validation library (or write you own), Formik
// comes with special support for Yup by @jquense. It has a builder API like
// React PropTypes / Hapi.js's Joi. You can define these inline or, you may want
// to keep them separate so you can reuse schemas (e.g. address) across your application.
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email obrigatório'),
  nome: Yup.string()
    .min(2, 'O nome deve ter mais de 2 caracteres')
    .max(30, 'Limite máximo do nome atigindo')
    .required('Nome obrigatório'),
  sobreNome: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(100, 'Limite máximo sobrenome atigindo')
    .required('Sobrenome obrigatório'),
  numConvidados: Yup.number()
    .positive('O número de convidados deve ser maior que zero')
    .required('Número de convidados obrigatório')
});

class FormDados extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h2>Informe seus dados para a proposta</h2>
          </Grid>
            <Formik
              initialValues={{
                email: '',
                nome: '',
                sobreNome: '',
                numConvidados: ''
              }}
              validationSchema={SignUpSchema}
              onSubmit={values => {
                setTimeout(() => {
                  this.props.inserirDadosProposta(values)
                }, 500);
              }}
              render={({values, handleChange, handleBlur, errors, touched}) => (
                <Grid item xs={12}>
                  <Form>
                    <Grid item md>
                      <Grid item>
                        <TextField
                          error={errors.nome && touched.nome}
                          id="outlined-nome-input"
                          label="Nome"
                          className={styles.textField}
                          type="text"
                          name="nome"
                          autoComplete="nome"
                          margin="normal"
                          variant="outlined"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nome}
                        />
                      </Grid>
                      <Grid item>
                        <ErrorMessage
                          name="nome"
                          component="div"
                          className="field-error"
                        />
                      </Grid>
                    </Grid>

                    <Grid item md>
                    <TextField
                      error={errors.sobreNome && touched.sobreNome}
                      id="outlined-sobrenome-input"
                      label="Sobrenome"
                      className={styles.textField}
                      type="text"
                      name="sobreNome"
                      autoComplete="sobreNome"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sobreNome}
                    />
                    <ErrorMessage name="sobreNome" component="div" className="field-error"/>
                    </Grid>

                    <Grid item md>
                    <TextField
                      error={errors.email && touched.email}
                      id="outlined-email-input"
                      label="Email"
                      className={styles.textField}
                      type="email"
                      name="email"
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <ErrorMessage name="email" component="div" className="field-error"/>
                    </Grid>

                    <Grid item md>
                    <TextField
                      error={errors.numConvidados && touched.numConvidados}
                      id="outlined-numcomvidados-input"
                      label="Número de Convidados"
                      className={styles.textField}
                      type="number"
                      name="numConvidados"
                      autoComplete="numConvidados"
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.numConvidados}
                    />
                    <ErrorMessage name="numConvidados" component="div" className="field-error"/>
                    </Grid>

                    <Grid item md>
                      <Button type="submit" variant="outlined" color="primary" className={styles.button}>
                        Enviar
                      </Button>
                    </Grid>
                  </Form>
                </Grid>
              )}
            />
        </Grid>
      </React.Fragment>
    )
  }
}

FormDados.propTypes = {
  inserirDadosProposta: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dadosProposta: state.proposta.dadosProposta
});


export default connect(mapStateToProps, { inserirDadosProposta })(withStyles(styles)(FormDados));
