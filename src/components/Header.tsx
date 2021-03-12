interface HeaderProps {
    toggleMobileNav: () => void
}

const Header = ({ toggleMobileNav }: HeaderProps) => {
    return (
        <header className='w-full padding-horizontal py-4'>
            <nav className='flex justify-between text-sm lg:text-base font-semibold'>
                <div className='flex justify-center items-center'>
                    <a href='/' className='inline-block pr-4'>
                        <img src="./images/logo.png" alt="Shortify Logo" className='w-28' />
                    </a>
                    <div className='hidden md:inline-block'>
                        <a href='/' className='px-2 lg:px-4 py-2 text-gray-400'>
                            Features
                    </a>
                        <a href='/' className='px-2 lg:px-4 py-2 text-gray-400'>
                            Pricing
                    </a>
                        <a href='/' className='px-2 lg:px-4 py-2 text-gray-400'>
                            Resources
                    </a>
                    </div>

                </div>
                <div className='flex justify-center items-center hidden md:inline-block'>
                    <a href='/' className='hidden sm:inline-block px-4 py-2 text-gray-400'>Login</a>
                    <button className='hidden sm:inline-block btn rounded-3xl'>Sign up</button>
                </div>
                <div className='md:hidden cursor-pointer' onClick={toggleMobileNav}>
                    <svg viewBox="0 0 100 60" width="40" height="40">
                        <rect width="100" height="10" rx="8"></rect>
                        <rect y="25" width="100" height="10" rx="8"></rect>
                        <rect y="50" width="100" height="10" rx="8"></rect>
                    </svg>
                </div>
            </nav>
        </header>
    )
}

export default Header
