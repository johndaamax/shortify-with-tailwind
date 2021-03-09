import { ShortLinkListItem } from '../App'

interface ShortLinkContainerProps {
    linkData: ShortLinkListItem,
    handleClick: () => void
}

const ShortLinkContainer = ({ linkData, handleClick }: ShortLinkContainerProps) => {

    return (
        <div className='flex text-left flex-col md:flex-row justify-between md:items-center bg-white rounded-md mb-4'>
            <div className='p-4 border-b border-gray-200 md:border-none'>
                {linkData.originalLink}
            </div>
            <div className='p-4'>
                <span className='text-green-400 font-semibold'>{linkData.shortLink}</span>
                <button onClick={handleClick} className={`btn rounded-md w-full mt-4 md:mt-0 md:w-auto md:ml-4 ${linkData.isCopiedToClipboard ? `bg-indigo-900 hover:bg-indigo-600` : ``}`}>{linkData.isCopiedToClipboard ? `Copied!` : `Copy`}</button>
            </div>
        </div>
    )
}

export default ShortLinkContainer
