import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import BasketPage from "../pages/BasketPage";
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                <NavLink style={{color:'lightgreen'}} to={SHOP_ROUTE}>SecondLifeTech :   Ваша стара техніка -  для когось нові можливості</NavLink>

                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'aqua'}}>
                        <Button style={{marginRight:'10px'}}
                            variant={"outline-light"}
                            onClick={() => history.push(BASKET_ROUTE)}
                        >
                           Кошик
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Продати старий гаджет
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Вийти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
