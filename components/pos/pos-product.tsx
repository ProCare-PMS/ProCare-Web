"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { increaseQuantity, decreaseQuantity  } from '@/store/slices/productSlice';
import { addOrder } from '@/store/slices/orderSlice';
import Image from 'next/image';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const handleAddToOrder = (product: any) => {
    dispatch(addOrder({ ...product }));
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price).replace('GHS', '₵');
  };

  return (
    <div className='w-full h-full bg-white px-6 py-4 rounded-lg'>
      <div className='flex justify-between my-6'>
        <h2 className='font-medium'>Products</h2>
        <div className='searchProdut'>
          <input type='text' placeholder='Search for product' className='border border-[#EAEBF0] py-1.5 px-1 rounded-md w-72'/>
        </div>
      </div>

      <div className='w-full h-[27rem] overflow-y-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 rounded-2xl'>
              <tr className='text-[#202224] rounded-2xl'>
                <th scope="col" className="font-medium text-left px-6 py-2">Product Name</th>
                <th scope="col" className="font-medium text-center px-6 py-2">Quantity</th>
                <th scope="col" className="font-medium text-center px-6 py-2">Price</th>
                <th scope="col" className="font-medium text-right px-6 py-2">Action</th>
              </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 text-[#202224]'>
            {products.map((product: any) => (
              <tr key={product.id} className='hover:bg-gray-50 h-12'>
                <td className='px-3 py-1'>{product.name}</td>
                <td className='px-3 py-1 flex justify-evenly gap-2 items-center text-center'>
                  <button className='' onClick={() => dispatch(decreaseQuantity(product.id))}>
                    <span>
                      <Image className="w-full h-full mt-3" src="/assets/images/decrease.svg" width={100} height={100} alt="decrease"/>
                    </span>
                  </button>
                  <span className='flex justify-center items-center mt-3 bg-gray-50 w-10 h-6 rounded-md text-[#202224]'>{product.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(product.id))}>
                  <span>
                      <Image className="w-full h-full mt-3" src="/assets/images/increase.svg" width={100} height={100} alt="increase"/>
                    </span>
                  </button>
                </td>
                <td className='px-3 py-1 text-center'>{formatPrice(product.price)}</td>
                <td className='py-1 text-right'>
                  <button onClick={() => handleAddToOrder(product)}>
                    <span>
                      <Image className="w-full h-full mt-3" src="/assets/images/posAddButton.svg" width={100} height={100} alt="add"/>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end items-center mt-4'>
            <div className='text-[#202224] w-80 flex justify-between items-center'>
              <button className='bg-transparent py-1 px-3 border border-[#D0D5DD] rounded-lg'>Previous</button>
              <button className='bg-transparent py-1 px-3 border border-[#D0D5DD] rounded-lg'>Next</button>
              <div className='bg-transparent py-1 px-3'>
                <span>Result 1 of 10</span>
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProductList;
