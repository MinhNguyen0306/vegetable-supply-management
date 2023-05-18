import { 
    BiHomeAlt,
    BiAddToQueue,
    BiUser
} from "react-icons/bi";
import {
    AiOutlineTransaction,
    AiOutlinePieChart,
    AiOutlineLogout
} from "react-icons/ai";
import Images from "src/assets/images";

interface ISidebar {
    icon?: any;
    title: string;
    path?: string;
    children?: {
        title: string,
        path: string,
    }[];
}

const sidebarProviderNav: ISidebar[] = [
    {
        icon: <BiAddToQueue className='sidebar-item-icon'/>,
        title: "Quản lý sản phẩm",
        children: [
            {
                title: "Tất cả sản phẩm",
                path: "/provider/product/list/all"
            },
            {
                title: "Thêm sản phẩm",
                path: "/provider/product/add-product"
            },
            {
                title: "Sản phẩm không chuẩn",
                path: "/provider/product/standard"
            },
            {
                title: "Cài đặt sản phẩm",
                path: "/provider/setting"
            }
        ]
    },
    {
        icon: <AiOutlineTransaction className='sidebar-item-icon'/>,
        title: "Quản lý đơn hàng",
        children: [
            {
                title: "Tất cả",
                path: "/provider/order"
            },
            {
                title: "Đơn giao",
                path: "/provider/order/delivery"
            }
        ]
    },
    {
        icon: <AiOutlinePieChart className='sidebar-item-icon'/>,
        title: "Thống kê",
        path: "/provider/statistical"
    },
]

const units = [
    {id: 1, dataName:'200g/bó'},
    {id: 2, dataName:'500g/rổ'}, 
    {id: 3, dataName:'700g/rổ'}, 
    {id: 4, dataName:'1kg/thùng'}
  ]
  
  const categories = [
    {id:1, dataName:'Rau'},
    {id:1, dataName:"Củ"},
    {id:1, dataName:"Quả"}
  ]

const sidebarAdminNav: ISidebar[] = [
    {
        icon: <BiUser className="sidebar-item-icon"/>,
        title: "Quản lý nhà cung cấp",
        path: "/admin/providers"
    }, 
    {
        icon: <AiOutlineTransaction className="sidebar-item-icon"/>,
        title: "Quản lý Đơn hàng",
        path: "/admin/orders"
    },
    {
        icon: <AiOutlinePieChart className="sidebar-item-icon" />,
        title: "Thống kê",
        path: "/admin/statistical"
    },
]

const recentVegetable: {
    id: number|string,
    name: string,
    logo: string,
    price: number,
    releaseDate: string
    provider: string,
  }[] = [
    {
      id: "VG-051321",
      name: "Rau xanh da lat",
      logo: Images.MONGTOI,
      price: 200000,
      releaseDate: "1/2/2023",
      provider: "Nha cung cap 1"
    },
    {
      id: "VG-051321",
      name: "Rau xanh da lat",
      logo: Images.CAROT,
      price: 200000,
      releaseDate: "1/2/2023",
      provider: "Nha cung cap 1"
    },
    {
      id: "VG-051321",
      name: "Rau xanh da lat",
      logo: Images.CAROT,
      price: 200000,
      releaseDate: "1/2/2023",
      provider: "Nha cung cap 1"
    },
    {
      id: "VG-051321",
      name: "Rau xanh da lat",
      logo: Images.CAROT,
      price: 200000,
      releaseDate: "1/2/2023",
      provider: "Nha cung cap 1"
    },
  ]

const menuConfigs = { sidebarProviderNav, sidebarAdminNav, categories, units, recentVegetable }

export default menuConfigs;