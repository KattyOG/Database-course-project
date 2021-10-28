// //1
// "use strict";

// const readlineSync = require('readline-sync');
// let arr = [];
// let value = parseInt(readlineSync.question("Input N: "));

// while (value > 0){
//     let temp = readlineSync.question()
//     if (temp.length % 2 === 0)
//         arr.push(temp);
//     value--;
// }

// const jsonString = JSON.stringify(arr);
// const fs = require("fs");
// fs.writeFileSync("new.txt", jsonString);

// // 2
// "use strict";

// const fs = require("fs");
// const contentString = fs.readFileSync("new.txt", "utf8");
// let arr = JSON.parse(contentString);

// let letters = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
// for (let i = 0; i < arr.length; i++){
//     let word = arr[i];
//     let count = 0;
//     for (let j = 0; j < word.length; j++)
//     {
//         if (letters.indexOf(word[j]) === -1)
//             count++;
//     }
//     if (count === word.length)
//         console.log(word);
// }


// // // 3
// "use strict";

// const readlineSync = require('readline-sync');
// let file = readlineSync.question("Input file extension: ");
// let folder = readlineSync.question("Input folder address: ");
// const fs = require("fs");
// const arr = fs.readdirSync("C:\\Users\\mir80\\Desktop\\" + folder);

// for (let i = 0; i < arr.length; i++){
//     let temp = arr[i].split('.');
//     temp = temp[temp.length-1];
//     if (file == temp)
//         console.log(fs.readFileSync(arr[i], "utf8") + "\n\n");
// }

// //4
// const fs = require("fs");
// const readlineSync = require('readline-sync');

// function rec_file(way){
//     let arr = fs.readdirSync(way);
//     for(let file of arr){
//         let temp = file.split('.');
//         temp = temp[temp.length-1];
//         if (temp === "txt"){
//             let text = fs.readFileSync(way + "\\" + file, "utf8");
//             if (text.length <= 10)
//                 console.log(file);
//         }
//         else
//             rec_file(way + "\\" + file);
//     }
// }
// let way = "C:\\Users\\mir80\\Desktop\\" + readlineSync.question("Input start directory: ");
// rec_file(way);

// //5
// "use strict";
// const readlineSync = require('readline-sync');
// const fs = require("fs");
// let value = parseInt(readlineSync.question("Input N: "));
// let arr = [];
// while (value > 0){
//     arr.push(readlineSync.question());
//     value--;
// }
// let new_content = ""
// for (let i = 0; i < arr.length; i++){
//     let contentString = fs.readFileSync(arr[i], "utf8").toString().split("\n");
//     for (let j = 0; j < contentString.length; j++)
//         new_content += contentString[j];
// }
// fs.writeFileSync("new_3.txt", new_content);

// //6
// let old = {id : 0, link : null}
// for (let i = 1;;i++){
//     try{
//         let new_one = {id : i, link : old}
//         JSON.stringify(new_one);
//         old = new_one;
//     } catch(error){
//         console.log(i);
//         break;
//     }
// }

// //7
// "use strict";
// const fs = require("fs");
// const node_9 = {id: "9", l_leaf: null, r_leaf: null};
// const node_7 = {id: "7", l_leaf: node_9, r_leaf: null};
// const node_8 = {id: "8", l_leaf: null, r_leaf: null};
// const node_5 = {id: "5", l_leaf: null, r_leaf: null};
// const node_6 = {id: "6", l_leaf: null, r_leaf: null};
// const node_4 = {id: "4", l_leaf: node_7, r_leaf: node_8};
// const node_2 = {id: "2", l_leaf: node_5, r_leaf: node_6};
// const node_3 = {id: "3", l_leaf: node_4, r_leaf: null};
// const node_1 = {id: "1", l_leaf: node_2, r_leaf: node_3};
// fs.writeFileSync("new.txt", JSON.stringify(node_1));

// function max_depth(node, way) {
//     way += node.id;
//     arr.push(way);
//     if (node.l_leaf !== null && node.r_leaf !== null){
//         max_depth(node.l_leaf, way)
//         max_depth(node.r_leaf, way)
//     }
//     else if (node.l_leaf !== null)
//         max_depth(node.l_leaf, way)
//     else if (node.r_leaf !== null)
//         max_depth(node.r_leaf, way)    
// }

// const top = JSON.parse(fs.readFileSync("new.txt", "utf8"));
// let arr = []
// max_depth(top, "");
// let max = 0;
// let num = 0;
// for (let i = 0; i < arr.length; i++){
//     if(max < arr[i].length){
//         max = arr[i].length;
//         num = i;
//     }
// }
// console.log(arr[num]);


