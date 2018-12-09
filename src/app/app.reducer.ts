import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppStateInterface {
  isLoading: boolean;
  // List of words for admin CRUD
  words: WordInterface[];
  // is word in form for translate
  currentWord: WordInterface;
  err: null;
}

export interface WordInterface {
  id: number;
  term: string;
  translate: string;
  createdAt: string;
}

export interface AppActionInterface {
  type: string;
  payload: any;
}

export const ADD_WORD = 'word: add';
export const ADD_WORD_SUCCESS = 'word: add success';
export const ADD_WORD_FAIL = 'word: add fail';
export const RANDOM_WORD = 'word: random';
export const RANDOM_WORD_SUCCESS = 'word: random success';
export const RANDOM_WORD_FAIL = 'word: random fail';

const initialState: AppStateInterface = {
  isLoading: false,
  words: [],
  currentWord: null,
  err: null,
};

export function appReducer(state: AppStateInterface = initialState, action: AppActionInterface) {
  switch (action.type) {
    case ADD_WORD:
    case RANDOM_WORD:
      return {
        ...state,
        isLoading: true,
        err: null,
      };
    case ADD_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        words: [...state.words, action.payload]
      };
    case ADD_WORD_FAIL:
    case RANDOM_WORD_FAIL:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    case RANDOM_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentWord: action.payload,
      };
    default:
      return state;
  }
}

const selectApp = createFeatureSelector<AppStateInterface>('app');
export const selectAppWords = createSelector(
  selectApp,
  state => state.words
);
export const selectAppCurrentWord = createSelector(
  selectApp,
  state => state.currentWord
);
export const selectAppIsLoading = createSelector(
  selectApp,
  state => state.isLoading
);
export const selectAppErr = createSelector(
  selectApp,
  state => state.err
);
