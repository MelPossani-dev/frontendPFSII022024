import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';

export default function Menu(props) {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#" as={Link} to="/cliente">Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="#" as={Link} to="/fornecedor">Máquinas</NavDropdown.Item>
                            <NavDropdown.Item href="#" as={Link} to="/produto">Fabricantes</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Operações" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Compra</NavDropdown.Item>
                            <NavDropdown.Item href="#" as={Link} to="/pedido">Venda</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Fabricantes</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Estoque</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Sobre</Nav.Link>
                        <Nav.Link href="#home">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}