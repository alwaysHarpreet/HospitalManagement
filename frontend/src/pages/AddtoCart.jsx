import React, { useEffect, useState } from 'react';
import useRazorpay from 'react-razorpay';
import { CheckoutPayment, GetUserCart, deleteFromUserCart, getMedicines, paymentVerification } from '../Api';
import { ToastContainer, toast } from 'react-toastify';
import { GetStore } from '../helper/Medcinefuncations';
const AddtoCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0)
  
  // add the varaible for the getting  user id  is UserId

  const GetUsercartitems =()=>{ 
    const CartIds = GetStore();
    CartIds.forEach((element) => {
       getMedicines(element.medicineId).then((res) => {
        setCartItems((prev) => {
          return [...prev  , { ...res.data, cartId: element.CartId, quantity: element.quantity ,totalPrice: element.totalPrice}];
        });
       })
    });
  }

  useEffect(()=>{
    GetUsercartitems();
  },[])
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotal();
  };
  console.log("this are the no of cartitems",cartItems);
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    calculateTotal();
  };

  const removeItem = (itemId) => {
    deleteFromUserCart({
      CartId:itemId
    }).then(()=>{
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      calculateTotal();
    }).catch((err)=>{
      console.log("the error in removing cart addtocart page", err );
    })
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
    setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  };

  // handlePayment Function
  const handleBuyNow = () => {
    try { 
      const data = CheckoutPayment({ amount: totalPrice })
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "healthmatrix",
      description: "Your buying something important for your health",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const verifyResponse = paymentVerification({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          const verifyData = verifyResponse.data;

          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#11a33c"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  return (
    <div className="cart-page">
      <ToastContainer/>
      <div className="cart-page__items">
      <h2 className="cart-page__title">My Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-page__item">
            <img src={item.image} alt={item.name} className='cart-page__item-img' />
            <div className='cart-page__item-info'>
            <span className="cart-page__item-name">{item.name}</span>
            <p className='cart-page__item-desc'>{item.description?.split(' ').slice(0, 23).join(' ') + '...'}</p>

            <div className="cart-page__item-qty">
              <button
                onClick={() => increaseQuantity(item.id)}
                className="cart-page__qty-btn cart-page__qty-btn--increase"
              >
                +
              </button>
              <span className="cart-page__qty-count">{item.quantity}</span>
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="cart-page__qty-btn cart-page__qty-btn--decrease"
              >
                -
              </button>
            </div>
            <span className="cart-page__item-price">${item.price}</span>
            <button
              onClick={() => removeItem(item.id)}
              className="cart-page__item-remove"
            >
              Remove
            </button>
          </div>
          </div>
        ))}
      </div>
      <div className="cart-page__summary">
        <div className="cart-page__summary-row">
          <span>Total Items:</span>
          <span className="cart-page__summary-value">{totalItems}</span>
        </div>
        <div className="cart-page__summary-row">
          <span>Total Price:</span>
          <span className="cart-page__summary-value">${totalPrice}</span>
        </div>
        <button
          onClick={handleBuyNow}
          className="cart-page__buy-btn"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddtoCart;