import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddtoUserCart, getMedicines } from '../Api';
function SingleMedicine() {
  const [product, setproduct] = useState({})
  const productId = useParams().id
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  console.log(productId);

  const fetchProductDetails = async () => {
    setLoading(true)
    getMedicines(productId).then((res) => {
      setLoading(false)
      console.log(res);
      setproduct(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  const handleAddToCart = async (e, id) => {
    await AddtoUserCart({
      userId,
      medicineId: productId,
      quantity: 1,
      price: product.price,
      discount: product.discount
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleBuyProduct = async () => {
    await AddtoUserCart({
      userId,
      medicineId: productId,
      quantity: 1,
      price: product.price,
      discount: product.discount
    }).catch((err) => {
      console.log(err);
    })
    navigate("/medicine-cart")

  }
  return (
    <>
      <div className="single-medicine">
        <div className="single-medicine__row">
          <div className="single-medicine__img-col">
            <img src={product.image} alt={product.name} className="single-medicine__img" />
          </div>
          <div className="single-medicine__info">
            <h1 className='single-medicine__name'>{product.name}</h1>
            <p className='single-medicine__desc'>{product.description}</p>
            <p className='single-medicine__detail'>Price: {product.price}</p>
            <p className='single-medicine__detail'>Discount: {product.discount}</p>
            <p className='single-medicine__detail'>Stock: {product.stock}</p>
            <button className="single-medicine__btn single-medicine__btn--cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="single-medicine__btn single-medicine__btn--buy" onClick={handleBuyProduct}>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleMedicine