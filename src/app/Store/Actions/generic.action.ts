import { createAction, props } from '@ngrx/store';

const HANDLE_CUSTOM_ERROR = '[Global] Handle Custom Error ';
const HANDLE_SUCCESS_MESSAGE = '[Global] Handle Success Message';


/**
 * * Action for handle custom error messages
 * * @param message - An error message representing custom error
 */
export const handleCustomError = createAction(HANDLE_CUSTOM_ERROR, props<{
  message: string,
  componentName?: string
}>());

/**
 * * Action for handle success messages
 * * @param message - An error message representing custom error
 */
export const handleSuccessMessage = createAction(HANDLE_SUCCESS_MESSAGE, props<{
  message: string,
  componentName?: string
}>());
