// execute this file where the input file is 
const readline = require('readline');
const fs = require('fs');

const ri = readline.createInterface({
    //input: fs.createReadStream('example')
    input: fs.createReadStream('input')
});

const parseCommand = line => {
    const parts = line.split(' ');
    return {
        command: parts[0],
        number: parseInt(parts[1], 10)
    };
};

const part1operations = {
    forward: ({hpos, depth}, {number}) => ({hpos: hpos+number, depth}),
    down: ({hpos, depth}, {number}) => ({hpos, depth: depth + number}),
    up: ({hpos, depth}, {number}) => ({hpos, depth: depth - number})
};

const part2operations = {
    forward: ({hpos, depth, aim}, {number}) => ({hpos: hpos + number, depth: depth + number*aim, aim}),
    down: ({hpos, depth, aim}, {number}) => ({hpos, depth, aim: aim + number}),
    up: ({hpos, depth, aim}, {number}) => ({hpos, depth, aim: aim - number})
};

const commandReducer = operations => (acc, c) => {
    const {command} = c;
    return operations[command](acc, c);
};

const solve = operations => start => commands => {
    const r = commandReducer(operations);
    const {hpos, depth} = commands.reduce(r, start);
    
    return hpos * depth;
};

const part1 = solve(part1operations)({hpos:0, depth:0});
const part2 = solve(part2operations)({hpos:0, depth:0, aim:0});

// input loading here
const input = [];
ri.on('line', line => input.push(parseCommand(line)));
ri.on('close', () => console.log("result =", part2(input)));