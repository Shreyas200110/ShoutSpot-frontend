import { useState } from "react";
import { ImageComponent } from "./ImageComponent";
import RatingSystem from "./Star"
import { setReviewInfo, setShowTextModal } from "../../features/UserReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import axios from "axios";


type FormData = {
    starClicked: number;
    name: string;
    email: string;
    review: string;
    image: string;
    consent: boolean;
};
export const TextReviewModal: React.FC<{ config: any }> = ({ config }) => {

    const generateRandomName = (originalFileName: string) => {
        const fileExtension = originalFileName.slice(originalFileName.lastIndexOf('.'));
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return randomString + fileExtension;
    };

    const dispatch = useDispatch();
    const reviewInfo = useSelector((state: RootState) => { return state.userReviewModal.reviewInfo });

    const [formData, setFormData] = useState<FormData>({
        starClicked: 5,
        name: '',
        email: '',
        review: '',
        image: '',
        consent: false
    });

    const onStarClick = (index: number) => {
        dispatch(setReviewInfo({ positiveStarsCount: index + 1 }));
    }

    const setFormDataConfig = (key: keyof FormData, value: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value
        }));
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setFormDataConfig('image', loadEvent.target?.result as string);
            };
            reader.readAsDataURL(file);
            dispatch(setReviewInfo({ userPhoto: file }));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        dispatch(setShowTextModal(false));

        const { reviewImage, userPhoto } = reviewInfo;
        if (!reviewImage || !userPhoto) {
            alert('All fields are required');
            return;
        }

        try {
            const reviewImageRandomName = generateRandomName(reviewImage.name);
            const userPhotoRandomName = generateRandomName(userPhoto.name);

            const [reviewImageResponse, userPhotoResponse] = await Promise.all([
                axios.get(`http://localhost:3000/api/generate-presigned-url`, {
                    params: {
                        fileName: reviewImageRandomName,
                        fileType: reviewImage.type,
                        folder: 'Images'
                    },
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }),
                axios.get(`http://localhost:3000/api/generate-presigned-url`, {
                    params: {
                        fileName:userPhotoRandomName,
                        fileType: userPhoto.type,
                        folder: 'Images'
                    },
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
            ]);

            const reviewImageURL = reviewImageResponse.data.url;
            const userPhotoURL = userPhotoResponse.data.url;

            // Parallel uploading of files
            Promise.all([
                axios.put(reviewImageURL, reviewImage, {
                    headers: { 'Content-Type': reviewImage.type },
                }),
                axios.put(userPhotoURL, userPhoto, {
                    headers: { 'Content-Type': userPhoto.type },
                })
            ]);

            const updatedReviewInfo = {
                ...reviewInfo,  reviewType: 'text', reviewImage : reviewImageURL.split('?')[0], 
                userDetails: { ...reviewInfo.userDetails, userPhoto: userPhotoURL.split('?')[0] }
            }

            await axios({
                method: 'post',
                url: 'http://localhost:3000/api/reviews',
                data: updatedReviewInfo,
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            dispatch(setReviewInfo({reviewType: "", positiveStarsCount: 5, reviewText: "", reviewImage: null, reviewVideo: null, userDetails: {name: "", email: ""}, userPhoto: null}));
            setFormDataConfig('image', '');
            setFormDataConfig('consent', false);
        } catch (error) {
            alert('Error while submitting a review');
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen overflow-hidden bg-white">
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl relative transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <form>
                                <button className="text-gray-400 rounded-full w-6 h-6" style={{ position: "absolute", right: "5px", top: "5px", zIndex: 999, outline: "none" }} onClick={() => setShowTextModal(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 w-full text-left sm:mt-0">
                                        <h3 className="text-lg leading-6 font-semibold text-gray-800" id="modal-headline">Write text testimonial to</h3>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <div>
                                                    <img loading="lazy" className="h-10 rounded-md shadow-md" src={config.spaceLogo} alt="space logo" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg leading-6 font-semibold text-gray-800 capitalize mb-2">questions</h3>
                                            <div className="w-10 mb-2 border-b-4" style={{ borderColor: "rgb(93, 93, 255)" }}></div>
                                            <ul className="mt-2 max-w-xl text-sm text-gray-500 list-disc pl-4">
                                                {config.questions.map(({ id, text }: { id: number; text: string }) => (
                                                    <li key={id}>{text}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="w-full px-3">
                                                    <div className="star-ratings" title="3 Stars" style={{ position: "relative", boxSizing: "border-box", display: "inline-block" }}>
                                                        <RatingSystem onStarClick={onStarClick} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <div className="rounded-md w-full">
                                                    <textarea required minLength={30} id="message" name="message" rows={5} placeholder={`${reviewInfo.positiveStarsCount < 3 ? 'What did you dislike? How can we make it better?' : 'What did you like about us?'}`} className="shadow-sm flex-1 form-input block w-full min-w-0 rounded-md text-gray-800 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border-gray-300" value={reviewInfo.reviewText} onChange={(e) => dispatch(setReviewInfo({ reviewText: e.target.value }))}></textarea>
                                                </div>
                                            </div>
                                            <ImageComponent />
                                            <div className="mt-2 rounded-md shadow-sm w-full">
                                                <div className="mt-1 relative rounded-md">
                                                    <label htmlFor="name" className="text-sm text-gray-700">Your Name <span className="text-red-600">*</span></label>
                                                    <input id="name" required maxLength={128} className="form-input text-gray-700 border-b border-gray-300 block w-full sm:text-sm sm:leading-5 py-2 rounded-md" value={reviewInfo.userDetails.name} onChange={(e) => { dispatch(setReviewInfo({ userDetails: { ...reviewInfo.userDetails, name: e.target.value } })) }} />
                                                </div>
                                            </div>

                                            <div className="mt-2 rounded-md shadow-sm w-full">
                                                <div className="mt-1 relative rounded-md">
                                                    <label htmlFor="email" className="flex space-x-1 text-sm text-gray-700">
                                                        <span>Your Email </span>
                                                        <span className="text-red-600">*</span>
                                                    </label>
                                                    <input required id="email" type="email" className="form-input text-gray-700 border-b border-gray-300 block w-full sm:text-sm sm:leading-5 py-2 rounded-md" value={reviewInfo.userDetails.email} onChange={(e) => { dispatch(setReviewInfo({ userDetails: { ...reviewInfo.userDetails, email: e.target.value } })) }}/>
                                                </div>
                                            </div>

                                            <div className="mt-2 flex flex-wrap -mx-3 mb-4">
                                                <div className="w-full px-3">
                                                    <label className="text-sm text-gray-700" htmlFor="avatar">Upload Your Photo</label>
                                                    <div className="mt-2 flex items-center">
                                                        <span className="rounded-full h-20 w-20 bg-gray-300">
                                                            {
                                                                reviewInfo.userPhoto ? (
                                                                    <img loading="lazy" className="h-20 w-20 rounded-full object-cover" src={formData.image} />
                                                                ) : (<></>)
                                                            }

                                                        </span>
                                                        <span className="ml-5 rounded-md">
                                                            <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif,image/webp" name="newAvatarURL" id="newAvatarURL" className="h-0 w-0 opacity-0 overflow-hidden absolute -z-10" onChange={handleImageChange} />
                                                            <label htmlFor="newAvatarURL" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer">Choose file</label>
                                                        </span>
                                                        {
                                                            formData.image != '' ? (
                                                                <span className="ml-2 rounded-md shadow-sm cursor-pointer" onClick={() => setFormDataConfig('image', '')}>
                                                                    <label className="">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                                        </svg>
                                                                    </label>
                                                                </span>
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 rounded-md w-full consent-text">
                                                <div className="mt-1 relative flex rounded-md items-start cursor-pointer" >
                                                    <div className="flex items-center h-5">
                                                        <input required id="confirm" name="confirm" type="checkbox" className="focus:ring-purple-500 h-4 w-4 text-purple-600 rounded" checked={formData.consent} onChange={(e) => setFormDataConfig('consent', !formData.consent)} />
                                                    </div>
                                                    <div className="ml-2 text-sm leading-5 overflow-auto" style={{ maxHeight: "100px" }}>
                                                        <label htmlFor="confirm" className="text-gray-600">I give permission to use this testimonial across social channels and other marketing efforts</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={handleFormSubmit}>Send</button>
                                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-200 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={() => dispatch(setShowTextModal(false))}>Cancel</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}