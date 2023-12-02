import {useState, ChangeEvent, FormEvent} from "react";
import ProductCard from "./components/ProductCard";
import {categories, colors, formInputsList, productList} from "./data";
import MyDialog from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";
import {IProduct} from "./interfaces";
import {productValidation} from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import {v4 as uuid} from "uuid";
import Select from "./ui/Select";
import {TProductName} from "./types";
import toast, {Toaster} from "react-hot-toast";
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
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log(productToEditIdx);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  console.log(tempColor);

  console.log("product to edit is ", productToEdit);

  // ** Handlers
  function closeModal() {
    setIsOpen(false);
    setProduct(defaultProductObj);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeEditModal() {
    setIsOpenEditModal(false);
  }

  function openEditModal() {
    setIsOpenEditModal(true);
  }
  function closeConfirmModal() {
    setIsOpenConfirmModal(false);
  }

  function openConfirmModal() {
    setIsOpenConfirmModal(true);
  }
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setProduct({...product, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  }
  function onChangeEditHandler(e: ChangeEvent<HTMLInputElement>) {
    setProductToEdit({...productToEdit, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ""});
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {title, description, price, imageURL} = productToEdit;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColor.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
  };

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
      {...product, id: uuid(), colors: tempColor, category: selectedCategory},
      ...prev,
    ]);
    // setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();

    console.log("Send This Product To Our Server");
  }

  function removeProductHandler() {
    console.log("product id ", productToEdit.id);
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast.success("Product Removed Successfully", {
      style: {backgroundColor: "#000", color: "#fff"},
    });
  }
  // ** Renders
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      removeProductHandler={removeProductHandler}
      openConfirmModal={openConfirmModal}
    />
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
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((c) => c !== color));
          return;
        }

        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col ">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <Input
          type={"text"}
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={""} />
      </div>
    );
  };
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
      {/* ADD PRODUCT MODAL */}
      <MyDialog
        isOpen={isOpen}
        closeModal={closeModal}
        title="Add A New Product"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
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
              type="button"
              className="bg-gray-300 hover:bg-gray-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyDialog>
      {/* EDIT PRODUCT MODAL */}
      <MyDialog
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({...productToEdit, category: value});
            }}
          />

          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColor.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{backgroundColor: color}}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyDialog>

      {/* DELETE PRODUCT CONFIRM MODAL */}
      <MyDialog
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </MyDialog>
      <Toaster />
    </main>
  );
}

export default App;
