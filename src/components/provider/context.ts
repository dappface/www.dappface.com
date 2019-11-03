import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useReducer,
} from 'react'
import {createSelector} from 'reselect'
import uuid from 'uuid/v4'

interface State {
  methodIds: string[]
  entities: {
    methods: NormalizedMethods
    params: NormalizedParams
  }
}

interface NormalizedMethods {
  [key: string]: MethodEntity
}

interface NormalizedParams {
  [key: string]: ParamEntity
}

export interface MethodEntity {
  id: string
  value: string
  paramIds: string[]
}

export interface ParamEntity {
  id: string
  value: string
  methodId: string
}

const SandboxContext = createContext<SandboxContextValue | undefined>(undefined)
export const {Provider: SandboxProvider} = SandboxContext

export function useSandboxContext(): SandboxContextValue {
  return useContext(SandboxContext) as SandboxContextValue
}

enum ActionType {
  SetState,
  AddMethodId,
  RemoveMethodId,
  SetMethod,
  SetParam,
  RemoveMethod,
  RemoveParam,
}

interface SetState {
  type: ActionType.SetState
  payload: {state: State}
}

interface AddMethodId {
  type: ActionType.AddMethodId
  payload: {id: string}
}

interface RemoveMethodId {
  type: ActionType.RemoveMethodId
  payload: {id: string}
}

interface SetMethod {
  type: ActionType.SetMethod
  payload: {method: MethodEntity}
}

interface SetParam {
  type: ActionType.SetParam
  payload: {param: ParamEntity}
}

interface RemoveMethod {
  type: ActionType.RemoveMethod
  payload: {id: string}
}

interface RemoveParam {
  type: ActionType.RemoveParam
  payload: {id: string}
}

type Actions =
  | SetState
  | AddMethodId
  | RemoveMethodId
  | SetMethod
  | SetParam
  | RemoveMethod
  | RemoveParam

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.SetState:
      return action.payload.state
    case ActionType.AddMethodId:
      return {...state, methodIds: [...state.methodIds, action.payload.id]}
    case ActionType.RemoveMethodId:
      return {
        ...state,
        methodIds: state.methodIds.filter(id => id !== action.payload.id),
      }
    case ActionType.SetMethod:
      return {
        ...state,
        entities: {
          ...state.entities,
          methods: {
            ...state.entities.methods,
            [action.payload.method.id]: action.payload.method,
          },
        },
      }
    case ActionType.SetParam:
      return {
        ...state,
        entities: {
          ...state.entities,
          params: {
            ...state.entities.params,
            [action.payload.param.id]: action.payload.param,
          },
        },
      }
    case ActionType.RemoveMethod: {
      const {[action.payload.id]: _, ...methods} = state.entities.methods
      return {
        ...state,
        entities: {
          ...state.entities,
          methods,
        },
      }
    }
    case ActionType.RemoveParam: {
      const {[action.payload.id]: _, ...params} = state.entities.params
      return {
        ...state,
        entities: {
          ...state.entities,
          params,
        },
      }
    }
    default:
      return state
  }
}

export function useSandboxSelector<T = {}>(selector: (state: State) => T): T {
  const {state} = useSandboxContext()
  return selector(state)
}

