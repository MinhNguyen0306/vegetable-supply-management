import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'src/components/common/Button';
import SelectForm from 'src/components/form/SelectForm';

const types: {type: string, display: string}[] = [
    {type: "all", display: "Tất cả"},
    {type: "active", display: "Đang hoạt động"},
    {type: "disable", display: "Đã ẩn"},
    {type: "resolving", display: "Chờ duyệt"}, 
    {type: "soldout", display: "Hết hàng"}
]

const datas = [
    {
        id: 1,
        name: "rau xa lach",
        category: "rau",
        unit: "200g/kg",
        price: 20000,
        stock: 50,
        benefit: 10000,
    },
    {
        id: 2,
        name: "rau xa",
        category: "rau",
        unit: "200g/kg",
        price: 20000,
        stock: 50,
        benefit: 10000,
    },
    {
        id: 3,
        name: "Ca rot",
        category: "rau",
        unit: "200g/kg",
        price: 20000,
        stock: 50,
        benefit: 10000,
    }
]

const actions = [
    {
        value: "detail",
        display: "Xem chi tiết"
    },
    {
        value: "edit",
        display: "Chỉnh sửa"
    },
    {
        value: "delete",
        display: "Xóa"
    }
]

const ManageVegetableContainer = () => {

    const { pathname } = useLocation(); 
    const navigate = useNavigate();

    const active = types.findIndex(type => type.type === pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length));

    const handleChangeTab = (type: string) => {
        navigate(`${pathname.slice(0, pathname.lastIndexOf("/"))}/${type}`)
    }

    useEffect(() => {
        if(active === -1) {
            navigate("/404")
        }
    }, [])

    return (
        <div className='flex flex-col bg-white min-h-[200px] w-11/12'>
            <div className='border-b-gray-100 h-[50px] w-full'>
                <div className='flex border-b-2 items-center justify-start px-5'>
                    {
                        types.map((type, index) => (
                            <div 
                                key={index} 
                                className={`h-full w-max px-5 cursor-pointer leading-[50px] hover:text-mainColor
                                transition-all duration-300 border-b-4 border-b-transparent 
                                ${index === active ? "text-mainColor !border-b-mainColor" : ""}`}
                                onClick={() => handleChangeTab(type.type)}
                            >
                                {type.display}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='border-2 border-gray-200 rounded mt-5'>
                <div className='m-0 p-0 bg-gray-200'>
                    <table className='w-full'>
                        <colgroup span={8}>
                            <col width={100}/>
                            <col width={200}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>

                        </colgroup>
                        <thead className='bg-mainColor text-slate-50'>
                            <tr>
                                <th className='p-4'>
                                    <span>Id</span>
                                </th>
                                <th colSpan={1}>
                                    <span>Ten san pham</span>
                                </th>
                                <th className='p-4'>
                                    <span>Danh muc san pham</span>
                                </th>
                                <th className='p-4'>
                                    <span>Don vi</span>
                                </th>
                                <th className='p-4'>
                                    <span>Gia</span>
                                </th>
                                <th className='p-4'>
                                    <span>Con lai</span>
                                </th>
                                <th className='p-4'>
                                    <span>Doanh thu</span>
                                </th>
                                <th className='p-4'>
                                    Thao tac
                                </th>
                            </tr>
                        </thead>
                        <tbody className='[&>*:nth-child(even)]:bg-slate-100'>
                            {
                                datas.map((data, index) => (
                                    <tr key={index}>
                                        <td className='p-4 text-center'>
                                            {data.id}
                                        </td>
                                        <td className='p-4 text-left break-all'>
                                            {data.name}
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.category}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.unit}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.price}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.stock}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.benefit }</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <SelectForm 
                                                name='action'
                                                label='Thao tác'
                                                options={actions}
                                                keyValue="value"
                                                keyDisplay='display'
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageVegetableContainer
