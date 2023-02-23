import Link from "next/link"
import { useState } from "react"

export default function Products({categories,products}) {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const filterProducts = (e) => {
    const selectedCategoryId = e.target.value

    const filterProducts = () => {
      const newProductsList = products.filter(product => {
        if(product.categories == selectedCategoryId) return product
      })
      setFilteredProducts(newProductsList)
    }

    return selectedCategoryId !== 'all' ? filterProducts() : setFilteredProducts(products)
  }
  return(
    <>
      <select type="text" className="border border-black p-2 my-4 w-full bg-black text-white cursor-pointer shadow-xl border" placeholder="Buscar" onChange={(e) => filterProducts(e)}>
        <option default value="all" >Todas las categorías</option>
        {categories.map(category => (
          <option value={category.id} key={category.id}>{category.title}</option>
        ))}
      </select>
      <hr />
      {filteredProducts.length > 0 
      ?
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredProducts.map(product => (
        <div className="product-wrapper rounded-md shadow-xl mb-2 mt-6 p-3" key={product.id}>
          <img src={`${process.env.NEXT_PUBLIC_CMSurl}/api/files/products/${product.id}/${product.img[0]}`} alt="" className="rounded-md shadow-md w-full h-48 object-cover"/>
          <div className="p-2 mt-3">
            <p className="font-bold text-xl">{product.title}</p>
            <p className="text-xl">${product.price}</p>
            <Link href={`/products/${product.id}`}>
            <button className="bg-blue-500 text-white px-3 py-1 text-center shadow-md mt-4 w-full rounded-md">Ver más</button>
            </Link>
          </div>
        </div>
      ))}
      </section> 
      : 
      <>
        <p className="mt-4">Ya vendimos los productos de esta categoría :(</p>
      </>
    }
  </>
)}