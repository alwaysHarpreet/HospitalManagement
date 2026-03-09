import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { CardStore, GetStore } from '../../helper/Medcinefuncations'

function MedicineCard({
    products,
}) { 
    const navigate = useNavigate()
    const [CartId, setCartId] = useState(GetStore())
    const location = useLocation().pathname.replace("/shop-by-category/", " ").trim()
    console.log(location);

    const handleCart = (medi) => {
        const response = CardStore(medi);
        console.log("response", response);
        if (Array.isArray(response)) {
          setCartId(response);
        }
        if (typeof response === 'object' && response !== null && !Array.isArray(response)) {
          setCartId(prevCartId => [...prevCartId, { medicineId: response.medicineId, CartId: response._id }]);
        }
        console.log("cartId", CartId?.some(item => item.medicineId === medi._id));
      } 
      useEffect(() => {
        setCartId(GetStore());
      }, []); // Separate useEffect for CartId
    return (
        <>
                <div className='medicine-grid'>
                    {products?.map((medi, index) => (
                        <div key={index}  className='medicine-card'>
                        <img src={medi.image} onClick={() => navigate(`/buy-medicines/${medi._id}`)} alt={medi.name} className='medicine-card__img' />
                        <p className='medicine-card__name'>{medi.name?.split(' ').slice(0, 2).join(' ') + '...'}</p>
                        <h4 className='medicine-card__price'>
                            {`₹${Math.floor(medi.price - medi.discount)} `}
                            <span className='medicine-card__price-original'>{`₹${medi.price}`}</span>
                            <span className='medicine-card__price-discount'>{`${Math.floor(((medi.price - medi.discount) / medi.price) * 100)-100}% off`}</span>
                        </h4>
                        <button onClick={() => handleCart(medi)} className='medicine-card__add-btn'>
                            {`${CartId.some(item => item.medicineId === medi._id) ? "ADDED" : "ADD"}`}
                        </button>
                    </div>
                    ))
                    }
                </div>
        </>
    )
}

export default MedicineCard