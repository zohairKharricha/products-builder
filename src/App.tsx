import {useState} from "react";
import ProductCard from "./components/ProductCard";
import {productList} from "./components/data";
import MyDialog from "./components/ui/Modal";
import Button from "./components/ui/Button";
// Alt + shift + o
function App() {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  // ** Handlers
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container  ">
      <Button
        onClick={() => openModal()}
        width="w-fit"
        className=" px-5 bg-indigo-700 hover:bg-indigo-800"
      >
        Add
      </Button>
      <div className="m-5 grid  grid-cols-1  gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
        {renderProductList}
      </div>
      <MyDialog
        isOpen={isOpen}
        closeModal={closeModal}
        title="Add A New Product"
      >
        <div className="flex items-center space-x-3">
          <Button className="  bg-indigo-700 hover:bg-indigo-800">
            Sumbit
          </Button>
          <Button
            onClick={() => closeModal()}
            className="bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </MyDialog>
    </main>
  );
}

export default App;
