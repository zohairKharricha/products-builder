import {useState, ChangeEvent} from "react";
import ProductCard from "./components/ProductCard";
import {formInputsList, productList} from "./components/data";
import MyDialog from "./components/ui/Modal";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import {IProduct} from "./components/interfaces";
// Alt + shift + o
function App() {
  // ** States
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  // ** Handlers
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setProduct({...product, [e.target.name]: e.target.value});
  }
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col ">
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>

      {/* LINE BELLOW IS WRONG NOW FIX IT */}
      {/* <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[""]}
        onChange={onChangeHandler}
      /> */}
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={""}
        onChange={onChangeHandler}
      />
    </div>
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
        <form className="space-y-3">
          {renderFormInputList}

          <div className="flex items-center space-x-3">
            <Button className="  bg-indigo-700 hover:bg-indigo-800">
              Sumbit
            </Button>
            <Button
              onClick={() => closeModal()}
              className="bg-gray-300 hover:bg-gray-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyDialog>
    </main>
  );
}

export default App;
