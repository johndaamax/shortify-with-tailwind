interface ListProps {
    category: string
    items: Array<string>
}
const CategoryList = ({ category, items }: ListProps) => {
    return (
        <div className='w-full md:w-auto px-4 text-center md:text-left my-4 md:my-0'>
            <h3 className='text-white font-semibold mb-4'>{category}</h3>
            <ul>
                {items.map(item => <li key={item} className='text-gray-400 py-2 hover:text-white'><a href='!#'>{item}</a></li>)}
            </ul>
        </div>
    )
}

export default CategoryList
