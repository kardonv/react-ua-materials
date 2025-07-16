// Import all components from each folder
// 001-useMemo
import ExpensiveComputations from '../001-useMemo/001-ExpensiveComputation';
import ExpensiveComputationsOverHead from '../001-useMemo/002-ExpensiveComputationsOverhead';
import ExpensiveComputationsMemoized from '../001-useMemo/003-ExpensiveComputationsExpensiveComputationsMemoized';
import FilterUsersWithMemo from '../001-useMemo/004-FilterUsersWithMemo';
import UseMemoWithChild from '../001-useMemo/005-UseMemoWithChild';

// 002-useCallback
import UseCallbackProblem from '../002-useCallback/001-UseCallback';
import UseCallbackSolution from '../002-useCallback/002-UseCallback';
import UseCallbackWithUseEffect from '../002-useCallback/003-UseCallbackWithUseEffect';
import UseCallbackAsProps from '../002-useCallback/004-UseCallbackAsProps';

// 003-useReducer
import CounterSimple from '../003-useReducer/001-CounterSimple';
import CounterWithPayload from '../003-useReducer/002-CounterWithPayload';
import TodoReducer from '../003-useReducer/003-TodoReducer';
import FormReducer from '../003-useReducer/004-FormReducer';
import AsyncReducer from '../003-useReducer/005-AsyncReducer';

// 004-customHooks
import UseLocalStorageExample from '../007-customHooks/001-useLocalStorage';
import UseBreakpointExample from '../007-customHooks/002-useBreakpoint';
import UseDebounceExample from '../007-customHooks/003-useDebounce';

// 005-useLayoutEffect
import ProblemWithoutUseLayoutEffect from '../004-useLayoutEffect/001-ProblemWithoutUseLayoutEffect';
import SolutionWithUseLayoutEffect from '../004-useLayoutEffect/002-SolutionWithUseLayoutEffect';

// 006-useDebugValue
import UseDebugValueExample from '../005-useDebugValue/001-UseDebugValueExample';

// 007-useImperativeHandle
import ProblemWithoutUseImperativeHandle from '../006-useImperativeHandle/001-ProblemWithoutUseImperativeHandle';
import SolutionWithUseImperativeHandle from '../006-useImperativeHandle/002-SolutionWithUseImperativeHandle';
import AdvancedUseImperativeHandle from '../006-useImperativeHandle/003-AdvancedUseImperativeHandle';

export const componentMap = {
  '001-useMemo': {
    title: 'useMemo',
    components: {
      'Expensive Computation': ExpensiveComputations,
      'Expensive Computation Overhead': ExpensiveComputationsOverHead,
      'Expensive Computation Memoized': ExpensiveComputationsMemoized,
      'Filter Users with Memo': FilterUsersWithMemo,
      'Use Memo with Child': UseMemoWithChild
    }
  },
  '002-useCallback': {
    title: 'useCallback',
    components: {
      'Problem without useCallback': UseCallbackProblem,
      'Solution with useCallback': UseCallbackSolution,
      'useCallback with useEffect': UseCallbackWithUseEffect,
      'useCallback as Props': UseCallbackAsProps
    }
  },
  '003-useReducer': {
    title: 'useReducer',
    components: {
      'Simple Counter': CounterSimple,
      'Counter with Payload': CounterWithPayload,
      'Todo Reducer': TodoReducer,
      'Form Reducer': FormReducer,
      'Async Reducer': AsyncReducer
    }
  },
  '004-customHooks': {
    title: 'Custom Hooks',
    components: {
      'useLocalStorage': UseLocalStorageExample,
      'useBreakpoint': UseBreakpointExample,
      'useDebounce': UseDebounceExample
    }
  },
  '005-useLayoutEffect': {
    title: 'useLayoutEffect',
    components: {
      'Problem without useLayoutEffect': ProblemWithoutUseLayoutEffect,
      'Solution with useLayoutEffect': SolutionWithUseLayoutEffect
    }
  },
  '006-useDebugValue': {
    title: 'useDebugValue',
    components: {
      'useDebugValue Example': UseDebugValueExample
    }
  },
  '007-useImperativeHandle': {
    title: 'useImperativeHandle',
    components: {
      'Problem without useImperativeHandle': ProblemWithoutUseImperativeHandle,
      'Solution with useImperativeHandle': SolutionWithUseImperativeHandle,
      'Advanced useImperativeHandle': AdvancedUseImperativeHandle
    }
  }
}; 