// execute this file where the input file is 
const readline = require('readline');
const fs = require('fs');

const ri = readline.createInterface({
    input: fs.createReadStream('input')
});

const part1reducer = (acc, elt) => {
    if (!acc.previous || acc.previous >= elt) {
        return { ...acc, previous: elt };
    } else {
        return { incr: acc.incr + 1, previous: elt }
    }
};

function part1(data) {
    const {incr} = data.reduce(part1reducer, { incr: 0 });
    return incr;
}

const part2reducer = (acc, elt, idx, arr) => {
    if (idx - 2 >= 0) {
        acc[idx - 2] += elt;
    }
    if (idx - 1 >= 0) {
        acc[idx - 1] += elt;
    }
    acc[idx] += elt;
    return acc;
};

function part2(data) {
    // transform an array filled of 0 to do the addition of sliding windows on the fly
    const slidingWindowsCounts = data.reduce(part2reducer, new Array(input.length).fill(0));
    // then we pass it to the part1 function to display the number of increase.
    return part1(slidingWindowsCounts);
}

// input loading here
const input = [];
ri.on('line', line => input.push(parseInt(line, 10)));
//ri.on('close', () => console.log("result =", part1(input)));
ri.on('close', () => console.log("result =", part2(input)));
