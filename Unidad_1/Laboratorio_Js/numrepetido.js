const nums = [1, 1, 1, 5, 8, 6, 2, 1, 2, 5, 45, 2, 1];

function repetido(nums) {
  const cont = {};
  let max = nums[0];
  let maxcont = 1;

  for (let n of nums) {
    cont[n] = (cont[n] || 0) + 1;
    if (cont[n] > maxcont) {
      maxcont = cont[n];
      max = n;
    }
  }
  return max;
}

const repetidora = (nums) => {
  const cont = {};
  let max = nums[0];
  let maxcont = 1;

  for (let n of nums) {
    cont[n] = (cont[n] || 0) + 1;
    if (cont[n] > maxcont) {
      maxcont = cont[n];
      max = n;
    }
  }
  console.log(`Número más repetido: ${max}`);
};

console.log(nums);

let resultado = repetido(nums);
console.log(`Número más repetido: ${resultado}`);

repetidora(nums);
