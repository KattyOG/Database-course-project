writeNumber(X) :- X_NEW is X, write(X_NEW), write(" ").

a(X, Y, C, SUM) :- 
    X_NEW = X + 1,
    X =< Y,
    (
        TEMP is X mod C,
        TEMP is 0 -> SUM1 is X + SUM,
        (
            writeNumber(X), 
            a(X_NEW, Y, C, SUM1)
        ); SUM1 = SUM,
        a(X_NEW, Y, C, SUM1)
    ); 
        nl, writeNumber(SUM).

start(A, B, C):-
    a(A, B, C, 0). 