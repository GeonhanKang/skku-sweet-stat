#!/usr/bin/env node

if (process.argv.length <= 3) {
    console.log("Insufficient parameter!");
    process.exit(1);
}

let cmd = process.argv[2];

let num = process.argv
    .slice(3, process.argv.length)
    .map((n) => parseFloat(n));

if (num.some((n) => isNaN(n))) {
    console.log("Some arguments are not numbers!");
    process.exit(1);
}


switch (cmd) {
    case "sum":
        console.log(sum(num));
        break;

    case "avg":
        console.log(avg(num));
        break;

    case "max":
        console.log(max(num));
        break;

    case "med":
        num.sort((a, b) => a - b);
        console.log(med(num));
        break;

    case "iqr":
        num.sort((a, b) => a - b);
        let q1 = iqr(num);
        console.log(q1[0]);
        break;

    case "outlier":
        let tmp = num.slice();
        tmp.sort((a, b) => a - b);
        let q2 = iqr(tmp);
        let l_bound = q2[1] - 1.5 * q2[0];
        let h_bound = q2[2] + 1.5 * q2[0];
        num.forEach((a) => {
            if (a < l_bound || a > h_bound)
                console.log(a);
        })
        break;

    default:
        console.log("Wrong command!");
        process.exit(1);
}

function sum(num) {
    return num.reduce((prev, curr) => prev + curr, 0);
}

function avg(num) {
    return sum(num) / num.length;
}

function max(num) {
    return num.reduce((max, curr) => (max > curr ? max : curr), num[0]);
}

function med(num) {
    if (num.length % 2 === 0) {
        return (num[(num.length) / 2 - 1] + num[(num.length) / 2]) / 2;
    }
    else {
        return num[(num.length - 1) / 2];
    }
}

function iqr(num) {
    let part1, part2;
    if (num.length % 2 === 0) {
        part1 = num.slice(0, num.length / 2);
        part2 = num.slice(num.length / 2, num.length);
    }
    else {
        part1 = num.slice(0, (num.length - 1) / 2);
        part2 = num.slice((num.length + 1) / 2, num.length);
    }

    let q = [0, 0, 0];
    q[1] = med(part1);
    q[2] = med(part2);
    q[0] = q[2] - q[1];

    return q;
}