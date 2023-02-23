import PocketBase from 'pocketbase'
const CMSurl = process.env.NEXT_PUBLIC_CMSurl

export async function getCategories() {
  const pb = new PocketBase(CMSurl)
  const categories = await pb.collection('categories').getFullList()
  return categories
}

export default async function handler(req, res) {
  const data = await getCategories()
  res.status(200).json(data)
}
