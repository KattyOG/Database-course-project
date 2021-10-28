nok(FIRST, SECOND, TEMP) :- 
    OST_FIRST is TEMP mod FIRST, 
    OST_SECOND is TEMP mod SECOND, 
    OST_FIRST is 0, 
    OST_SECOND is 0, 
    write(TEMP);
    NEW_ELEM is TEMP + 1, 
    nok(FIRST, SECOND, NEW_ELEM).

start :- 
    read(FIRST), 
    read(SECOND), 
    (FIRST > SECOND, 
        nok(FIRST, SECOND, FIRST); 
        nok(FIRST, SECOND, SECOND)).