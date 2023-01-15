import { useEffect, useRef, useState } from 'react';

import { capitalize } from '@mui/material';
import { useLocation } from 'react-router-dom';

const KEYCODE_TAB = 0x09;

/**
 * Returns a mutation from api, specific to provided mode.
 * The result will be compiled to { apply(), isLoading } object.
 * Example: for login and register actions it will register both mutations
 * and build the output matching the mode parameter
 * @param {string[]} actionsList - An array of mutation names to init (without "use" and "Mutation" parts).
 * @param {import('@reduxjs/toolkit/dist/query').BaseQueryFn} api - The api where actions from actionList are stored.
 * @param {string} mode - Current action selector. Action with this name will be returned as a result.
 */
const useActionFromMutationsByMode = (actionsList, api, mode) => {
  const actions = {};
  actionsList.forEach(
    mutation =>
      (actions[mutation] = mutationToAction(
        api[`use${capitalize(mutation)}Mutation`]
      ))
  );
  return actions[mode];
};

const mutationToAction = mutation => {
  const [apply, { isLoading }] = mutation();
  return { apply, isLoading };
};

/** Provides ref and setFocus function to focus a html node programmatically */
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

/**
 *  Traps the focus between two elements. Prevents to tab outside their boundary.
 *  Returns two refs for the first and the last element and onKeyDown handler.
 */
const useTrapFocus = () => {
  const firstRef = useRef();
  const lastRef = useRef();

  return {
    firstRef,
    lastRef,
    onKeyDown: event => {
      let isTabPressed = event.key === 'Tab' || event.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstRef.current) {
          lastRef.current.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastRef.current) {
          firstRef.current.focus();
          event.preventDefault();
        }
      }
    },
  };
};

/** Simple boolean hook with various hany return parameters */
const useBoolean = (initial = false) => {
  const [state, set] = useState(initial);
  return {
    isTrue: state,
    isFalse: !state,
    setTrue: () => set(true),
    setFalse: () => set(false),
    set,
    toggle: () => set(oldState => !oldState),
  };
};

/** Renames document title to comply with the current location.
 *  It supposed to manage the browser history names
 */
const useDocumentTitleRenamer = (forcedName) => {
  const location = useLocation();
  useEffect(() => {
    const path = capitalize(location.pathname.substring(1));
    document.title = 'Phonebook: ' + (forcedName || path);
  }, [forcedName, location]);
}

export { useActionFromMutationsByMode, useFocus, useTrapFocus, useBoolean, useDocumentTitleRenamer };
