import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../busca/CaixaSelecao';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../App';
import { alterar, gravar } from '../../services/maquinaService';

export default function FormCadMaquinas(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [fabricanteSelecionado, setFabricanteSelecionado] = useState(props.maquinaSelecionada.fabricante);
    const [maquina, setMaquina] = useState(props.maquinaSelecionada);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setMaquina(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function manipularSubmissao(evento) {
        evento.preventDefault();
        const formulario = evento.currentTarget;
        setValidado(true);

        if (formulario.checkValidity()) {
            const token = contextoUsuario.usuarioLogado.token;
            const dados = { ...maquina, fabricante: fabricanteSelecionado };

            try {
                if (!props.modoEdicao) {
                    const resposta = await gravar(dados, token);
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);
                    }
                } else {
                    const resposta = await alterar(dados, token);
                    alert(resposta.mensagem);
                    props.setModoEdicao(false);
                    resetForm();
                }
            } catch (erro) {
                alert("Erro ao enviar a requisição: " + erro.message);
            }
        }
    }

    function resetForm() {
        setMaquina({
            maq_codigo: 0,
            maq_modelo: "",
            maq_processador: 0,
            maq_memoria: 0,
            maq_ssd: 0,
            maq_precoCusto: 0,
            maq_precoVenda: 0,
            maq_qtdEstoque: 0,
            fabricante: {
                fab_codigo: 0,
                fab_empresa: ""
            },
        });
        setFabricanteSelecionado(null);
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Máquina</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="maq_codigo"
                        name="codigo"
                        value={maquina.codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código da máquina!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="maq_modelo"
                        name="modelo"
                        value={maquina.modelo}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o modelo da máquina!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="maq_precoCusto"
                            name="precoCusto"
                            aria-describedby="precoCusto"
                            onChange={manipularMudanca}
                            value={maquina.precoCusto}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe o preço de custo!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="maq_precoVenda">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="maq_precoVenda"
                            name="precoVenda"
                            aria-describedby="precoVenda"
                            onChange={manipularMudanca}
                            value={maquina.precoVenda}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe o preço de venda!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Qtd em estoque:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="maq_qtdEstoque">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="maq_qtdEstoque"
                            name="qtdEstoque"
                            aria-describedby="qtdEstoque"
                            onChange={manipularMudanca}
                            value={maquina.qtdEstoque}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe a quantidade em estoque!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Col md={8}>
                    <Form.Label>Fabricante:</Form.Label>
                    <CaixaSelecao 
                        enderecoFonteDados={"http://localhost:4000/fabricante"} 
                        campoChave={"fab_codigo"}
                        campoExibicao={"fab_empresa"}
                        funcaoSelecao={setFabricanteSelecionado}
                        localLista={"listaFabricantes"}
                        tokenAcesso={contextoUsuario.usuarioLogado.token}
                    />
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}