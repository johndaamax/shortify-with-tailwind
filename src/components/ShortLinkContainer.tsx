interface ShortLinkContainerProps {
    originalLink: string,
    shortLink: string
}

const ShortLinkContainer = ({ originalLink, shortLink }: ShortLinkContainerProps) => {
    return (
        <div className='flex text-left flex-col md:flex-row justify-between md:items-center bg-white rounded-md mb-4'>
            <div className='p-4 border-b border-gray-200 md:border-none'>
                {originalLink}
            </div>
            <div className='p-4'>
                <span className='text-green-400 font-semibold'>{shortLink}</span>
                <button className='btn rounded-md w-full md:w-auto md:ml-4'>Copy</button>
            </div>
        </div>
    )
}

export default ShortLinkContainer
