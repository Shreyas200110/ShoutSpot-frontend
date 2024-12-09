export interface SpaceType {
    logo: string;
    heading: string;
    videoCount: number;
    textCount: number;
    spaceDomain: string;
    spaceInfo: SpaceInfo
}
export interface SpaceDropDownType {
    spaceDomain: string;
    setSpaceInfo: () => void;
    setDropdownOpen: (open: boolean) => void;
}

export interface OverviewCardProps {
    iconPath: string,
    total: string,
    maxAllowed: string,
    title: string
};

export interface footerElement {
    heading: string,
    targetLink: string
}

export interface InputWithLabelProps {
    id: string,
    label: string,
    placeholder: string,
    svgNeeded: boolean,
    value: string,
    handleInputChange: (value: string) => void
}

export interface CheckboxProps {
    id: string,
    title: string,
    handleChange: (value: boolean) => void
}

export interface ActiveButtonProps {
    id: number;
    handleButtonClick: (id: number) => void;
}
export interface TextVideoButtonsInterface {
    isTextButtonRequired: boolean;
    isVideoButtonRequired: boolean;
}
export interface Question {
    id: number;
    text: string;
}
export interface CurrentHeadingProps {
    id?: number,
    heading: string;
    subHeading?: string;
}

export interface DraggableQuestionProps {
    id: number;
    initialText: string;
    index: number;
    moveQuestion: (dragIndex: number, hoverIndex: number) => void;
    maxLength: number;
    updateQuestionText: (id: number, newText: string) => void;
}

export interface DragItem {
    type: string;
    id: number;
    index: number;
}

export interface CreateModalSpaceState {
    isCreateSpaceModalOpen: boolean;
    isDeleteModalOpen: boolean;
    spaceInfo: SpaceInfo;
}

interface SpaceInfo {
    spaceName: string;
    logo: string;
    squareLogo: boolean;
    collectStars: boolean;
    spaceHeading: string;
    customMessage: string;
    questions: Question[];
    collectExtraInfo: CollectExtraInfo;
    collectionType: string;
    collectStarRatings: boolean;
    language: string;
    thankYouImage: string;
    thankYouTitle: string;
    thankYouMessage: string;
    redirectPageLink: string;
    maxVideoDuration: number;
    maxCharsAllowed: number;
    videoButtonText: string;
    textButtonText: string;
    consentText: string;
    textSubmissionTitle: string;
    questionLabel: string;
}

interface CollectExtraInfo {
    name: boolean;
    email: boolean;
    company: boolean;
    socialLink: boolean;
    address: boolean;
}

export interface EmbedTestiModalState {
    isCreateSpaceModalOpen: boolean;
    embedTestiModalInfo: EmbedTestiModalInfo;
}

export interface EmbedTestiModalInfo {
    designOption: string;
    showPadding: boolean;
    starRatingColor: string;
    textColor: string;
    backgroundColor: string;
    textFamily: string;
    showBorder: boolean;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    shadowSize: string;
}

export interface UserDetails {
    name: string;
    companyName?: string;
    email?: string;
    socialLink?: string;
    address?: string;
    submitDateTime?: string;
}

// Define the props type using an interface
export interface RevieweeInfoProps {
    userDetails: UserDetails;
}

export interface SingleReviewProps {
    reviewType: string;
    positiveStarsCount: number;
    reviewText: string;
    reviewVideo?: string; // Optional if not all reviews include a video
    reviewImage?: string; // Optional if not all reviews include an image
    userDetails: UserDetails;
}

export interface EmbedTestiHeaderProps {
    embedTestiAttribute: number;
    setEmbedTestiAttribute: (value: number) => void;
}

export interface ToggleButtonProps {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}


interface wolCustButtonPressed {
    buttonPressed: number
}

interface LivePreviewProps {
    Border : {
        showBorder: boolean
        borderRadius: string
        borderColor: string
        borderWidth: string
    };

    Shadow : {
        shadowType: string
        shadowColor: string
        shadowSize: string
    };
    
    Background : {
        color: string
        cardColor: string
    }

    Text : {
        color: string
        linkColor: string
        starColor: string
        heartColor: string
        fontSize: string
        highlightStyle: string
    }

    Video : {
        buttonColor: string
    }
}

export interface wolModalState {
    wolCustButtonPressed: wolCustButtonPressed;
    livePreview: LivePreviewProps;
}

export interface DeleteSpaceModalProps {
    spaceId: string;
}

// export interface ToggleButtonProps {
//     isActive: any;
//     setIsActive: (value : boolean) => void;
// }

export interface EmbedTestiDisplayProps {
    positiveStarsCount: number;
}

export interface SpaceDetailsProps{
    reviews: SingleReviewProps[]
}
export interface HeadingProps{
    domain: string,
    spaceImage: string
}
export interface createSpaceModalProps{
    spaceInfo: SpaceInfo
}