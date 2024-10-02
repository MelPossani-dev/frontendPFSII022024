import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../App';
import { gravar, alterar } from '../../services/fabricanteService';

export default function FormFabricantes(props) {
    const [fabricante, setFabricante] = useState(props.fabricanteSelecionado);
    const [validado, setValidado] = useState(false);
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function manipularMudanca(evento) {
        setFabricante({
            ...fabricante,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                gravar(fabricante,token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
            else {
                alterar(fabricante, token).then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setFabricanteSelecionado( { codigo: 0, descricao: "" });

                    setValidado(false);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }

        }
        else{
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    onChange={manipularMudanca}
                                    value={fabricante.codigo}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código do fabricante!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="fabricante:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição do fabricante"
                                    id="descricao"
                                    name="descricao"
                                    onChange={manipularMudanca}
                                    value={fabricante.descricao}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição do fabricante!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}