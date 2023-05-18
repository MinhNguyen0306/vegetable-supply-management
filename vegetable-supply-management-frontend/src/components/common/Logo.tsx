import { Link } from "react-router-dom"
import Images from "src/assets/images";

const Logo = () => {
  return (
    <div className="md:flex hidden text-lg font-bold justify-center w-auto">
        <Link to="/" className="flex items-center justify-start font-bold text-2xl">
            <img src={Images.LOGO} alt='' className="w-[50px] inline-block bg-cover"/>
            <p className="inline-block">MDKA</p>
          </Link>
    </div>
  )
}

export default Logo
