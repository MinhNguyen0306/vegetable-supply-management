import React from 'react'

const datas = [
  {
    id: 511321,
    name: "mmijkdsfsd",
    phone: "035465465",
    email: "minhnuydiakjdnas",
    certificate: "dasdadsdasd",
    status: "PENDING"
  },
  {
    id: 511321,
    name: "mmijkdsfsd",
    phone: "035465465",
    email: "minhnuydiakjdnas",
    certificate: "dasdadsdasd",
    status: "PENDING"
  },
  {
    id: 511321,
    name: "mmijkdsfsd",
    phone: "035465465",
    email: "minhnuydiakjdnas",
    certificate: "dasdadsdasd",
    status: "PENDING"
  },
  {
    id: 511321,
    name: "mmijkdsfsd",
    phone: "035465465",
    email: "minhnuydiakjdnas",
    certificate: "dasdadsdasd",
    status: "PENDING"
  },
  {
    id: 511321,
    name: "mmijkdsfsd",
    phone: "035465465",
    email: "minhnuydiakjdnas",
    certificate: "dasdadsdasd",
    status: "PENDING"
  }
]

const AdminHomePage = () => {
  return (
    <>
      <section className='rounded-3xl m-auto overflow-auto text-base'>
        <table className='w-full'>
          <thead className='bg-purple-500 text-slate-50'>
            <tr>
              <th className='p-4'>id</th>
              <th className='p-4'>Ten NCC</th>
              <th className='p-4'>SDT</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Giay to phap ly</th>
              <th className='p-4'>status</th>
            </tr>
          </thead>
          <tbody className='[&>*:nth-child(even)]:bg-slate-100'>
            {datas.map((data, i) => (
              <tr key={i}>
                <td className='p-4 text-center'>{data.id}</td>
                <td className='p-4 text-center'>{data.name}</td>
                <td className='p-4 text-center'>{data.phone}</td>
                <td className='p-4 text-center'>{data.email}</td>
                <td className='p-4 text-center'>{data.certificate}</td>
                <td className='p-4 text-center'>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default AdminHomePage
