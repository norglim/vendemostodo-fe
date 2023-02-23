import Link from 'next/link'

import { useEffect, useState } from 'react'

export default function ProductPage({categories,product}) {
  const [productCategory,setProductCategory] = useState({})
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    categories.forEach(category => {
      if(product.categories == category.id) setProductCategory(category)
    });
    setMainImage(product.img[0])
  }, [])
  
  const changeImageHandler = (image) => {
    setMainImage(image)
  }

  return(
<>
      <header className="p-2 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Vendemos todo 🙂</h1>
        <Link href="/">
          <p className="text-center my-2 text-blue-500 underline">Volver al inicio</p>
        </Link>
        <hr />
      </header>
      <section className="max-w-xl mx-auto px-2">
        <div className="product-wrapper my-2 p-3" key={product.id}>
          <section className="flex text-3xl mb-4 items-center">
          <h1 className="font-bold bg-black text-white p-1">{product.title}</h1>
          <p className='ml-2'>${product.price}</p>
          </section>
          <section>
            <img src={`${process.env.NEXT_PUBLIC_CMSurl}/api/files/products/${product.id}/${mainImage}`} alt="" className="rounded-md shadow-md w-full h-96 object-cover transition ease-in-out duration-500"/>
          </section>
          <section className='my-4 flex'>
            {product.img.map(each => (
              <img src={`${process.env.NEXT_PUBLIC_CMSurl}/api/files/products/${product.id}/${each}`} alt="" className={`mr-2 cursor-pointer rounded-md shadow-md h-24 w-24 object-cover ${mainImage == each ? 'border border-3 border-black' : 'border-none'} transition ease-in-out duration-500`} onClick={() => {changeImageHandler(each)}}/>
            ))}
          </section>
          <section>
            <p className='bg-white border flex w-min p-1 rounded shadow-md my-2'>
              {productCategory.title}
            </p>
            <div className="py-2 mt-3">
              <div dangerouslySetInnerHTML={{__html: product.description}}></div>
              <Link target="_blank" href={`https://wa.me/${process.env.NEXT_PUBLIC_wa_number}?text=Che,%20me%20interesa%20${product.title}.`}>
              <button className="bg-green-400 text-white px-3 py-1 text-center shadow-md mt-4 w-full rounded-md">Contactar</button>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

ProductPage.getInitialProps = async (ctx) => {
  const resCategories = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/categories`)
  const categories = await resCategories.json()
  const resProduct = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products?id=${ctx.query.id}`)
  const product = await resProduct.json()
  return {
    categories,product
  }
}
