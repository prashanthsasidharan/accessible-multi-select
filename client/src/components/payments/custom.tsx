import { AccordionContext } from 'react-bootstrap';
import { FormEvent, ReactNode, useContext } from 'react';
import { useAccordionButton } from 'react-bootstrap';

type CustomToggleType = {
  children: ReactNode,
  eventKey: string,
  hideToggle?: Boolean,
  canContinue?: (e: FormEvent) => void
}

function CustomToggle({ children, eventKey, hideToggle=true, canContinue } : CustomToggleType) {
  const { activeEventKey } = useContext(AccordionContext);

  const proceed = useAccordionButton(eventKey);

  let hideButton = (hideToggle && eventKey >= activeEventKey) || (activeEventKey === '3');
  return (
    <button
      type="submit"
      className={`${hideButton && 'd-none' }`}
      onClick={(e) => {
        if (typeof canContinue  === 'function') {
          canContinue(e) ? proceed(e) : e.stopPropagation();
          return;
        }
        proceed(e);
      }}
    >
      {children}
    </button>
  );
}

function CustomBody({ children, eventKey }) {
  const { activeEventKey } = useContext(AccordionContext);
  return (eventKey === activeEventKey && children);
}

const handleContinue = (event, validator) => {
  const form = event.currentTarget.form;
  validator(true);
  return form.checkValidity();
};

function handleChange() {

}

export { CustomToggle, CustomBody, handleContinue, handleChange }