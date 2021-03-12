/* eslint-disable jsx-a11y/anchor-is-valid */
import CategoryList from './CategoryList'

const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start bg-grey-dark padding-horizontal py-8 md:py-12'>
            <div>
                <a href='/' className='inline-block mb-8 md:mb-0'>
                    <img src="./images/logo.png" alt="Shortify Logo" className='w-48 md:w-36 footer-logo' />
                </a>
            </div>
            <div className='flex flex-1 justify-evenly flex-col md:flex-row'>
                <CategoryList category='Features' items={['Link Shortening', 'Branded Links', 'Analytics']} />
                <CategoryList category='Resources' items={['Blog', 'Developers', 'Support']} />
                <CategoryList category='Company' items={['About', 'Our Team', 'Careers', 'Contact']} />
            </div>

            <div className='flex justify-around w-1/2 md:w-48'>
                <a href='#'><img className='socials-logo' src='./images/icon-facebook.svg' alt='facebook logo' /></a>
                <a href='#'><img className='socials-logo' src='./images/icon-twitter.svg' alt='twitter logo' /></a>
                <a href='#'><img className='socials-logo' src='./images/icon-pinterest.svg' alt='pinterest logo' /></a>
                <a href='#'><img className='socials-logo' src='./images/icon-instagram.svg' alt='instagram logo' /></a>
            </div>
        </footer>
    )
}

export default Footer
