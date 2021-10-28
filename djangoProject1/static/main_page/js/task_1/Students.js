"use strict";

class student{
    constructor(group, student_card, marks){
        this.group = group;
        this.student_card = student_card;
        this.marks = marks;
    }
}

function student_create(group, student_card, marks){
    for (let i = 0; i < students.length; i++)
        if (students[i].student_card === student_card){
            console.log("This student_card already exists");
            return;
        }
    students.push(new student(group, student_card, marks));
}

function students_read(){
    for (let i = 0;  i < students.length; i++)
        console.log("group - " + students[i].group, "\nstudent card - " + students[i].student_card, "\nmarks - " + students[i].marks + "\n");
}

function student_update(student_card, new_group, new_marks){
    for (let i = 0; i < students.length; i++)
        if (students[i].student_card === student_card){
            students[i].group = new_group;
            students[i].marks = new_marks;
        }
}

function student_delete(student_card){
    for (let i = 0; i < students.length; i++)
        if (students[i].student_card  === student_card)
            students.splice(i, 1);
}

function avg_mark(student_card){
    for (let i = 0; i < students.length; i++)
        if (students[i].student_card === student_card){
            let avg = 0;
            for (let j = 0; j < students[i].marks.length; j++)
                avg += students[i].marks[j];
            return (avg / students[i].marks.length);
        }
}

function group_information(group){
    for (let i = 0; i < students.length; i++)
        if (students[i].group  === group)
            console.log("group - " + students[i].group, "\nstudent_card - " + students[i].student_card, "\nmarks - " + students[i].marks + "\n");
}

function maximum_marks(group){
    let max;
    for (let i = 0; i < students.length; i++)
        if (students[i].group  === group)
            max = students[0];

    for (let i = 0; i < students.length; i++)
        if (students[i].group  === group)
            if (students[i].marks.length > max.marks.length)
                max = students[i];

    console.log("group - " + max.group, "\nstudent_card - " + max.student_card, "\nmarks - " + max.marks + "\n");
}

function no_marks() {
    for (let i = 0; i < students.length; i++)
        if (students[i].marks.length  === 0)
            console.log("group - " + students[i].group, "\nstudent_card - " + students[i].student_card, "\nmarks - " + students[i].marks + "\n");
}
let students = [];

student_create("1583-HU", "158492", [4, 2, 2, 2, 5]);
student_create("1583-HU", "843123", [3, 3, 2]);
student_create("1390-KD", "574923", [4, 3, 2, 4]);
student_create("9123-OP", "095824", [2, 3, 4, 5, 3]);
student_create("9123-OP", "123146", [4, 5, 5]);
student_create("1390-KD", "395752", [3, 3, 4, 4, 5, 3]);
student_create("1390-KD", "585284", []);
students_read();
console.log("-----------------------------");

student_update("395752", "9123-OP", [5, 5, 4]);
students_read();
console.log("-----------------------------");

student_delete("095824");
students_read();
console.log("-----------------------------");

console.log("Average mark - " + avg_mark("843123"));
console.log("-----------------------------");

group_information("1390-KD");
console.log("-----------------------------");

maximum_marks("1583-HU");
console.log("-----------------------------");

no_marks();
console.log("-----------------------------");

