import {txtSlicer} from "../utils/functions";
import Image from "./Image";
import {IProduct} from "../interfaces";
import Button from "../ui/Button";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
}
function ProductCard({product}: IProps) {
  const renderProductColors = product.colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
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
        <p className="text-indigo-600 font-bold text-xl">${product.price}</p>
        <Image
          className="h-10 w-10 rounded-full object-cover"
          imageUrl={product.category.imageURL}
          alt={product.category.name}
        />
      </div>
      <div className="flex items-center gap-2 mt-5">
        <Button className="bg-indigo-700 hover:bg-indigo-800">Edit</Button>
        <Button className="bg-red-700 hover:bg-red-800">Destroy</Button>
      </div>
    </div>
  );
}

export default ProductCard;
