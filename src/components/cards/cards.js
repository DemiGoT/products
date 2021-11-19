import React, { useEffect, useState } from 'react';
import { productLoaded } from "../../actions/actions";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Spinner from "../spinner/spinner";
import "./cards.css"
import ProductService from '../../services/product-services';
import ProductModal from '../modal/product-modal';

const { getProducts } = new ProductService();

Modal.setAppElement('#root')

function Cards({ products, productLoadedFunc }) {

    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState({});

    useEffect(() => {
        getProducts().then((productData) => {
            productLoadedFunc(productData.data);
            setLoading(false);
        });
    }, [productLoadedFunc])

    function openModal(product) {
        setActiveProduct(product);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function findCheapest() {
        const chiepest = products.reduce((prev, curr) => { return prev.price < curr.price ? prev : curr });
        openModal(chiepest);
    }

    return (
        <div className="cards">
            <div className="container">
                {loading &&
                    <Spinner />
                }
                {!loading &&
                    <React.Fragment>
                        <div className="cards-list row g-4">
                            {
                                products.map((product) => {
                                    return (
                                        <div key={product.name} className="col col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                            <div className="cards-list-item">
                                                <p className="cards-list-item__category">{product.category}</p>
                                                <p className="cards-list-item__name">{product.name}</p>
                                                <div className="cards-list-item-wrap">
                                                    <p className="cards-list-item__price">{product.price}</p>
                                                    <button type="button" className="btn" onClick={() => openModal(product)}>Buy</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="card-cheapest">
                            <button type="button" className="btn" onClick={() => findCheapest()}>Buy Cheapest</button>
                        </div>
                    </React.Fragment>
                }
                <ProductModal closeModal={closeModal} modalIsOpen={modalIsOpen} activeProduct={activeProduct} />
            </div>
        </div>
    );
}

const mapStateToProps = ({ products }) => {
    return { products };
};

const mapDispatchToProps = {
    productLoadedFunc: productLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
