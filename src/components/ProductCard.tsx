import {numberWithCommas, txtSlicer} from "../utils/functions";
import Image from "./Image";
import {IProduct} from "../interfaces";
import Button from "../ui/Button";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditIdx: (value: number) => void;
  idx: number;
}
function ProductCard({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
}: IProps) {
  // ** Render
  const renderProductColors = product.colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  // ** Handlers
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imageUrl={product.imageURL}
        alt={product.title}
        className="rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{product.title} </h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(product.description)}
      </p>

      <div className="flex items-center my-4 flex-wrap gap-x-1  ">
        {renderProductColors}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-indigo-600 font-bold text-xl">
          ${numberWithCommas(product.price)}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{product.category.name}</span>
          <Image
            imageUrl={product.category.imageURL}
            alt={product.category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <Button onClick={onEdit} className="bg-indigo-700 hover:bg-indigo-800">
          Edit
        </Button>
        <Button className="bg-red-700 hover:bg-red-800">Remove</Button>
      </div>
    </div>
  );
}

export default ProductCard;
