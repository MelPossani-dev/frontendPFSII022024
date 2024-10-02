import { Button, Container, Table } from "react-bootstrap";
import { excluir } from "../../services/maquinaService";
import { ContextoUsuarioLogado } from "../../App";
import { useContext } from "react";

export default function TabelaMaquinas(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function excluirMaquina(maquina) {
        const token = contextoUsuario.usuarioLogado.token;
        if (window.confirm(`Deseja excluir a máquina ${maquina.maq_modelo}?`)) {
            excluir(maquina.maq_codigo, token).then((resposta) => {
                props.setAtualizarTela(true);
                alert(resposta.mensagem);
            }).catch((erro) => {
                alert("Erro ao enviar a requisição: " + erro.message);
            });
        }
    }

    function alterarMaquina(maquina) {
        props.setMaquinaSelecionada(maquina);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={() => props.setExibirTabela(false)}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Modelo</th>
                            <th>Processador</th>
                            <th>Memória</th>
                            <th>SSD</th>
                            <th>Preço de Custo</th>
                            <th>Preço de Venda</th>
                            <th>Qtd. em Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaDeMaquinas?.map((maquina) => (
                            <tr key={maquina.maq_codigo}> {/* Chave única */}
                                <td>{maquina.maq_codigo}</td>
                                <td>{maquina.maq_modelo}</td>
                                <td>{maquina.maq_processador}</td>
                                <td>{maquina.maq_memoria}</td>
                                <td>{maquina.maq_ssd}</td>
                                <td>{maquina.maq_precoCusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{maquina.maq_precoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{maquina.maq_qtdEstoque}</td>
                                <td>
                                    <Button variant="warning" onClick={() => alterarMaquina(maquina)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg>
                                    </Button>
                                    <Button variant="danger" onClick={() => excluirMaquina(maquina)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}