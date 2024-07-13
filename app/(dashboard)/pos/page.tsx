import ProductList from "@/components/pos/pos-product";
import OrderList from "@/components/pos/pos-order";

const POS = () => {
    return (
      <div className="w-full bg-gray-200 px-4 py-2 h-screen">
        <div className="flex justify-between">
          <div className="w-[55%] h-[39rem]">
            <ProductList />
          </div>
          <div className="w-2/5 bg-white px-6 py-4 rounded-lg">
            <OrderList />
          </div>
            
        </div>
        
      </div>
    );
  };
  
  export default POS;