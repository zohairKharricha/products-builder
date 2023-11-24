import ProductCard from "./components/ProductCard";
import {productList} from "./components/data";
// Alt + shift + o
function App() {
  // ** Renders
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container  text-2xl">
      <div className="m-5 grid  grid-cols-1  gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
        {renderProductList}
      </div>
    </main>
  );
}

export default App;
