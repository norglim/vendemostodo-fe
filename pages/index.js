import Products from "@/components/Products";

export default function Home({categories,products}) {
  return(
    <>
      <header className="p-2 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Vendemos todo 🙂</h1>
        <hr />
      </header>
      <section className="max-w-xl mx-auto px-2">
        <Products categories={categories} products={products}/>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const resCategories = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/categories`)
  const categories = await resCategories.json()
  const resProducts = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/products`)
  const products = await resProducts.json()

  return {
    props: {categories,products},
  }
}