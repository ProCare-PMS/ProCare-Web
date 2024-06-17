"use client";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { increaseQuantity, decreaseQuantity } from '@/store/slices/productSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state: RootState) => state.orders.orderList);

  const totalPrice = orderList.reduce((total, item) => total + item.price * item.quantity, 0);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price).replace('GHS', '₵');
  };

  return (
    <div className='w-full h-full flex flex-col justify-between py-4'>
      <div className='my-6'>
        <h1 className='font-medium'>Order List</h1>
      </div>
      <div className='h-[90%] overflow-y-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr className='text-[#202224] rounded-t-lg'>
              <th scope="col" className='font-medium text-left px-6 py-2'>Product Name</th>
              <th scope="col" className='font-medium text-center px-6 py-2'>Quantity</th>
              <th scope="col" className='font-medium text-right px-6 py-2'>Price</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 border-t border-gray-100 text-[#202224]'>
            {orderList.map((product: any) => (
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
                <td className='px-3 py-1 text-right'>{formatPrice(product.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center mt-4'>
            <div className='text-[#202224] flex flex-col justify-between'>
              <div className=''>Total Price</div>
              <div className='font-bold'>₵ 239,040.00</div>
            </div>
            <div>
              <button className='bg-[#2648EA] text-white rounded px-8 py-2'>Complete Order</button>
            </div>
      </div>
    </div>
  );
};

export default OrderList;
