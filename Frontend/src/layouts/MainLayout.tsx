import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className='flex flex-col justify-start items-center'>
      <Outlet />
    </div>
  )
}
