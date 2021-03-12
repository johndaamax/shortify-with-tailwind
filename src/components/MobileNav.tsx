/* eslint-disable jsx-a11y/anchor-is-valid */
const MobileNav = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <nav className={`flex flex-col justify-center md:hidden rounded-xl bg-indigo-dark p-4 w-4/5 absolute left-2/4 transform transition-all duration-300 delay-300 -translate-x-2/4 ${!isVisible ? `-translate-y-96` : ``}`}>
            <div className='flex flex-col justify-center items-center'>
                <a href='#' className='w-full p-4 text-white text-center'>
                    Features
                    </a>
                <a href='#' className='w-full p-4 text-white text-center'>
                    Pricing
                    </a>
                <a href='#' className='w-full p-4 text-white text-center'>
                    Resources
                </a>
            </div>
            <hr className='border-t border-gray-600' />
            <div className='flex flex-col justify-center items-center'>
                <a href='#' className='w-full p-4 text-white text-center'>Login</a>
                <button type='button' className='btn w-full rounded-3xl'>Sign up</button>
            </div>
        </nav>
    )
}

export default MobileNav
