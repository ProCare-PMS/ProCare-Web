'use client';
import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/Tables/data-table';
import { Data } from './Data';
import { Column } from './Column';
import BackButton from '@/components/BackButtton/BackButton';


function DailySales() {
    return (
        <>
          <div className="container-fluid bg-white rounded-xl mx-4 p-5">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <span className="block">
                  <BackButton />
                </span>
                 <h3 className="font-bold text-lg">Items in Stock</h3>
              </div>
              <div>
                <div className="flex gap-4">
                    <div className="iconInputholder flex items-center gap-4 border-2 border-[#EAEBF0] rounded-2xl px-2">
                        <span className="w-7 h-10 flex justify-center items-center px-1">
                            <Image src="/assets/images/searchVector.svg" alt="search icon" width={100} height={100}/>
                        </span>
                        <span className="inputHolder">
                            <input
                                type="text"
                                className="outline-0 h-6 border-none"
                                placeholder="Search for product"
                            />
                        </span>
                    </div>
    
                  <span className="iconHolder w-10 h-10">
                    <Image src="/assets/images/filterFrame.svg" alt="filter icon" width={100} height={100} />
                  </span>
                </div>
              </div>
            </div>
    
            {/* table content */}
                <div className="mt-5">
                  <DataTable
                  data={Data}
                  columns={Column}
                  />
                </div>
            {/* table content end */}
          </div>
        </>
      );
}

export default DailySales