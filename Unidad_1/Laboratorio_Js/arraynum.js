const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var contpar = 0;
var contimpar = 0;

function par(nums) {
  var contpar = 0;
  var contimpar = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      contpar++;
    } else {
      contimpar++;
    }
  }
  return { pares: contpar, impares: contimpar };
}

const par1 = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      contpar++;
    } else {
      contimpar++;
    }
  }
  console.log(`pares: ${contpar}, impares: ${contimpar}`);
};

console.log(nums);

let resultado = par(nums);
console.log(`pares: ${resultado.pares}, impares: ${resultado.impares}`);

par1(nums);
