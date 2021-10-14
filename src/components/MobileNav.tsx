import * as React from 'react'
interface Props {
    isVisible: boolean,
}
/* eslint-disable jsx-a11y/anchor-is-valid */
const MobileNav = React.forwardRef((props: Props, ref: React.Ref<HTMLElement>) => {
    return (
        <nav ref={ref} className={`flex flex-col justify-center md:pointer-events-none md:hidden rounded-xl bg-indigo-dark p-4 w-4/5 absolute left-2/4 transform transition-all duration-300 delay-300 -translate-x-2/4 ${!props.isVisible ? `-translate-y-96` : ``}`}>
            <div className='flex flex-col justify-center items-center transition-all'>
                <a href='#' className='w-full p-4 text-white text-center hover-link' title='Features'>
                    Features
                </a>
                <a href='#' className='w-full p-4 text-white text-center hover-link' title='Pricing'>
                    Pricing
                </a>
                <a href='#' className='w-full p-4 text-white text-center hover-link' title='Resources'>
                    Resources
                </a>
            </div>
            <hr className='border-t border-gray-600' />
            <div className='flex flex-col justify-center items-center'>
                <a href='#' className='w-full p-4 text-white text-center hover-link' title='Login'>Login</a>
                <button type='button' className='btn hover-link w-full rounded-3xl' title='Sign Up'>Sign up</button>
            </div>
        </nav>
    )
});

export default MobileNav
