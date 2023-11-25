import {txtSlicer} from "../utils/functions";
import Image from "./Image";
import {IProduct} from "./interfaces";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
function ProductCard({product}: IProps) {
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imageUrl={product.imageURL}
        alt={product.title}
        className="rounded-md mb-2"
      />
      <h3>{product.title} </h3>
      <p>{txtSlicer(product.description)}</p>

      <div className="flex items-center my-4 space-x-2">
        {product.colors.map((color) => (
          <span
            key={color}
            className={`w-5 h-5 bg-[${color}] rounded-full cursor-pointer`}
          />
        ))}
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
