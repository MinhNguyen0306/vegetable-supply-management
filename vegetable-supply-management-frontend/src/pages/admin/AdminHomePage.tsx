import React from 'react';
import { FcAcceptDatabase, FcDeleteDatabase } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllProviders, getProvidersByStatus, resolveProviderSignup } from 'src/redux/features/user/user.thunks';
import { RootState, useAppDispatch } from 'src/redux/store';

const types: {type: string, display: string}[] = [
  {type: "all", display: "Tất cả"},
  {type: "active", display: "Đang hoạt động"},
  {type: "pending", display: "Chờ duyệt"},
  {type: "inactive", display: "Không hoạt động"},
]

const AdminHomePage = () => {

  const dispatchThunk = useAppDispatch()

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const listProvider = useSelector((state: RootState) => state.user.listProviders)

  const active = types.findIndex(type => type.type === pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length));

  const handleChangeTab = (type: string) => {
      navigate(`${pathname.slice(0, pathname.lastIndexOf("/"))}/${type}`)
  }

  const handleAcceptProvider = (providerId: string) => {
    dispatchThunk(resolveProviderSignup({ providerId: providerId, typeResolve: 'resolve' }))
  }

  const handleRejectProvider = (providerId: string) => {
    dispatchThunk(resolveProviderSignup({ providerId: providerId, typeResolve: 'reject' }))
  }

  React.useEffect(() => {
    if(active === 0) {
      const promise = dispatchThunk(getAllProviders())
      return () => {
        promise.abort()
      }
    }
    if(active === 1) {
      const promise = dispatchThunk(getProvidersByStatus('active'))
      return () => {
        promise.abort()
      }
    }
    if(active === 2) {
      const promise = dispatchThunk(getProvidersByStatus('pending'))
      return () => {
        promise.abort()
      }
    }
    if(active === 3) {
      const promise = dispatchThunk(getProvidersByStatus('inactive'))
      return () => {
        promise.abort()
      }
    }
  }, [dispatchThunk, active])

  return (
    <>
      <section className='rounded-3xl m-auto overflow-auto text-base'>
        <div className='border-b-gray-100 h-[50px] w-full mb-10'>
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
        <table className='w-full'>
          <thead className='bg-purple-500 text-slate-50'>
            <tr>
              <th className='p-4'>Tên</th>
              <th className='p-4'>SĐT</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Trạng thái</th>
              <th className='p-4'>Thao tác</th>
            </tr>
          </thead>
          <tbody className='[&>*:nth-child(even)]:bg-slate-100'>
            {
              listProvider.map((data, i) => (
                <tr key={i}>
                  <td className='p-4 text-center'>{data.providerName}</td>
                  <td className='p-4 text-center'>{data.user.phone}</td>
                  <td className='p-4 text-center'>{data.user.email}</td>
                  <td 
                    className={`p-4 text-center font-bold ${data.status === 'ACTIVE' ? 'text-green-500' : 
                    data.status === 'PENDING' ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {
                      data.status === 'ACTIVE' ? 
                        <span>Hoạt động</span> : data.status === 'PENDING' ?
                        <span>Chờ duyệt</span> : <span>Ẩn</span>
                    }
                  </td>
                  <td className='p-4 text-center'>
                    <div className='flex gap-5 text-xl justify-center'>
                      <FcAcceptDatabase
                        onClick={() => handleAcceptProvider(data.id)}
                        className='hover:bg-green-400 rounded-full cursor-pointer'
                      />
                      <FcDeleteDatabase 
                        onClick={() => handleRejectProvider(data.id)}
                        className='hover:bg-red-400 rounded-full cursor-pointer'
                      />
                      {
                        data.status !== 'INACTIVE' ? 
                          <AiFillEyeInvisible 
                            className='cursor-pointer hover:bg-gray-400 rounded-full'
                          /> 
                          : 
                          <AiFillEye 
                            className='cursor-pointer hover:bg-gray-400 rounded-full'
                          />
                      }
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default AdminHomePage
