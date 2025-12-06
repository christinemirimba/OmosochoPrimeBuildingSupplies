import { useState, useEffect } from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
}

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}

type ActionType = {
    ADD_TOAST: "ADD_TOAST"
    UPDATE_TOAST: "UPDATE_TOAST"
    DISMISS_TOAST: "DISMISS_TOAST"
    REMOVE_TOAST: "REMOVE_TOAST"
}

let memoryState: { toasts: ToasterToast[] } = { toasts: [] }
let listeners: Array<(state: typeof memoryState) => void> = []

function dispatch(action: { type: string; toast?: Partial<ToasterToast>; toastId?: string }) {
    memoryState = {
        ...memoryState,
        toasts: action.type === "ADD_TOAST"
            ? [...memoryState.toasts, action.toast as ToasterToast].slice(0, TOAST_LIMIT)
            : action.type === "DISMISS_TOAST" || action.type === "REMOVE_TOAST"
                ? memoryState.toasts.filter((t) => t.id !== action.toastId)
                : memoryState.toasts
    }
    listeners.forEach((listener) => listener(memoryState))
}

export function useToast() {
    const [state, setState] = useState(memoryState)

    useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        toast: ({ title, description, action }: Omit<ToasterToast, "id">) => {
            const id = genId()
            dispatch({
                type: "ADD_TOAST",
                toast: {
                    id,
                    title,
                    description,
                    action,
                },
            })
            setTimeout(() => {
                dispatch({ type: "DISMISS_TOAST", toastId: id })
            }, 5000)
        },
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    }
}
