import {createContext, useCallback, useContext, useReducer} from 'react'
import {createSelector} from 'reselect'
import uuid from 'uuid/v4'

interface State {
  methodIds: string[]
  entities: {
    methods: {[key: string]: MethodEntity}
    params: {[key: string]: ParamEntity}
  }
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
  AddMethodId,
  RemoveMethodId,
  SetMethod,
  SetParam,
  RemoveMethod,
  RemoveParam,
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
  | AddMethodId
  | RemoveMethodId
  | SetMethod
  | SetParam
  | RemoveMethod
  | RemoveParam

function reducer(state: State, action: Actions): State {
  switch (action.type) {
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

export function useSandboxSelector<T = any>(selector: (state: State) => T): T {
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
  addParamFactory: (method: MethodEntity) => (value?: string) => void
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
        params.map(value => {
          addParamFactory(method)(value)
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

  const addParamFactory = useCallback<SandboxContextValue['addParamFactory']>(
    method => (value?: string): void => {
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

  return {
    state,
    addMethod,
    removeMethodFactory,
    onChangeMethodFactory,
    addParamFactory,
    removeParamFactory,
    onChangeParamFactory,
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

export function getParamFactory(id: string) {
  return (state: State): ParamEntity => state.entities.params[id]
}

export function getParams(methodId: string) {
  return createSelector(
    getMethodFactory(methodId),
    (method: MethodEntity): ParamEntity[] => {
      return method.paramIds.map(getParamFactory)
    },
  )
}
