writeNumber(X) :- X_NEW is X, write(X_NEW), write(" ").

fibon(PREV_PREV, PREV, A, B) :-
    PREV_PREV =< B,
    (
        (
            PREV_PREV >= A, 
            writeNumber(PREV_PREV),
            fail
        );
        TEMP is PREV_PREV + PREV, 
        fibon(PREV, TEMP, A, B)
    ).

start(A, B) :- 
    A =< B, 
    fibon(0, 1, A, B).