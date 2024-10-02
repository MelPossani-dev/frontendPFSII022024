import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner, Alert } from "react-bootstrap";

export default function CaixaSelecao({ 
    enderecoFonteDados,
    campoChave,
    campoExibicao, 
    funcaoSelecao,
    localLista,
    tokenAcesso 
}) {
    const [valorSelecionado, setValorSelecionado] = useState({});
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setCarregandoDados(true);
            setErro(null); // Limpa o erro anterior

            try {
                const config = {
                    method: "GET",
                    headers: {
                        ...(tokenAcesso ? { "Authorization": tokenAcesso } : {}),
                    },
                    credentials: 'include'
                };

                const resposta = await fetch(enderecoFonteDados, config);
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar dados do backend");
                }

                const listaDados = await resposta.json();
                const dadosObtidos = localLista ? listaDados[localLista] : listaDados;

                setDados(dadosObtidos);
                if (dadosObtidos.length > 0) {
                    setValorSelecionado(dadosObtidos[0]);
                    funcaoSelecao(dadosObtidos[0]);
                }
            } catch (erro) {
                setErro(`Não foi possível obter os dados do backend: ${erro.message}`);
                setDados([{
                    [campoChave]: 0,
                    [campoExibicao]: "Não foi possível obter os dados do backend"
                }]);
            } finally {
                setCarregandoDados(false);
            }
        };

        fetchData();

        return () => {
            // Limpeza se necessário
        };
    }, [enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao, localLista, tokenAcesso]);

    return (
        <Container>
            <Row>
                <Col md={11}>
                    {erro && <Alert variant="danger">{erro}</Alert>}
                    <Form.Select
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            const pos = dados.findIndex((item) => item[campoChave].toString() === itemSelecionado);
                            if (pos !== -1) {
                                setValorSelecionado(dados[pos]);
                                funcaoSelecao(dados[pos]);
                            }
                        }}
                        value={valorSelecionado[campoChave] || ""}
                    >
                        <option value="" disabled>Selecione uma opção</option>
                        {dados.map((item) => (
                            <option key={item[campoChave]} value={item[campoChave]}>
                                {item[campoExibicao]}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={1} className="d-flex align-items-center">
                    {carregandoDados && <Spinner animation="border" />}
                </Col>
            </Row>
        </Container>
    );
}