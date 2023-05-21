import Button from "src/components/common/Button";
import Topbar from "../components/common/Header/Topbar";
import { useNavigate } from "react-router-dom";
import Images from "src/assets/images";

const UnauthorizePage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col mx-auto w-max min-h-screen items-center justify-center gap-2">
                <img src={Images.UNAUTHORIZE} alt="Not found" className="w-full h-72 mb-5"/>
                <h1 className="font-bold text-lg">Đã có lỗi xảy ra!</h1>
                <span className="mb-2">Quyền truy cập không hợp lệ!</span>
                <Button rounded outlined onClick={() => navigate(-1)}>Về trang trước</Button>
            </div>
        </>
    )
}

export default UnauthorizePage
