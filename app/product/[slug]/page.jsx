'use client'
import React, { useState, useEffect } from 'react'

import { client } from '@/sanity/lib/client'
import { getProductDetail, getProducts } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Products } from '@/components'
import { useStateContext } from '@/context/StateContext'


export const generateStaticParams = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`

    const products = await client.fetch(query)

    return products.map((product) => ({
        slug: product.slug.current
    }))
}


const ProductDetails = ({ params }) => {
    const [index, setIndex] = useState(0)
    const [product, setProduct] = useState([])
    const [products, setProducts] = useState([])
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()
    
    //console.log(product);
    const { slug } = params
    //console.log(slug);

    useEffect(() => {
        const getOneProduct = async () => {
            const sanityProduct = await getProductDetail(slug)
            setProduct(sanityProduct)
        }

        getOneProduct()
    }, [slug])

    useEffect(() => {
        const getAllProducts = async () => {
            const allProducts = await getProducts()
            setProducts(allProducts)
        }
        getAllProducts()
    }, [])


    const { image, price, detail, name } = product

    const handleBuyNow = () => {
        onAdd(product, qty)

        setShowCart(true)
    }

    const changeImageHover = (indx) => setIndex(indx)
    
    //console.log(product);

    if(product.length === 0 || products.length === 0) return 'loading'


    return (
        <div>
            <div className='product-detail-container'>

                <div>
                    <div className='image-container'>
                        <img src={urlForImage(image && image[index])} alt={name} className='product-detail-image' />
                    </div>
                <div className='small-images-container'>
                    {image?.map((img, indx) => (
                         <img src={urlForImage(img)} key={indx}
                         className={indx === index ? 'small-image selected-image' : 'small-image'}
                         onMouseEnter={() => changeImageHover(indx)}
                         height={200}
                         width={200}/>
                    ))}
                </div>
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{detail}</p>
                    <p className='price'>${price}</p>

                    <div className='quantity'>
                        <h3>Quantity: </h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num' value>
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>

                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                    </div>

                    </div>
            </div>

            <div className='maylike-products-wrapper'>
                <h2>You make also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products?.map((item) => (
                            <Products key={item._id} products={item}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}





export default ProductDetails