"use strict";

const array = ("" + process.argv[2]).split(",");
const execSync = require('child_process').execSync;

function useCmd(s){
    const options = {encoding: 'utf8'};
    const cmd = s.toString();
    const answer = execSync(cmd, options);
    return answer.toString();
}
let res = "";
for (let num of array) {
    const fact = `node factorial.js ${num}`;
    res += useCmd(fact).slice(0, -1) + " ";
}
console.log(res);