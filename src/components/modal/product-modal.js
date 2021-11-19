import React, { useState, useEffect } from 'react';
import './modals.css';
import "../cards/cards.css"
import Modal from 'react-modal';
import BuyFormValidator from "../../services/buy-form-validator";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        marginRight: '-50%',
        position: 'absolute',
        width: 'auto',
        minWidth: '384px',
        maxWidth: '100%',
        height: 'auto',
        padding: '50px',
        backgroundColor: '#fff',
        outline: 'none',
        borderRadius: '24px',
        display: 'block',
        overflow: 'visible',
    }
};

Modal.setAppElement('#root');

function ProductModal({ activeProduct, modalIsOpen, closeModal, cheapest }) {

    const [user, setUser] = useState({});
    const [product, setProduct] = useState();
    const [validation, setValidation] = useState({
        name: {
            error: '',
            validated: false,
        },
        phone: {
            error: '',
            validated: false,
        }
    });

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
        setValidation({
            ...validation,
            [event.target.name]: {
                error: null,
                validated: false,
            }
        });
    }

    useEffect(() => {
        setProduct(activeProduct);
    }, [activeProduct]);

    function handleValidator(e, validator) {
        setValidation({
            ...validation,
            [e.target.name]: {
                error: BuyFormValidator[validator](e.target.value),
                validated: true,
            }
        })
    }

    function onSubmitForm(user) {
        const validationObj = {
            phone: {
                error: BuyFormValidator.validatePhone(user.phone),
                validated: true,
            },
            name: {
                error: BuyFormValidator.validateName(user.name),
                validated: true,
            }
        }
        
        setValidation(validationObj);

        if (!validationObj.name.error && !validationObj.phone.error) {
            console.log(user);
        }

    }

    return (
        <Modal
            className="modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="modal-close">
                <span className="btn-close" onClick={closeModal}></span>
            </div>
            {activeProduct &&
                <div className="cards-list-item">
                    <p className="cards-list-item__category">{activeProduct.category}</p>
                    <p className="cards-list-item__name">{activeProduct.name}</p>
                    <p className="cards-list-item__price">{activeProduct.price}</p>
                </div>
            }
            {cheapest &&
                <div className="cards-list-item">
                    <p className="cards-list-item__category">{cheapest.category}</p>
                    <p className="cards-list-item__name">{cheapest.name}</p>
                    <p className="cards-list-item__price">{cheapest.price}</p>
                </div>
            }
            <div>
                <label className="form-label modal-label">
                    <input
                        name="name"
                        type="text"
                        defaultValue=""
                        placeholder="Name"
                        className={`form-control ${validation.name.error ? 'error' : ''} ${validation.name.validated && !validation.name.error ? 'success' : ''}`}
                        onChange={(e) => handleChange(e, 'validateName')}
                        onBlur={(e) => {
                            handleValidator(e, 'validateName');
                        }}>
                    </input>
                    {validation.name.error === "invalidEmail" &&
                        <span>Only letters allowed</span>
                    }
                    {validation.name.error === "required" &&
                        <span>This field is required</span>
                    }
                </label>
                <label className="form-label modal-label">
                    <input
                        name="phone"
                        type="tel"
                        defaultValue=""
                        placeholder="Number"
                        className={`form-control ${validation.phone.error ? 'error' : ''} ${validation.phone.validated && !validation.phone.error ? 'success' : ''}`}
                        onChange={(e) => handleChange(e, 'validatePhone')}
                        onBlur={(e) => {
                            handleValidator(e, 'validatePhone');
                        }}>
                    </input>
                    {validation.phone.error === "invalidPhone" &&
                        <span>Only numbers allowed</span>
                    }
                    {validation.phone.error === "invalidCharacters" &&
                        <span>Should contain 12 characters</span>
                    }
                    {validation.phone.error === "required" &&
                        <span>This field is required</span>
                    }
                </label>
                <div className="modal-buttons">
                    <button type="button" className="btn modal-button" onClick={() => onSubmitForm(user)}>Order</button>
                </div>
            </div>
        </Modal>
    );
}

export default ProductModal;