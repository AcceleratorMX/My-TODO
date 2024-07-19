import {catchError, map, switchMap} from "rxjs/operators";
import {from} from "rxjs";
import {ofType} from "redux-observable";

export const createAction = (type) => (payload) => ({ type, payload });

const GQL_API = 'https://localhost:7250/graphql';

export const fetchAll = (query, variables) => {
    console.log('Sending request to:', GQL_API);
    console.log('Query:', query);
    console.log('Variables:', variables);

    return from(fetch(GQL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Storage-Type': 'xml'
        },
        body: JSON.stringify({
            query,
            variables
        }),
    })).pipe(
        switchMap(response => from(response.json()))
    );
};

 export const createEpic = (actionType, query, getVariables, successAction, failureAction) => action$ => action$.pipe(
    ofType(actionType),
     switchMap(action =>
        from(fetchAll(query, getVariables(action)))
            .pipe(
                map(successAction),
                catchError(failureAction)
            )
    )
);
