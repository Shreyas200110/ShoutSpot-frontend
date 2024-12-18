import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmbedTestiModalState } from '../models/models';


const initialState: EmbedTestiModalState = {
  isCreateSpaceModalOpen: false, 
  embedTestiModalInfo : {
    designOption: "left-aligned",
    showPadding: false,
    starRatingColor: "",
    textColor: "",
    backgroundColor: "",
    textFamily: "Helvetica",
    showBorder: false,
    borderRadius: "rounded-none",
    borderWidth: "border",
    borderColor: "",
    shadowSize: "shadow-none",
    reviewText: "",
    reviewID:"",
    positiveStarsCount: 5,
    reviewVideo:"",
    reviewImage:"",
    userDetails:"",
    isLiked: false ,
    reviewerDetails: {
      name:"",
      companyName: ""
    },
    reviewType:""
  }
};

const embedTestiModalSpaceSlicer = createSlice({
  name: 'embedTestiModalState',
  initialState,
  reducers: {
    toggleEmbedTestiModalState (state) {
        state.isCreateSpaceModalOpen = !state.isCreateSpaceModalOpen;
    },
    updateSingleTestiInfo (state, action: PayloadAction<any>){
      state.embedTestiModalInfo = { ...state.embedTestiModalInfo, ...action.payload }
    }
  }
});

export const { toggleEmbedTestiModalState, updateSingleTestiInfo } = embedTestiModalSpaceSlicer.actions;
export default embedTestiModalSpaceSlicer.reducer;
