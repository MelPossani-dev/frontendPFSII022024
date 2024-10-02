import { Alert } from "react-bootstrap";
import FormCadFabricantes from "../Formularios/FormCadFabricante";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaFabricantes from "../Tabelas/TabelaFabricantes";
import { consultarTodos } from "../../services/fabricanteService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroFabricante(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [fabricanteSelecionado, setFabricanteSelecionado] = useState({ fab_codigo: 0, fab_empresa: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeFabricantes, setListaDeFabricantes] = useState([]);

    useEffect(() => {
        const fetchFabricantes = async () => {
            try {
                const resposta = await consultarTodos(contextoUsuario.usuarioLogado.token);
                if (resposta.status) {
                    setListaDeFabricantes(resposta.listaFabricantes);
                } else {
                    alert(resposta.mensagem);
                }
            } catch (error) {
                console.error("Error fetching fabricantes:", error);
            }
        };

        fetchFabricantes();
    }, [contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>Cadastro de Fabricantes</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaFabricantes
                        listaDeFabricantes={listaDeFabricantes}
                        setExibirTabela={setExibirTabela}
                        fabricanteSelecionado={fabricanteSelecionado}
                        setFabricanteSelecionado={setFabricanteSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                ) : (
                    <FormCadFabricantes
                        setExibirTabela={setExibirTabela}
                        fabricanteSelecionado={fabricanteSelecionado}
                        setFabricanteSelecionado={setFabricanteSelecionado}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}