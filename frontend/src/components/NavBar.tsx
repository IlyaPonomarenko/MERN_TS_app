import { Container, Navbar } from "react-bootstrap";
import { User } from "../models/user";

interface NavBarProps{
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogOutClicked: () => void
    
}

const NavBar = ({loggedInUser, onSignUpClicked, onLogInClicked, onLogOutClicked}:NavBarProps) => {
    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand>
                        Notes app
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;