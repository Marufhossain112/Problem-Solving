//* PW2.01.01 Two Sum
//* Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

//* You may assume that each input would have exactly one solution, and you may not use the same element twice.

//* You can return the answer in any order.

function twoSum(nums, target) {
    const numMap = {}; // Create an empty hash map to store numbers and their indices

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (complement in numMap) {
            return [numMap[complement], i];
        }
        numMap[nums[i]] = i;
    }
    return [];
}

const resultSum = twoSum([2, 7, 11, 15], 9);
// console.log(resultSum);



//* Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

//* Notice that the solution set must not contain duplicate triplets.

function threeSum(nums) {
    nums.sort((a, b) => a - b); // Sort the array in ascending order
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }

                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

const resultThreeSum = threeSum([-1, 0, 1, 2, -1, -4]);
console.log("Result", resultThreeSum);




// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

function removeDuplicates(nums) {
    if (nums.length === 0) {
        return 0;
    }

    let uniquePointer = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[uniquePointer]) {
            uniquePointer++;
            nums[uniquePointer] = nums[i];
        }
    }

    return uniquePointer + 1;
}

// Example usage:
const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const expectedNums = [0, 1, 2, 3, 4];
const k = removeDuplicates(nums);

console.log("Length after removing duplicates:", k);
console.log("Modified array:", nums.slice(0, k));

// Assertion
console.assert(k === expectedNums.length, "Length mismatch");
for (let i = 0; i < k; i++) {
    console.assert(nums[i] === expectedNums[i], "Elements mismatch");
}


// A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

// For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
// The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

// For example, the next permutation of arr = [1,2,3] is [1,3,2].
// Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
// While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
// Given an array of integers nums, find the next permutation of nums.

// The replacement must be in place and use only constant extra memory.


function nextPermutation(nums) {
    let i = nums.length - 2;

    // Find the first pair from the right such that nums[i] < nums[i+1]
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // If such pair is found, find the first element to the right of nums[i] that is greater than nums[i]
    if (i >= 0) {
        let j = nums.length - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }

        // Swap nums[i] and nums[j]
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // Reverse the subarray to the right of nums[i]
    reverse(nums, i + 1);

    // Helper function to reverse a subarray
    function reverse(arr, start) {
        let end = arr.length - 1;
        while (start < end) {
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    }
}

// Example usage:
let number = [1, 2, 3];
nextPermutation(number);
console.log(number);  // Output: [1, 3, 2]

number = [3, 2, 1];
nextPermutation(number);
console.log(number);  // Output: [1, 2, 3]

number = [1, 1, 5];
nextPermutation(number);
console.log(number);  // Output: [1, 5, 1]


//* Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
//* You must write an algorithm with O(log n) runtime complexity.


function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            left = mid + 1; // Continue search in the right half
        } else {
            right = mid - 1; // Continue search in the left half
        }
    }

    return left; // Target not found, return the index where it would be inserted
}

// Example usage:
const numbers = [1, 3, 5, 6];
const target1 = 5;
const target2 = 2;
const target3 = 7;
const target4 = 0;

console.log(searchInsert(numbers, target1)); // Output: 2 (index of 5)
console.log(searchInsert(numbers, target2)); // Output: 1 (index where 2 should be inserted)
console.log(searchInsert(numbers, target3)); // Output: 4 (index where 7 should be inserted)
console.log(searchInsert(numbers, target4)); // Output: 0 (index where 0 should be inserted)



