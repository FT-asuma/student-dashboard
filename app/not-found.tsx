import Link from 'next/link'
const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 min-w-full bg-gradient-to-br from-[var(--background)] via-[var(--middle-ground)] to-[var(--end-ground)]'>
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-lg">
            <h1 className='text-gray-600'>404 - Page Not Found</h1>
            <Link href={"/"}>go back to home</Link>
        </div>
    </div>
  )
}

export default NotFound