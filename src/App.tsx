import {useState, ChangeEvent, FormEvent} from "react";
import ProductCard from "./components/ProductCard";
import {colors, formInputsList, productList} from "./data";
import MyDialog from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";
import {IProduct} from "./interfaces";
import {productValidation} from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import {v4 as uuid} from "uuid";
// Alt + shift + o
function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // ** States
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  console.log(tempColor);

  // ** Handlers
  function closeModal() {
    setIsOpen(false);
    setProduct(defaultProductObj);
  }

  function openModal() {
    setIsOpen(true);
  }
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setProduct({...product, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  }
  function submitHandler(e: FormEvent<HTMLFormElement>) {
    const {title, description, imageURL, price} = product;
    e.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    console.log(errors);

    // ** check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMessage =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMessage) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      ...prev,
      {...product, id: uuid(), colors: tempColor},
    ]);
    // setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();

    console.log("Send This Product To Our Server");
  }
  // ** Renders
  const renderProductList = products.map((product) => (
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

      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((c) => c !== color));
        } else {
          setTempColor((prev) => [...prev, color]);
        }
      }}
    />
  ));
  return (
    <main className="container ">
      <Button
        onClick={() => openModal()}
        width="w-fit"
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
      >
        Build Product
      </Button>
      <div className="m-5 grid  grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
        {renderProductList}
      </div>
      <MyDialog
        isOpen={isOpen}
        closeModal={closeModal}
        title="Add A New Product"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center my-4 flex-wrap gap-x-1  ">
            {renderProductColors}
          </div>
          <div className="flex items-center my-4 flex-wrap gap-x-1  ">
            {tempColor.map((color) => (
              <span
                key={Math.random()}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{backgroundColor: color}}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Sumbit
            </Button>
            <Button
              onClick={closeModal}
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
