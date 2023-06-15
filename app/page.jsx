
import Link from 'next/link'

import { FooterBanner, HeroBanner, Products } from '@/components'
import { getProducts, getBanner } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'




const Home = async () => {

  const products = await getProducts()
  const banner = await getBanner()

  //console.log(products);
  //console.log(banner);

  return (
    <>
       <HeroBanner heroBanner={banner[0]}/>
    <div className='products-heading'>
      <h2 >Our Products</h2>
    </div>

    <div className='products-container'>
      {products?.map((product) =>  (
        <Products key={product._id} products={product} /> 
      ))}
    </div>

    <FooterBanner footerBanner={banner[0]} />
    </>
  )
}


/*export async function getStaticProps () {
  const query = `*[_type == "product"]` ; //grab all the products from sanity server
  const product = await client.fetch(query)

  const bannerQuery = `*[_type == "banner"]`; //grab the banner from sanity server
  const banner = await client.fetch(bannerQuery)

    return {
      props: {
          product
      }
    }
}*/


export default Home

