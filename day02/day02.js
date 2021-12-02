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
    forward: (state, number) => {
        const {hpos} = state;
        return { ...state, hpos: hpos + number};
    },

    down: (state, number) => {
        const {depth} = state;
        return {...state, depth: depth + number};
    },

    up: (state, number) => {
        const {depth} = state;
        return {...state, depth: depth - number};
    }
};

const part2operations = {
    forward: (state, number) => {
        const {hpos, depth, aim} = state;
        return {
            ...state,
            hpos: hpos + number,
            depth: depth + number * aim
        }
    },

    down: (state, number) => {
        const {aim} = state;
        return {...state, aim: aim + number}
    },
    
    up: (state, number) => {
        const {aim} = state;
        return {...state, aim: aim - number};
    }
};

const commandReducer = operations => (acc, c) => {
    const {command, number} = c;
    return operations[command](acc, number);
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