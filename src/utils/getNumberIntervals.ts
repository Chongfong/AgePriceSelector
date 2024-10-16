export default function getNumberIntervals(ar: number[][]): {
  overlap: number[][];
  notInclude: number[][];
} {
  const full = new Array(21).fill(false);

  ar.forEach((each) => {
    for (let i = each[0]; i < each[1] + 1; i += 1) {
      if (full[i] === false) {
        full[i] = 'a';
      } else if (full[i] === 'a') {
        full[i] = 'b';
      } else {
        full[i] = 'c';
      }
    }
  });

  const overlap: number[][] = [];
  const notInclude: number[][] = [];
  let tempOverlap: number[] = [];
  let tempNotInclude: number[] = [];
  let inOverlap = false;
  let inNotInclude = false;

  full.forEach((each, ind) => {
    if (each === 'b' || each === 'c') {
      if (!inOverlap) {
        tempOverlap = [ind];
        inOverlap = true;
      }
    } else if (inOverlap) {
      tempOverlap.push(ind - 1);
      overlap.push(tempOverlap);
      inOverlap = false;
    }
    if (each === false) {
      if (!inNotInclude) {
        tempNotInclude = [ind];
        inNotInclude = true;
      }
    } else if (inNotInclude) {
      tempNotInclude.push(ind - 1);
      notInclude.push(tempNotInclude);
      inNotInclude = false;
    }
  });

  if (inOverlap) {
    tempOverlap.push(full.length - 1);
    overlap.push(tempOverlap);
  }

  if (inNotInclude) {
    tempNotInclude.push(full.length - 1);
    notInclude.push(tempNotInclude);
  }

  const result = { overlap, notInclude };
  return result;
}
