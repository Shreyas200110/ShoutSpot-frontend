import { useEffect, useState } from 'react';
import { Space } from './Space';
import { SpaceType } from '../models/models';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { toggleCreateModalState } from '../features/createModalSpaceSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Spaces = () => {
    const navigate = useNavigate();
    const [spacesArray, setSpacesArray]  = useState<SpaceType[]>([
        {
            'textCount' : 2,
            'videoCount' : 5,
            'spaceInfo': {
                id: 1,
                spaceName: "Google",
                logo: "",
                squareLogo: false,
                spaceHeading: "Hello how do you do baby",
                customMessage: "",
                questions: [
                    { id: 1, text: 'shreyas' },
                    { id: 2, text: 'How has our product / service helped you?' },
                    { id: 3, text: 'What is the best thing about our product / service?' },
                ],
                collectExtraInfo: {
                    name: true,
                    email: false,
                    company: false,
                    socialLink: false,
                    address: false,
                },
                collectionType: "all",
                collectStarRatings: false,
                language: "English",
                thankYouImage: "",
                thankYouTitle: "Thank you!",
                thankYouMessage: "Thank you so much for your shoutout! It means a ton for us! 🙏",
                redirectPageLink: "",
                maxVideoDuration: 30,
                maxCharsAllowed: 128,
                videoButtonText: "",
                textButtonText: "",
                consentText: "",
                textSubmissionTitle: "",
                questionLabel: "",
                spaceLogoFile: null,
                thankYouImageFile: null
            }
        },
        {
            'textCount' : 2,
            'videoCount' : 5,
            'spaceInfo': {
                id: 2,
                spaceName: "",
                logo: "",
                squareLogo: false,
                spaceHeading: "Shreyas ",
                customMessage: "",
                questions: [
                    { id: 1, text: '1234' },
                    { id: 2, text: 'How has our product / service helped you?' },
                    { id: 3, text: 'What is the best thing about our product / service?' },
                ],
                collectExtraInfo: {
                    name: true,
                    email: false,
                    company: false,
                    socialLink: false,
                    address: false,
                },
                collectionType: "all",
                collectStarRatings: false,
                language: "English",
                thankYouImage: "",
                thankYouTitle: "",
                thankYouMessage: "",
                redirectPageLink: "",
                maxVideoDuration: 30,
                maxCharsAllowed: 128,
                videoButtonText: "",
                textButtonText: "",
                consentText: "",
                textSubmissionTitle: "",
                questionLabel: "",
                spaceLogoFile: null,
                thankYouImageFile: null
            }
        }
    ]);

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/spaces', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setSpacesArray(response.data.spaces);
            } catch (error) {
                alert('Failed to fetch spaces');
                navigate('/signin') 
            }
        };

        fetchSpaces();
    }, []);

    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            {
                spacesArray.length === 0 ? (
                    <div className="mx-auto px-4 sm:px-6">
                        <div className="pt-12 md:pt-20">
                            <div className="flex-1 flex items-center justify-between pb-5">
                                <div className="text-3xl text-white font-semibold tracking-wide ">Spaces</div>
                            </div>
                            <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
                                <img src="/new-folder.png" className="w-10 h-10 mx-auto text-gray-400 mb-4" ></img>
                                <h3 className="text-xl font-semibold text-white mb-2">No spaces yet</h3>
                                <p className="text-gray-400 mb-6">Create your first space to start collecting testimonials</p>
                                <button onClick= {() => {
                                    dispatch(toggleCreateModalState());
                                }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2" type="button" aria-haspopup="true" aria-expanded="false">
                                    <span className="flex text-sm">
                                        <img src="/plus-icon.png" className="h-5 w-5 mr-2" ></img>Create a new space</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto px-4 sm:px-6">
                        <div className="pt-12 md:pt-20 pb-10">
                            <div className="flex-1 flex items-center justify-between pb-5">
                                <div className="text-3xl text-white font-semibold tracking-wide ">Spaces</div>
                                <button onClick= {() => {
                                    dispatch(toggleCreateModalState());
                                }}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-2" type="button" aria-haspopup="true" aria-expanded="false">
                                    <span className="flex text-sm">
                                        <img src="/plus-icon.png" className="h-5 w-5 mr-2" ></img>Create a new space</span>
                                </button>
                            </div>
                            <div className="flex-1 flex items-center justify-start py-3">
                                <div className="w-full">
                                    <label htmlFor="search" className="sr-only">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <img src="/search.png" className="h-4 w-4" ></img>
                                        </div>
                                        <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 text-white border border-gray-700 rounded-md leading-5 bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 sm:text-sm" placeholder="Search testimonials by name, email, or keywords" type="search" value="" />
                                    </div>
                                </div>
                            </div>

                            <ul className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                { spacesArray.map((space) => {
                                    return (
                                        <Space spaceInfo={space.spaceInfo} videoCount={space.videoCount} textCount={space.textCount}/>
                                    )
                                }) }
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}