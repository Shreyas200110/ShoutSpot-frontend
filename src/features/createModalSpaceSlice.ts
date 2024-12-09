import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateModalSpaceState, Question } from '../models/models';

const initialState: CreateModalSpaceState = {
  // Existing state setup
  isCreateSpaceModalOpen: false,
  isDeleteModalOpen: false,
  spaceInfo: {
    spaceName: "",
    logo: "",
    squareLogo: false,
    collectStars: false,
    spaceHeading: "",
    customMessage: "",
    questions: [
      { id: 1, text: 'Who are you / what are you working on?' },
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
  }
};

const createModalSpaceSlice = createSlice({
  name: 'createModalSpaceState',
  initialState,
  reducers: {
    toggleCreateModalState(state) {
      state.isCreateSpaceModalOpen = !state.isCreateSpaceModalOpen;
    },
    changeDeleteSpaceModalState(state, action: PayloadAction<boolean>) {
      state.isDeleteModalOpen = action.payload
    },
    updateSpaceInfo(state, action: PayloadAction<any>) {
      state.spaceInfo = { ...state.spaceInfo, ...action.payload }
    },
    moveQuestion(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedQuestion = state.spaceInfo.questions.splice(dragIndex, 1)[0];
      state.spaceInfo.questions.splice(hoverIndex, 0, draggedQuestion);
    },
    updateQuestionText(state, action: PayloadAction<{ id: number; newText: string }>) {
      const { id, newText } = action.payload;
      const questionIndex = state.spaceInfo.questions.findIndex(q => q.id === id);
      if (questionIndex !== -1) {
        state.spaceInfo.questions[questionIndex].text = newText;
      }
    }
  }
});

export const { toggleCreateModalState, changeDeleteSpaceModalState, updateSpaceInfo, moveQuestion, updateQuestionText } = createModalSpaceSlice.actions;
export default createModalSpaceSlice.reducer;
