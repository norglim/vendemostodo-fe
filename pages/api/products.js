import PocketBase from 'pocketbase'
const CMSurl = process.env.NEXT_PUBLIC_CMSurl

export async function getProductsFullList() {
  const pb = new PocketBase(CMSurl)
  const products = await pb.collection('products').getFullList()
  return products
}

export async function getProductByID(id) {
  const pb = new PocketBase(CMSurl)
  const products = await pb.collection('products').getOne(id)
  return products
}

export default async function handler(req, res) {
  const data = req.query.id ? await getProductByID(req.query.id) : await getProductsFullList()
  res.status(200).json(data)
}
