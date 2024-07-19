import StorageSwitcher from './Header/StorageSwitcher';
import {Container, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar variant="light" className="p-0 header">
            <Container className="header__container d-flex justify-content-between align-items-center">
                <Navbar.Brand href="/">My TODO</Navbar.Brand>
                <StorageSwitcher/>
            </Container>
        </Navbar>
    );
};

export default Header;