// //1
// class point{
//     create(x, y){
//         this.x = x;
//         this.y = y;
//     }
//     m_output(){
//         return "\nx - " + this.x + "\ny - " + this.y; 
//     }
// }

// class line{
//     create(initial, final){
//         this.initial = initial;
//         this.final = final;
//     }
//     m_output(){
//         return "\ninitial point - " + this.initial.m_output() + "\n\nfinal point - " + this.final.m_output()
//     }
//     l_lenght(){
//         return "\nlenght - " + Math.sqrt((this.initial.x - this.final.x)**2 + (this.initial.y - this.final.y)**2);
//     }
// }

// let f_point = new point();
// let s_point = new point();
// let n_line = new line();

// f_point.create(0, 0);
// s_point.create(10, 10);

// console.log(f_point.m_output());
// console.log(s_point.m_output());
// console.log("-----------------------------");

// n_line.create(f_point, s_point);

// console.log(n_line.m_output());
// console.log("-----------------------------");

// console.log(n_line.l_lenght());
// console.log("-----------------------------");

// //2
// class triangle{
//     create(a, b, c){
//         this.a = a;
//         this.b = b;
//         this.c = c;
//     }
//     existence(){
//         if (!((this.a + this.b > this.c) && (this.b + this.c > this.a) && (this.a + this.c > this.b))){
//             console.log("not exist");
//             return;
//         }
//     }
//     perimeter(){
//         return this.a + this.b + this.c;
//     }
//     square(){
//         let per = this.perimeter() / 2;
//         return Math.sqrt(per * (per - this.a) * (per - this.b) * (per - this.c));
//     }
//     is_square()
//     {
//         if (!((this.a*this.a + this.b*this.b == this.c*this.c) ||
//         (this.a*this.a + this.c*this.c == this.b*this.b) || (this.b*this.b + this.c*this.c == this.a*this.a))){
//             console.log("not square");
//             return;
//         }
//     }
// }

// let n_triangle = new triangle();

// n_triangle.create(10, 26, 24);
// n_triangle.existence();
// console.log("perimeter - " + (n_triangle.perimeter()));
// console.log("square - " + (n_triangle.square()));
// n_triangle.is_square();

// console.log("-----------------------------");

// let b_triangle = new triangle();

// b_triangle.create(4, 5, 10);
// b_triangle.existence();

// console.log("-----------------------------");

// let ns_triangle = new triangle();

// ns_triangle.create(3, 5, 6);
// ns_triangle.existence();
// console.log("perimeter - " + (ns_triangle.perimeter()));
// console.log("square - " + (ns_triangle.square()));
// ns_triangle.is_square();


// //3n
// "use strict";

// function first(){
//     let i = 0;
//     let interval = setInterval(() => {
//         i++;
//         console.log(i);
//         if (i === 10) {
//             clearInterval(interval);
//             second();
//         }
//     }, 2000)
// }

// function second(){
//     let i = 10;
//     let interval = setInterval(() => {
//         i++;
//         console.log(i);
//         if (i === 20) {
//             clearInterval(interval);
//             first();
//         }
//     }, 1000)
// }

// first();