interface StatisticsCardProps {
    title: string,
    description: string,
    imgSrc: string
    className?: string
}

const StatisticsCard = ({ imgSrc, title, description, className }: StatisticsCardProps) => {
    const wrapperClasses = className ? `statistics-card-wrapper ${className}` : `statistics-card-wrapper`;
    return (
        <div className={wrapperClasses}>
            <div className='rounded-full p-4 bg-indigo-900 inline-block absolute -top-9 left-2/5 lg:left-9'>
                <img src={imgSrc} alt='An icon' className='w-10' />
            </div>
            <div className='px-8 py-4'>
                <h4 className='mt-8 mb-4 text-xl font-bold'>{title}</h4>
                <div className='text-gray-400'>{description}</div>
            </div>

        </div>
    )
}

export default StatisticsCard
