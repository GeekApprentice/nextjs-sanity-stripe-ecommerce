import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"


const Footer = () => {
  return (
    <div className="footer-container">
      <p>Eddy Gonzalez - 2023 gadgets nextjs-sanity e-commerce with stripe payment integration example. All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer