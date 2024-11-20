import { useMemo, useState } from "react";
import { RevieweeInfo } from "./RevieweeInfo";
import { SingleReviewProps } from "../models/models";
import { ReviewFooterButtons } from "./ReviewFooterButtons";

export const SingleReview: React.FC<SingleReviewProps> = ({ reviewType, positiveStarsCount, reviewText, reviewVideo, reviewImage, userDetails }) => {
    const [isReviewFooterButtonsShown, setIsReviewFooterButtonsShown] = useState(false);
    const stars = useMemo(() => {
        return Array.from({ length: 5 }, (_, index) => { 
            if (index < positiveStarsCount) {
                return (
                    <div key={index} className="star-container" style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', paddingRight: '2px' }}>
                        <svg viewBox="0 0 51 48" className="widget-svg" style={{ width: '24px', height: '24px', transition: 'transform 0.2s ease-in-out' }}>
                            <path className="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" style={{ fill: 'rgb(255, 182, 33)' }}></path>
                        </svg>
                    </div>
                )
            }
            else {
                return (
                    <div className="star-container" style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle', paddingLeft: '2px', paddingRight: '2px' }}>
                        <svg viewBox="0 0 51 48" className="widget-svg" style={{ width: '24px', height: '24px', transition: 'transform 0.2s ease-in-out' }}>
                            <path className="star" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" style={{ fill: 'rgb(203, 211, 227)', transition: 'fill 0.2s ease-in-out' }}></path>
                        </svg>
                    </div>
                )
            }

        });
    }, [positiveStarsCount]);

    return (
        <div className="collapsible mb-4 border border-gray-200 bg-white pl-3 pr-3 dark:bg-gray-700 rounded-lg dark:border-gray-800 2xl:w-3/4 2xl:mx-auto shadow-lg">
            <div className="block focus:outline-none transition duration-150 ease-in-out hover:cursor-pointer w-full">
                <div className="px-4 pt-4 sm:px-6">
                    <div className="items-center">
                        <div className="flex w-full">
                            <div className="relative">
                                <span className="px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left">{reviewType}</span>
                                <span className="absolute -top-1 -left-2 bg-white rounded-full" data-tip="true" data-for="permitted-tooltip">
                                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </span>
                            </div>
                            <button className="ml-auto leading-5" data-tip="true" data-for="like-icon-tooltip">
                                <svg className="w-6 h-6 text-red-400 hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="text-base font-medium text-gray-900 text-left"></div>
                    </div>
                </div>
            </div>

            <div className="collapsible text-right">
                {/* reviewImage and reviewMessage */}
                <div className="mt-4 mx-6 mb-4">
                    <div className="mb-2 text-left">
                        <div className="star-ratings" title="1 Star" style={{ position: 'relative', boxSizing: 'border-box', display: 'inline-block' }}>
                            {stars}
                        </div>
                    </div>
                    {
                        reviewText && <div className="text-sm font-normal text-left text-gray-200 cursor-pointer">
                            <p>hey how do you do</p>
                        </div>
                    }
                    {
                        reviewImage && <div className="mt-4 grid grid-cols-4 gap-4">
                            <div className="col-span-1 cursor-pointer">
                                <div>
                                    <img loading="lazy" src={reviewImage} className="rounded-lg hover:opacity-75" alt="thumbnail1" />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    reviewVideo && <button type="button" className="mb-5 ml-5 mt-4 relative block rounded-lg overflow-hidden focus:outline-none focus:shadow-outline">
                        <img loading="lazy" src="https://image.mux.com/7I9Hx5A3kHohC13cTSQQ1UsHcMoWMo2o4wn5HmXb4Xc/thumbnail.jpg?width=400" alt="" className="h-20 w-36" />
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            <svg className="h-10 w-10 text-indigo-500" fill="currentColor" viewBox="0 0 84 84">
                                <circle opacity="0.9" cx="42" cy="42" r="42" fill="white"></circle>
                                <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"></path>
                            </svg>
                        </div>
                    </button>
                }
                <RevieweeInfo userDetails={userDetails} />
                {isReviewFooterButtonsShown && <ReviewFooterButtons />}
                <div className="ml-auto flex justify-end px-5 py-3">
                    <button className="p-2" onClick={() => {
                        setIsReviewFooterButtonsShown(true)
                    }}>
                        {!isReviewFooterButtonsShown && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>}
                    </button>
                    <button className="p-2" onClick={() => {
                        setIsReviewFooterButtonsShown(false)
                    }}>
                        {isReviewFooterButtonsShown && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>}

                    </button>
                </div>
            </div>
        </div>
    )
}