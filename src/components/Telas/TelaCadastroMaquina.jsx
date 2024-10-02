import { Alert } from "react-bootstrap";
import FormCadMaquinas from "../Formularios/FormCadMaquina";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaMaquinas from "../Tabelas/TabelaMaquina";
import { consultarTodos } from "../../services/maquinaService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroMaquina(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [maquinaSelecionada, setMaquinaSelecionada] = useState({
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
        urlImagem: "",
    });
    const [listaDeMaquinas, setListaDeMaquinas] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        const fetchMaquinas = async () => {
            try {
                const resposta = await consultarTodos(token);
                setListaDeMaquinas(resposta.listaMaquinas);
            } catch (erro) {
                setErrorMessage("Erro ao enviar a requisição: " + erro.message);
            }
        };

        fetchMaquinas();
    }, [contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Máquinas</h2>
                </Alert>
                {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                )}
                {exibirTabela ? (
                    <TabelaMaquinas
                        listaDeMaquinas={listaDeMaquinas}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setMaquinaSelecionada={setMaquinaSelecionada}
                    />
                ) : (
                    <FormCadMaquinas
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                        setMaquinaSelecionada={setMaquinaSelecionada}
                        maquinaSelecionada={maquinaSelecionada}
                    />
                )}
            </Pagina>
        </div>
    );
}