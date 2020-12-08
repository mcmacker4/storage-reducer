type Reducer<S, A> = (state: S, action?: A) => S

export function storedReducer<S, A>(key: string, reducer: Reducer<S, A>): Reducer<S, A> {

    return function(state: S, action?: A): S {

        if (state === undefined) {

            const loaded = localStorage.getItem(key)

            if (loaded === null) {

                const newState = reducer(state, action)
                localStorage.setItem(key, JSON.stringify(newState))

                return newState

            } else {

                return JSON.parse(loaded) as S

            }

        } else {

            const newState = reducer(state, action)
            localStorage.setItem(key, JSON.stringify(newState))

            return newState

        }

    }

}

