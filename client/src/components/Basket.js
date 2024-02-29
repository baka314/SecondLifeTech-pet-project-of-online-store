// Basket.js
import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Form, Image, ListGroup} from 'react-bootstrap';
import BasketStore from '../store/BasketStore';
import './BasketStyles.css';
import {SHOP_ROUTE} from '../utils/consts';
import PayPalButton from './PayPalButton'; // Импортируем PayPalButton
import {withRouter} from 'react-router-dom'; // Добавляем withRouter

const Basket = ({history}) => {
    const basket = BasketStore;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [savedComment, setSavedComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleRemoveFromBasket = (deviceId) => {
        basket.removeFromBasket(deviceId);
    };

    const handleOrder = () => {
        console.log("Proceed to payment");
    };

    const handleGoToShop = () => {
        history.push(SHOP_ROUTE);
    };

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    const handleSaveComment = () => {
        const fullComment = `Ім'я: ${firstName}, Прізвище: ${lastName}, Телефон: ${phone}, Комментар: ${comment}`;
        setSavedComment(fullComment);
        setFirstName('');
        setLastName('');
        setPhone('');
        setComment('');
        setIsEditing(false);
    };

    const handleEditComment = () => {
        setIsEditing(true);
    };

    const handlePaymentSuccess = (details) => {
        console.log('Payment successful:', details);
        // Add logic for successful payment
    };

    const handlePaymentError = (err) => {
        console.error('Payment error:', err);
        // Add logic for payment error
    };

    return (
        <div className="body">
            <h1 className="basketTitle">Ваше замовлення</h1>

            {basket.totalItems === 0 ? (
                <div className="emptyBasketContainer">
                    <p className="messageAboutEmptyBasket">Ваш кошик порожній</p>
                    <Button  className="btnToTheStore" onClick={handleGoToShop}>
                        Перейти до вибору товарів
                    </Button>
                </div>
            ) : (
                <>
                    <Button style={{cursor:'pointer', margin:'1%'}} onClick={handleGoToShop}>
                        Перейти до вибору товарів
                    </Button>
                    <ListGroup>
                        {basket.basket.map((device) => (
                            <ListGroup.Item
                                key={device.id}
                                className="d-flex justify-content-between align-items-center"
                            >
                                <div style={{ width: '120px' }}> {/* Set a fixed width */}
                                    <Image
                                        width={120}
                                        height={120}
                                        src={process.env.REACT_APP_API_URL + device.img}
                                        alt={device.name}
                                    />
                                </div>
                                <div style={{ flex: '1' }}>{/* Allow flex to take remaining space */}
                                    <div className="deviceName">{device.name}</div>
                                </div>
                                <div style={{ width: '80px' }}>{/* Set a fixed width */}
                                    <div className="devicePrice">{device.price} грн.</div>
                                </div>
                                <Button style={{marginLeft:'10%'}}
                                    variant="danger"
                                    onClick={() => handleRemoveFromBasket(device.id)}
                                >
                                    Видалити з кошика
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>



                    <div className="mt-3" id="sumOfOrder">
                        <h4 className="orderPrice">Сума замовлення:</h4>
                        <h4 className="orderPrice">{basket.totalPriceHrivna} грн. =

                       {basket.totalPrice} $ </h4>
                        <div style={{ width: '200px', height: '50px' }}>
                            <PayPalButton
                                amount={basket.totalPrice}
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </div>

                    </div>

                    <Form.Group controlId="formComment">
                    <div className="commentBox">
                        <h3>Інформація про отримувача</h3>
                        {savedComment && !isEditing ? (
                            <div>
                                <h5>Ваш коментар:</h5>
                                <p>{savedComment}</p>
                                <Button variant="primary" onClick={handleEditComment}>
                                    Редагувати коментар
                                </Button>
                            </div>
                        ) : (
                            <>

                                <Form.Control style={{marginBottom: '30px', columns: 1}}
                                              type="text"
                                              placeholder="Ім'я"
                                              value={firstName}
                                              onChange={handleChangeFirstName}
                                />
                                <Form.Control style={{marginBottom: '30px', columns: 2}}
                                              type="text"
                                              placeholder="Прізвище"
                                              value={lastName}
                                              onChange={handleChangeLastName}
                                />
                                <Form.Control style={{marginBottom: '30px'}}
                                              type="text"
                                              placeholder="Телефон"
                                              value={phone}
                                              onChange={handleChangePhone}
                                />
                                <Form.Control style={{marginBottom: '30px'}}
                                              as="textarea"
                                              rows={3}
                                              placeholder="Коментар"
                                              value={comment}
                                              onChange={handleChangeComment}
                                />
                                <div className="d-flex flex-row">
                                    <Button variant="primary" onClick={handleSaveComment}>
                                        {savedComment ? 'Зберегти зміни' : 'Зберегти коментар'}
                                    </Button>
                                    <Button id="delveryBtn" onClick={handleOrder} className="ml-3">
                                        Обрати спосіб доставки
                                    </Button>
                                </div>

                            </>
                        )}

                    </div>
                </Form.Group>
                </>
            )}
        </div>
    );
};

export default withRouter(observer(Basket));
