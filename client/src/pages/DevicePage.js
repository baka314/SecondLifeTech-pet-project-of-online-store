import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import { useParams, useHistory } from 'react-router-dom'
import { fetchOneDevice } from "../http/deviceAPI";
import BasketStore from '../store/BasketStore';
import {BASKET_ROUTE} from "../utils/consts";

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, [id]);

    const addToBasket = () => {
        BasketStore.addToBasket(device);
        history.push(BASKET_ROUTE); // Redirect to basket page after adding
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} alt={device.name} />
                </Col>

                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:500, height: 280, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.price}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Button onClick={addToBasket}
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{width: 300, height: 70, fontSize: 32,  marginLeft:150, marginTop:160, background:"DimGray"}}
                    >
                        Додати у корзину
                    </Button>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
