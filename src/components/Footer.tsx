import CategoryList from './CategoryList'

const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start bg-indigo-dark px-8 py-8 md:py-12 md:px-24'>
            <div className='flex'>
                <a href='/' className='inline-block mb-8 md:mb-0'>
                    <img src="./images/logo.png" alt="Shortify Logo" className='w-28 footer-logo' />
                </a>
            </div>
            <CategoryList category='Features' items={['Link Shortening', 'Branded Links', 'Analytics']} />
            <CategoryList category='Resources' items={['Blog', 'Developers', 'Support']} />
            <CategoryList category='Company' items={['About', 'Our Team', 'Careers', 'Contact']} />
            <div className='flex justify-around w-1/2 md:w-48'>
                <a href='!#'><img className='socials-logo' src='./images/icon-facebook.svg' alt='facebook logo' /></a>
                <a href='!#'><img className='socials-logo' src='./images/icon-twitter.svg' alt='twitter logo' /></a>
                <a href='!#'><img className='socials-logo' src='./images/icon-pinterest.svg' alt='pinterest logo' /></a>
                <a href='!#'><img className='socials-logo' src='./images/icon-instagram.svg' alt='instagram logo' /></a>
            </div>
        </footer>
    )
}

export default Footer
