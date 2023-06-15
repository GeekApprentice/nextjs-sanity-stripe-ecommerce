import { createClient, groq } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, token} from '../env'

export const client = createClient({
  projectId: 'gt9k520m',
  dataset: 'production',
  apiVersion: '2023-05-25',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})


export async function getProducts() {
return await client.fetch(
  groq`*[_type == "product"]`
)
}

export async function getProductDetail(slug) {
    return await client.fetch(
  groq`*[_type == "product" && slug.current == "${slug}"][0]`
)
}



export async function getBanner() {
  return await client.fetch(
    groq`*[_type == "banner"]`
  )
}
