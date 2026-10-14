'use client';

import { CheckinFormRoot } from './CheckinFormRoot';
import { CheckinFormHeader } from './CheckinFormHeader';
import { CheckinFormContent } from './CheckinFormContent';
import { CheckinFormInput } from './CheckinFormInput';
import { CheckinFormFeedback } from './CheckinFormFeedback';
import { CheckinFormKeypad } from './CheckinFormKeypad';
import { CheckinFormSubmit } from './CheckinFormSubmit';

export const CheckinForm = Object.assign(CheckinFormRoot, {
  Root: CheckinFormRoot,
  Header: CheckinFormHeader,
  Content: CheckinFormContent,
  Input: CheckinFormInput,
  Feedback: CheckinFormFeedback,
  Keypad: CheckinFormKeypad,
  Submit: CheckinFormSubmit,
});

export {
  CheckinFormRoot,
  CheckinFormHeader,
  CheckinFormContent,
  CheckinFormInput,
  CheckinFormFeedback,
  CheckinFormKeypad,
  CheckinFormSubmit,
};

export { useCheckinForm } from './context';
export type { CheckinFormContextType } from './context';
