
const Header = () => {
    return (
        <header className='w-full px-4 py-4 md:px-24'>
            <nav className='flex justify-between'>
                <div className='flex justify-center items-center'>
                    <a href='/' className='inline-block md:px-4 md:py-2'>
                        <img src="./images/logo.png" alt="Shortify Logo" className='w-28' />
                    </a>
                    <a href='/' className='hidden md:inline-block px-4 py-2 text-gray-400'>
                        Features
                    </a>
                    <a href='/' className='hidden md:inline-block px-4 py-2 text-gray-400'>
                        Pricing
                    </a>
                    <a href='/' className='hidden md:inline-block px-4 py-2 text-gray-400'>
                        Resources
                    </a>
                </div>
                <div className='flex justify-center items-center'>
                    <a href='/' className='hidden md:inline-block px-4 py-2 text-gray-400'>Login</a>
                    <button className='hidden md:inline-block btn rounded-3xl'>Sign up</button>
                </div>
                {/* <div className='md:hidden'>
                    <img src="./images/hamburger.svg" alt="Button that opens navigation on mobile resolutions" />
                </div> */}
            </nav>
        </header>
    )
}

export default Header
