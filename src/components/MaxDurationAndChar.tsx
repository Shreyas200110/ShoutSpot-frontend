export const MaxDurationAndChar = () => {
    return (
        <>
            {/* Max Duration */}
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="maxVideoLength">Max video duration</label>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 sm:col-span-2">
                            <select id="maxVideoLength" name="maxVideoLength" className="max-w-lg block text-gray-800 focus:ring-purple-500 focus:border-purple-500 mt-1 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md py-1.5 px-1.5">
                                <option value="0.5">30 seconds</option>
                                <option value="1">60 seconds</option>
                                <option value="1.5">90 seconds</option>
                                <option value="2">120 seconds</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Max Character */}
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="maxChar">Max characters for the text testimonial</label>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 sm:col-span-2">
                            <input type="number" name="maxChar" id="maxChar" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" min="128" placeholder="0" aria-describedby="max-characters-for-text-testimonials" defaultValue="" required={true} />
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs">Setting it to 0 will remove the max char limit</p>
                </div>
            </div>
        </>
    )
}