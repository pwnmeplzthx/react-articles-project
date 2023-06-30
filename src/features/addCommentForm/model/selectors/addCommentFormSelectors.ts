import { StateSchema } from 'app/providers/StoreProvider';

// state.addCommentForm?.text ?? '' аналог state.addCommentForm?.text || '' только не будет падать, если ввести 0
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
