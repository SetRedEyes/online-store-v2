import React, { useState } from "react"
import { Button, Card } from "react-bootstrap"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { getItemsInCart, itemAdded, itemRemoved } from "../../store/cart"

const VolumePrice = ({ product }) => {
    const dispatch = useDispatch()
    const [price, setPrice] = useState(null)
    const [activeBtn, setActiveBtn] = useState(0)
    const items = useSelector(getItemsInCart())
    const isItemInCart = items.some(
        (item) =>
            item._id === product._id && product.volume[activeBtn] === item.volume
    )

    const renderPrice = (volumeIndex, product) => {
        setActiveBtn(volumeIndex)
        setPrice(product.price[volumeIndex])
        console.log(product.price[volumeIndex])
        console.log(product.volume[volumeIndex])
    }

    const handleClick = (e) => {
        e.stopPropagation()
        if (isItemInCart) {
            dispatch(itemRemoved(product._id + product.volume[activeBtn]))
        } else {
            dispatch(
                itemAdded({
                    ...product,
                    price: product.price[activeBtn],
                    volume: product.volume[activeBtn]
                })
            )
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                {product.volume.map((item, index) => (
                    <Button
                        key={item}
                        variant="light"
                        className={`text-nowrap volume-btn ${
                            activeBtn === index ? "enableFocus " : "disableFocus"
                        }`}
                        onClick={() => renderPrice(index, product)}
                        onMouseEnter={() => renderPrice(index, product)}
                    >
                        {`${item} мл`}
                    </Button>
                ))}
            </div>
            <div className="d-flex align-items-end justify-content-between mt-4 ">
                <Card.Title>
                    {!price || product.price.length === 1
                        ? `${product.price[0]} грн`
                        : `${price} грн`}
                </Card.Title>
                <div
                    role="button"
                    onClick={handleClick}
                    // variant="secondary"
                    className={
                        isItemInCart && product.volume[activeBtn]
                            ? "grey-btn"
                            : "action-btn"
                    }
                >
                    {isItemInCart && product.volume[activeBtn]
                        ? "Убрать из корзины"
                        : "В Корзину"}
                </div>
            </div>
        </>
    )
}
VolumePrice.propTypes = {
    product: PropTypes.object.isRequired
}
export default VolumePrice