interface SandboxContextValue {
  state: State
  addMethod: (name?: string, params?: string[]) => void
  removeMethodFactory: (method: MethodEntity) => () => void
  onChangeMethodFactory: (
    method: MethodEntity,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  addParam: (method: MethodEntity, value?: string) => void
  removeParamFactory: (param: ParamEntity) => () => void
  onChangeParamFactory: (
    param: ParamEntity,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function useSandboxContextValue(): SandboxContextValue {
  const initialState: State = {
    methodIds: [],
    entities: {
      methods: {},
      params: {},
    },
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const addMethod = useCallback<SandboxContextValue['addMethod']>(
    (name, params) => {
      const method: MethodEntity = {
        id: uuid(),
        value: name || '',
        paramIds: [],
      }
      dispatch(addMethodIdAction(method.id))
      dispatch(setMethodAction(method))

      if (params) {
        params.forEach((value): void => {
          addParam(method, value)
        })
      }
    },
    [state],
  )

  const removeMethodFactory = useCallback<
    SandboxContextValue['removeMethodFactory']
  >(
    method => (): void => {
      dispatch(removeMethodIdAction(method.id))
      dispatch(removeMethodAction(method.id))
      method.paramIds.forEach(id => {
        dispatch(removeParamAction(id))
      })
    },
    [state],
  )

  const onChangeMethodFactory = useCallback<
    SandboxContextValue['onChangeMethodFactory']
  >(
    method => (e): void => {
      dispatch(setMethodAction({...method, value: e.target.value}))
    },
    [state],
  )

  const addParam = useCallback<SandboxContextValue['addParam']>(
    (method, value): void => {
      const param: ParamEntity = {
        id: uuid(),
        value: value || '',
        methodId: method.id,
      }
      dispatch(
        setMethodAction({...method, paramIds: [...method.paramIds, param.id]}),
      )
      dispatch(setParamAction(param))
    },
    [state],
  )

  const removeParamFactory = useCallback<
    SandboxContextValue['removeParamFactory']
  >(
    (param: ParamEntity) => (): void => {
      const method = getMethodFactory(param.methodId)(state)
      dispatch(
        setMethodAction({
          ...method,
          paramIds: method.paramIds.filter(id => id !== param.id),
        }),
      )
      dispatch(removeParamAction(param.id))
    },
    [state],
  )

  const onChangeParamFactory = useCallback<
    SandboxContextValue['onChangeParamFactory']
  >(
    param => (e): void => {
      dispatch(setParamAction({...param, value: e.target.value}))
    },
    [state],
  )

  const counter = useRef(0)

  useEffect(() => {
    if (counter.current === 0) {
      counter.current = 1
      return
    }
    window.localStorage.setItem('sandboxState', JSON.stringify(state))
  }, [state])

  useEffect(() => {
    const savedStateStr = window.localStorage.getItem('sandboxState')
    const savedState: State | undefined =
      savedStateStr !== null ? JSON.parse(savedStateStr) : undefined
    if (savedState) {
      dispatch(setStateAction(savedState))
    }
    if (!savedState || savedState.methodIds.length === 0) {
      addMethod('eth_accounts')
    }
  }, [])

  return {
    state,
    addMethod,
    removeMethodFactory,
    onChangeMethodFactory,
    addParam,
    removeParamFactory,
    onChangeParamFactory,
  }
}

function setStateAction(state: State): SetState {
  return {
    type: ActionType.SetState,
    payload: {state},
  }
}

function addMethodIdAction(id: string): AddMethodId {
  return {
    type: ActionType.AddMethodId,
    payload: {id},
  }
}

function removeMethodIdAction(id: string): RemoveMethodId {
  return {
    type: ActionType.RemoveMethodId,
    payload: {id},
  }
}

function setMethodAction(method: MethodEntity): SetMethod {
  return {
    type: ActionType.SetMethod,
    payload: {method},
  }
}

function removeMethodAction(id: string): RemoveMethod {
  return {
    type: ActionType.RemoveMethod,
    payload: {id},
  }
}

function setParamAction(param: ParamEntity): SetParam {
  return {
    type: ActionType.SetParam,
    payload: {param},
  }
}

function removeParamAction(id: string): RemoveParam {
  return {
    type: ActionType.RemoveParam,
    payload: {id},
  }
}

export function getMethodIds(state: State): string[] {
  return state.methodIds
}

export function getMethodFactory(id: string) {
  return (state: State): MethodEntity => state.entities.methods[id]
}

function getNormalizedParams(state: State): NormalizedParams {
  return state.entities.params
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getParamFactory(id: string) {
  return createSelector(
    getNormalizedParams,
    (params: NormalizedParams): ParamEntity => params[id],
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getParams(methodId: string) {
  return createSelector(
    getMethodFactory(methodId),
    getNormalizedParams,
    (method: MethodEntity, params: NormalizedParams): ParamEntity[] =>
      method.paramIds.map(id => params[id]),
  )
}