// //4_1 http://localhost:5015/me/page?p=a.html
// "use strict";

// const fs = require("fs");
// const express = require("express");
// const app = express();
// const port = 5015;
// app.listen(port);

// app.get("/me/page", function(request, response) {
//     const nameString = request.query.p;
//     if (fs.existsSync(nameString)) {
//         const contentString = fs.readFileSync(nameString, "utf8");
//         response.end(contentString);
//     } else {
//         const contentString = fs.readFileSync("bad.html", "utf8");
//         response.end(contentString);
//     }
// });

// app.get("/max_num", function(request, response){
//     const a = request.query.a;
//     const b = request.query.b;
//     const c = request.query.c;
//     const aInt = parseInt(a);
//     const bInt = parseInt(b);
//     const cInt = parseInt(c);
//     const res = Math.max(aInt, bInt, cInt);
//     const answerJSON = JSON.stringify({result: res});
//     response.end(answerJSON);
// });

// //4_4
// "use strict";
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const port = 5015;
// app.listen(port);

// app.get("/me/page", function(request, response) {
//     const nameString = request.query.p;
//     if (fs.existsSync(nameString)) {
//         const contentString = fs.readFileSync(nameString, "utf8");
//         response.end(contentString);
//     } else {
//         const contentString = fs.readFileSync("bad.html", "utf8");
//         response.end(contentString);
//     }
// });

// app.get("/find_arr", function(request, response) {
//     const a = request.query.a;
//     const b = request.query.b;
//     const c = request.query.c;
//     const aInt = parseInt(a);
//     const bInt = parseInt(b);
//     const cInt = parseInt(c);
//     let arr = []
//     for (let i = aInt; i < bInt; i++){
//         if (i % cInt === 0)
//             arr.push(i);
//     }
//     const answerJSON = JSON.stringify({result: arr});
//     response.end(answerJSON);
// });

// //4_2
// "use strict";
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const port = 5015;
// app.listen(port);

// app.get("/me/page", function(request, response) {
//     const nameString = request.query.p;
//     if (fs.existsSync(nameString)) {
//         const contentString = fs.readFileSync(nameString, "utf8");
//         response.end(contentString);
//     } else {
//         const contentString = fs.readFileSync("bad.html", "utf8");
//         response.end(contentString);
//     }
// });

// const arr2 = JSON.parse(fs.readFileSync("new.txt", "utf8"));

// app.get("/obj_content", function(request, response) {
//     const index = request.query.index;
//     const indexInt = parseInt(index);
//     const answerJSON = JSON.stringify({result: arr2[indexInt]});
//     response.end(answerJSON);
// });

// let arr = []
// arr[0] = {
//     name: "Bob",
//     age: 50,
//   }
// arr[1] = {
//     name: "Mike",
//     age: 15,
//   }
// arr[2] = {
//     name: "Nik",
//     age: 28,
// }

// const jsonString = JSON.stringify(arr);
// fs.writeFileSync("new.txt", jsonString);

// //4_3
// "use strict";
// const express = require("express");
// const fs = require("fs");
// const app = express();
// const port = 5015;
// app.listen(port);

// app.get("/me/page", function(request, response){
//     const nameString = request.query.p;
//     if (fs.existsSync(nameString)) {
//         const contentString = fs.readFileSync(nameString, "utf8");
//         response.end(contentString);
//     } else {
//         const contentString = fs.readFileSync("bad.html", "utf8");
//         response.end(contentString);
//     }
// });

// app.get("/new_rec", function(request, response){ 
//     let fields = request.query.fields.split(","); 
//     const adress = request.query.adress; 
//     const way = "C:\\Users\\mir80\\Desktop\\task_3\\final_rec.html"; 
//     let final_rec = '<!DOCTYPE html>\n\ <html>\n\ <head>\n\ <meta charset="UTF-8">\n\ <title></title>\n\ </head>\n\ <body>\n\ <h1></h1>\n\ <form method="GET" action="/' 
//     + adress + '">\n' 
//     for (let i of fields){ 
//         final_rec += ' <p>' + i + '</p>\n'; 
//         final_rec += ' <input name="' + i + '" spellcheck="false" autocomplete="off">\n' 
//     }
//         final_rec += ' <br>\n\ <br>\n\ <input type="submit" value="request">\n\ </form>\n\ </body>\n\ </html>' 
//     fs.writeFileSync(way, final_rec);  
//     app.get("/" + adress, function(request, response) { 
//         let contentString = JSON.stringify(request.query); 
//         response.end(contentString); 
//     }); 
//     response.end(final_rec); 
// });
