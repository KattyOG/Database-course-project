writeNumber(X) :- X_NEW is X, write(X_NEW), write(" ").

power_number(NUMBER, A, B) :-
    SQUAD is NUMBER * NUMBER,
    SQUAD =< B,
    (
        (
            SQUAD >= A, 
            writeNumber(SQUAD),
            fail
        );
        NEXT is NUMBER + 1, 
        power_number(NEXT, A, B)
    ).

start(A, B) :- 
    A =< B, 
    power_number(1, A, B).