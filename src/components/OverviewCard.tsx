type OverviewCardProps = {
    iconPath: string, // Specify that iconPath should be a string
    total: string,
    maxAllowed: string,
    title: string
};

export const OverviewCard: React.FC<OverviewCardProps> = ({ iconPath, total, maxAllowed, title}) => {
    return(
        <>
           <div className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow w-full sm:w-80 h-32 flex flex-col justify-between sm:w-auto">
                <div className="flex justify-between ">
                    <div className="text-white">{title}</div>
                    <img src={iconPath} className="h-5 w-5" ></img>
                </div>
                <div className="text-white">
                    <span className="text-xl font-semibold">{total}</span>/{maxAllowed}
                </div>
            </div>
        </>
    )
}