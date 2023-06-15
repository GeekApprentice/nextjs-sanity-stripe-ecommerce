import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'

const Products = ({products: {image, slug, name, price}}) => {
  return (
    <div>
        <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
            <img src={urlForImage(image && image[0]).url()} alt={name}
            width={250}
            height={250}
            className='product-image' />
            <p className='product-name'>{name}</p>
            <p className='product-price'>${price}</p>
        </div>
        </Link>
    </div>
  )
}

export default Products