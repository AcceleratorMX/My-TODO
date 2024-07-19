import {catchError, map, switchMap} from "rxjs/operators";
import {from} from "rxjs";
import {ofType} from "redux-observable";

export const createAction = (type) => (payload) => ({type, payload});

export const handleInputChange = (setState) => (event) => setState(event.target.value);

const selectCurrentStorage = state => state.storage.currentStorage;

const GQL_API = import.meta.env.VITE_GQL_API;

export const fetchAll = (currentStorage, query, variables) => {
    console.log('Sending request to:', GQL_API);
    console.log('Query:', query);
    console.log('Variables:', variables);

    return from(fetch(GQL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Storage-Type': currentStorage
        },
        body: JSON.stringify({
            query,
            variables
        }),
    })).pipe(
        switchMap(response => from(response.json()))
    );
};

export const createEpic = (actionType, query, getVariables, successAction, failureAction) => (action$, state$) => action$.pipe(
    ofType(actionType),
    switchMap(action => {
        const currentStorage = selectCurrentStorage(state$.value);
        return from(fetchAll(currentStorage, query, getVariables(action)))
            .pipe(
                map(successAction),
                catchError(failureAction)
            )
    })
);
