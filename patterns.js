let size = 5;

// for (let i = 1; i <= size; i++) {
//   console.log(`*`.repeat(i) + `\n`);
// }

// console.log(`next`);

let printPattern1 = (rows) => {
  for (let i = 1; i <= rows; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "*";
    }
    console.log(row);
  }
};

let printPattern2 = (rows) => {
  for (let i = 0; i < rows; i++) {
    let row = "";
    for (let j = 0; j > i; j++) {
      row += "*";
    }
    console.log(row);
  }
};

let printPattern3 = (rows) => {
  let count = 0;
  for (let i = rows; i > 1; i--) {
    let row = "";
    for (let j = 0; j < rows; j++) {
      if (
        j >= (rows - 1) / 2 - count + 1 &&
        j <= (rows - 1) / 2 + count - 1 &&
        count > 0
      )
        row += " ";
      else row += "*";
    }
    count++;
    console.log(row);
    if (i === 1) {
      for (let k = 0; k < rows - 1; k++) {
        row += "*";
        console.log(row);
      }
    }
  }
};

printPattern3(size);
// console.log(`hello`);
// printPattern1(size);
