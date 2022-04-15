# 算法

## 组合
```js
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
  /**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 1 2 3 4    2
//       1
//     2 3 4
// k-path.length
var combine = function(n, k) {
  let result = [], path = []

  function backtrack(n, k, startIndex){
    if (path.length === k){
      result.push([...path]);
      return;
    }
    for (let i = startIndex; i <= n- (k - path.length) + 1; i++) {
      path.push(i)
      backtrack(n, k, i+1)
      path.pop()
    }
  }
  backtrack(n, k, 1);
  return result;
};
console.log(combine(4, 4))
```

## 斐波那契数列
```js
//   写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：
// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
// 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
/**
 * @param {number} n
 * @return {number}
 */
// var fib = function(n) {
//   if (n === 0){
//     return 0;
//   }
//   if (n === 1) {
//     return 1;
//   }
//   return fib(n-1) + fib(n-2);
// };
// console.log(fib(5))

// var fib = function(n) {
//   if(n==0||n==1){
//       return n;
//   }
//   let a = 0, b = 1, sum=a+b;
//   for(let i = 2; i < n; i++){
//       a = b;
//       b = sum;
//       sum = (a + b) % 1000000007;
//   }
//   return sum;
// }
//暂存法
// const fib = function(n, map= new Map()) {
//   if (n < 2) {
//     return n;
//   }
//   map.set(0, 0)
//   map.set(1, 1)
//   for (var i= 2; i<=n; i++) {
//     map.set(i, map.get(i-1) + map.get(i-2))
//   }
//   return map.get(n)
// }
// const fib = function(n, map = []){
//   if (n < 2){
//     return n;
//   }
//   if (!map[n]){
//     map[n] = fib(n-1, map) + fib(n-2, map)
//   }
//   return map[n]
// }
const fib = function (n) {
  if (n<2) {
    return n
  }
  let i = 2, cur = 1,pre = 0, result = 1;
  while (i++ < n) {
    pre  = cur;
    cur = result
    result = (pre + cur) % 1000000007
  }

  // for(let i = 2; i < n; i++){
  //   a = b;
  //   b = sum;
  //   sum = (a + b) % 1000000007;
  // }
  return result;
  // return cur;
}
console.log(fib(100))
```

## 二分查找
```js
//   统计一个数字在排序数组中出现的次数。
// 示例 1:
// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2
// 示例 2:
// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0
// 提示：
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
//循环（O(n)）
// var search = function(nums, target) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === target) {
//       count++;
//     }
//   }
//   return count;
// };

//查找第一个大于等于 \textit{target}target 的下标，否则查找第一个大于 \textit{target}target 的下标
// var search = function(nums, target) {
//   if (nums.length == 0) return 0;
//   let l = 0, r = nums.length - 1;
//   while (l < r) {
//       let mid = l + r + 1 >> 1;
//       if (nums[mid] <= target) l = mid;
//       else r = mid - 1;
//   }
//   let st = nums[r] == target ? r + 1 : 0;
//   l = 0;
//   r = nums.length - 1;
//   while (l < r) {
//       let mid = l + r >> 1;
//       if (nums[mid] >= target) r = mid;
//       else l = mid + 1;
//   }
//   let ed = nums[r] == target ? r : 0;
//   return st - ed;
// }

// const binarySearch = (nums, target, lower) => {
//     let left = 0, right = nums.length - 1, ans = nums.length;
//     while (left <= right) {
//         const mid = Math.floor((left + right) / 2);
//         if (nums[mid] > target || (lower && nums[mid] >= target)) {
//             right = mid - 1;
//             ans = mid;
//         } else {
//             left = mid + 1;
//         }
//     }
//     return ans;
// }

// var search = function(nums, target) {
//     let ans = 0;
//     const leftIdx = binarySearch(nums, target, true);
//     const rightIdx = binarySearch(nums, target, false) - 1;
//     if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
//         ans = rightIdx - leftIdx + 1;
//     }
//     return ans;
// };

// function search(data,arr,start,end){
//   if (start > end) {
//     return -1;
//   }
//   let mid = Math.floor((start + end) / 2)
//   if (data === arr[mid]) {
//     return mid
//   } else if (data < arr[mid]) {
//     return search(data,arr,start, mid - 1)
//   }else {
//     return search(data,arr, mid + 1, end)
//   }
// }

function search(nums, target) {
  let start = 0, end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] == target) {
      if (nums[mid - 1] !== target) {
        start = mid;
        break;
      } else {
        end = mid -1
      }
    } else if (nums[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  const st = start
  start = 0, end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      if (nums[mid + 1] !== target){
        end = mid + 1;
        break;
      } else {
        start = mid + 1
      }
    } else if (nums[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  if (end - st > 0) {
    return end-st
  } 
  return 0
}

let nums = [5,7,7,8,8,8,8,8,10], target = 8
// console.log(search(nums,target))
// search(nums,target)
console.log(search(nums, target))
```

```js
//旋转数组最小数
function rotateArr(arr, low = 0, high = arr.length - 1) {
    if (arr.length == 0){
      return 0
    }
    let mid = Math.floor((low + high) / 2)
    if (mid == high){
      return arr[mid]
    }

    if (arr[mid] > arr[high]){
      return rotateArr(arr, mid - 1, high)
    } else if (arr[mid] < arr[high]) {
      return rotateArr(arr, low, mid)
    }else {
      return rotateArr(arr, low, high--)
    }
    
  }

  // function rotateArr(arr) {
  //   if (arr.length == 0){
  //     return 0
  //   }
  //   let low = 0, high = arr.length - 1
  //   while (low < high) {
  //     let mid = Math.floor((low + high)/2)
  //     if (arr[mid] > arr[high]) low = mid + 1
  //     else if (arr[mid] < arr[high]) high = mid
  //     else high-- 
  //   }
  //   return arr[low]
  // }
  const arr = [2,2,3,4,5,6,6]
  console.log( rotateArr(arr) )
```

```js
//查找缺失的数字
/**
* @param {number[]} nums
* @return {number}
*/
// var missingNumber = function(nums) {
//   for (let i = 0; i <= nums.length; i++) {
//     if (nums[i] === undefined) {
//       return i
//     } else if (nums[i] > i) {
//       return nums[i] -1
//     } else if (nums[i] == i) {
//       continue;
//     } else {
//       return nums[i] + 1
//     }
//   }
// };

var missingNumber = function(nums) {
  const findNumber = (start, end, nums) => {
    while (start <= end) {
      let mid = Math.floor( (start + end) / 2 )
      if (mid == nums[mid]) {
        start = mid + 1;
      } else if (mid < nums[mid]) {
        end = mid - 1;
      }
    }
    return start;
    // if (start > end) {
    //   return start
    // }
    // if (nums[mid] > mid ) {
    //   findNumber(start, mid-1)
    // } else if (nums[mid] == mid){
    //   findNumber(mid+1, end)
    // }
  }
  return findNumber(0, nums.length-1, nums)
};

const arr =[0,1,3];
console.log( missingNumber(arr) )
```

## 替换空格
```js
/**
 * @param {string} s
 * @return {string}
 */
// var replaceSpace = function(s) {
//   let i = 0;
//   let str = ''
//   while (i < s.length - 1) {
//     if (s[i] === ' ') {
//       str += '%20'
//     } else {
//       str += s[i]
//     }
//     i++
//   }
//   return str;
// };

var replaceSpace = function(s) {
  s = s.split('');
  let oldLen = s.length;
  let spaceCount = 0;
  for (let i = 0; i < oldLen; i++) {
    if (s[i] === ' ') spaceCount++;
  }
  s.length += spaceCount * 2;
  for (let i = oldLen - 1, j = s.length - 1; i >= 0; i--,j--) {
    if (s[i] != ' ') s[j] = s[i];
    else {
      s[j - 2] = '%';
      s[j - 1] = '2';
      s[j] = '0';
      j -= 2;
    }
  }
  return s.join('');
}

// var replaceSpace = function(s) {
//     s = s.split("");
//     let oldLen = s.length;
//     let spaceCount = 0;
//     for (let i = 0; i < oldLen; i++) {
//         if (s[i] === ' ') spaceCount++;
//     }
//     s.length += spaceCount * 2;
//     for (let i = oldLen - 1, j = s.length - 1; i >= 0; i--, j--) {
//         if (s[i] !== ' ') s[j] = s[i];
//         else {
//             s[j - 2] = '%';
//             s[j - 1] = '2';
//             s[j] = '0';
//             j -= 2;
//         }
//     }
//     return s.join('');
// };

console.log(replaceSpace('ad sd ds'))
```

## 掷骰子
```js
//   把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
// 你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

/**
 * @param {number} n
 * @return {number[]}
 */
// var dicesProbability = function(k) {
//   let n = 6;
//   let result = [], sumlist = [], map = new Map()

//   const backTrack = (n, k, startIndex, sum) => {
//     if (sumlist.length == k) {
//       map.set(sum, map.has(sum) ? map.get(sum) + 1 : 1)
//       return
//     }
//     for (let i = startIndex; i <= n; i++) {
//       sumlist.push(i);
//       sum += i;
//       backTrack(n, k, startIndex, sum)
//       sum -= i;
//       sumlist.pop()
//     }
//   }
//   backTrack(n, k, 1, 0)

//   for (const count of map.values()) {
//     result.push(count / Math.pow(6, k))
//   }

//   return result;
// };

//   把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。
// 你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

var dicesProbability = function(n) {
  const map = new Map(), res = [];

  const recursion = (total, step) => {
    if (step > n) {
      map.set(total, map.has(total) ? map.get(total) + 1 : 1)
      return
    }
    
    for (let i = 1; i <= 6; i++) {
      recursion(total + i, step + 1);
    }
  }

  recursion(0, 1)

  for (const count of map.values() ) {
    res.push(count / Math.pow(6, n))
  }

  return res;
}

console.log(dicesProbability(2))

// var twoSum = function(n) {
//   function diceCnt(n) {
//     if (n === 1) {
//         return [0, 1, 1, 1, 1, 1, 1];
//     }

//     cnts = diceCnt(n - 1);
//     for (let i = 6 * n; i > 0; i--) {
//         cnts[i] = cnts
//         .slice(Math.max(i - 6, 0), i)
//         .reduce((acc, cur) => acc + cur, 0);
//     }

//     return cnts;
//   }
//   return diceCnt(n)
//       .map(num => num / Math.pow(6, n))
//       .filter(Boolean)
// };

// console.log(dicesProbability(2))
// console.log(twoSum(1))
```

## 扑克牌顺子
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var isStraight = function(nums) {
//   const arr = nums.filter(item => item)
//   const temp = [...new Set(arr)].sort()
//   if (temp.length < 5) {
//     return false
//   } else {
//     let max = Math.max.apply(null, temp)
//     let min = Math.min.apply(null, temp)
//     if (max - min < 5) {
//       return true
//     } else {
//       return false
//     }
//   }
// };

// const poker = (arr) => {
//   let arr1 = arr.filter(i => i);
//   return new Set(arr1).size !== arr1.length ? false : 
//   !(Math.max(...arr1) - Math.min(...arr1) > 4);
// }

const poker = (nums) => {
  let joker = 0;
  nums.sort((a,b) => a-b)
  for (let i = 0; i < 4; i++) {
    if (nums[i] == 0) joker++;
    else if (nums[i] === nums[i+1]) return false;  
  }
  return nums[4] - nums[joker] < 5
}
const arr = [10,11,0,12,6]
console.log(poker(arr))
```
## 查找子字符串
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let arr = [],count = 0;
  const temp = Array.from(s)
  for (let i = 0; i < temp.length; i++) {
    if (arr.includes(temp[i])) {
      arr = arr.slice(arr.indexOf(temp[i])+1, arr.length)
    }
    arr.push(temp[i])
    if (arr.length > count) {
      count = arr.length
    }
  }
  return count;
};
let str = "dbdf"
console.log(lengthOfLongestSubstring(str))
```

## 机器人运动范围
```js
// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
  // 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
  // 也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，
  // 机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，
  // 因为3+5+3+8=19。请问该机器人能够到达多少个格子？
  /**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
  let max = 1;
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (getTotal(i) + getTotal(j) <= k) {
        if (i * j > max) {
          max = i*j
        }
      }
    }
  }
  return max;
};
function getTotal(num) {
  return num >= 10 ? Array.from(m.toString()).reduce((pre, cur)=> pre + cur) : num;
}

console.log( movingCount(2,3,1) )
```

## 把数组排成最小的数
```js
// 剑指 Offer 45. 把数组排成最小的数
  // 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
  /**
  * @param {number[]} nums
  * @return {string}
  */
  // var minNumber = function(nums) {
  //   let tmp = String(nums[0]),
  //   arr = [tmp],
  //   l = nums.length,
  //   prev,
  //   p;

  //   for (let i = 1; i < l; i++ ) {
  //     tmp = String(nums[i]);
  //     arr.push(tmp);
  //     p = i;
  //     while ( p > 0 ) {
  //       prev = arr[p - 1];
  //       if (Number(tmp + prev) < Number(prev + tmp)) {
  //         arr[p] = arr[p - 1];
  //         p--;
  //       } else {
  //         break;
  //       }
  //     }
  //     if ( p !== i ) {
  //       arr[p] = tmp;
  //     }
  //     continue;
  //   }

  //   return arr.join('');
  // }
  // var minNumber = function(nums) {
  //   nums.sort((a, b) => a + '' + b > b + '' + a ? 1 : -1 )
  //   return nums.join('')
  // }
  // var minNumber = function(nums) {
  //   // 如果a+b>b+a  说明a>b
  //   nums.sort((a, b) => { 
  //     return (a + "" + b > b + "" + a) ? 1 : -1
  //   })
  //   let str = ""
  //   nums.forEach(element => {
  //     str += element
  //   });
  //   return str
  // };
  // const recursion = (nums, result, map = new Map()) => {
  //   if (map.size === nums.length) {
  //     result.push([...map.values()].join(''))
  //     return
  //   }
    
  //   for (let i = 0; i < nums.length; i++) {
  //     if (map.get(nums[i])) {
  //       continue
  //     }
  //     map.set(nums[i], nums[i])
  //     recursion(nums, result, map)
  //     map.delete(nums[i])
  //   }
  // }
  const recursion = (nums, total, step, result) => {
    if (step === nums.length) {
      result.push(total)
      return
    }
    
    for (let i = 0; i < nums.length; i++) {
      recursion(nums, total + '' + nums[i],  step + 1, result)
    }
  }
  const minNumber = (nums) => {
    let result = []
    recursion(nums, '', 0, result)
    // result.sort((a, b) => {
    //   if (a < b) return -1;
    //   if (a > b) return 1;
    //   return 0;
    // })
    return result
  };

  const arr = [1, 2, 3]
  console.log(minNumber(arr))
```

## 用两个栈实现队列
```js
// 剑指 Offer 09. 用两个栈实现队列
  // 完成队列的push和pop操作，队列中的元素为int
  // 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
  // 分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
  //栈式后进先出，队列是先进先出
  var CQueue = function() {
    this.stackA = []; //入队栈
    this.stackB = []; //出队栈
  };

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.push = function(value) {
  this.stackA.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.pop = function() {
  if (this.stackB.length > 0) {
    return this.stackB.pop()
  } else {
    while (this.stackA.length > 0) {
      this.stackB.push( this.stackA.pop() );
    }
    if (this.stackB.length === 0) {
      return -1;
    }
    return this.stackB.pop();
  }
};

var obj = new CQueue()
obj.push('2')
obj.push('3')
var param_2 = obj.pop()
console.log(obj, param_2)

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
## 反转链表
```js
// 剑指 Offer II 024. 反转链表
  // 输入一个链表，反转链表后，输出新链表的表头
  /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let cur = head, prev = null
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
};

const arr = [1,2,3,4,5]

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
node1.next = node2
node2.next = node3
// console.log(node1)
console.log(reverseList(node1))
```

## 链表中倒数第k个节点
```js
// 剑指 Offer 22. 链表中倒数第k个节点
//   输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，
// 即链表的尾节点是倒数第1个节点。
// 例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。
// 这个链表的倒数第 3 个节点是值为 4 的节点。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
//  var reverseList = function(head) {
//   let cur = head, prev = null
//   while (cur) {
//     const next = cur.next
//     cur.next = prev
//     prev = cur
//     cur = next
//   }
//   return prev
// };
// var getKthFromEnd = function(head, k) {
//   head = reverseList(head)
//   let step = 1;
//   while (step !== k) {
//     head = head.next
//     step++
//   }
//   return head
// };

// var getKthFromEnd = function(head, k) {
//   let length = 0, p = head
//   while (p) {
//     p = p.next;
//     length++
//   }

//   p = head
//   for (let i = 0; i < length - k; i++) {
//     p = p.next
//   }
//   return p
// };

var getKthFromEnd = function(head, k) {
  let left = head, right = head
  for (let i = 0; i < k; i++) { //右指针向右移动k位，再同时移动直到右指针到头，则左指针在倒数第k个位置
    right = right.next
  }

  while (right) {
    left = left.next
    right = right.next
  }
  return left
}



function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
const node4 = new ListNode(4)
const node5 = new ListNode(5)
const node6 = new ListNode(6)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6

console.log(getKthFromEnd(node1, 3))
```

## 俩个链表的公共节点
```js
/**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */

  /**
  * @param {ListNode} headA
  * @param {ListNode} headB
  * @return {ListNode}
  */
  var getIntersectionNode = function(headA, headB) {
      if (headA == null || headB == null) {
        return null;
      }
      let p1 = headA, p2 = headB;
      while (p1 !== p2) {
        p1 = p1 === null ? headB : p1.next;
        p2 = p2 === null ? headA : p2.next;
      }
      return p1;
  };

  function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }

  const node1 = new ListNode(1)
  const node2 = new ListNode(2)
  const node3 = new ListNode(3)
  const node4 = new ListNode(4)
  const node5 = new ListNode(5)
  const node6 = new ListNode(6)
  node1.next = node2
  node2.next = node3
  node3.next = node4
  node4.next = node5
  node5.next = node6
```

## 复制复杂链表
```js
/**
   * // Definition for a Node.
   * function Node(val, next, random) {
   *    this.val = val;
   *    this.next = next;
   *    this.random = random;
   * };
   */

  /**
   * @param {Node} head
   * @return {Node}
   */
  //  请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。
  // var copyRandomList = function(head, cachedNode = new Map()) {
  //   if (head === null) {
  //       return null;
  //   }
  //   if (!cachedNode.has(head)) {
  //       cachedNode.set( head, {val: head.val} );
  //       Object.assign(
  //         cachedNode.get(head),
  //         {
  //           next: copyRandomList(head.next, cachedNode),
  //           random: copyRandomList(head.random, cachedNode)
  //         }
  //       )
  //   }
  //   return cachedNode.get(head);
  // };
  // var copyRandomList = function(head) {
  //   if (head === null) {
  //     return null;
  //   }
  //   for (let node = head; node != null; node = node.next.next){
  //     const nodeNew = new ListNode(node.val, node.next, null);
  //     node.next = nodeNew
  //   }
  //   for (let node = head; node != null; node = node.next.next) {
  //     const nodeNew = node.next;
  //     nodeNew.random = nodeNew.random !== null ? node.random.next : null;
  //   }
  //   const headNew = head.next;
  //   for (let node = head; node !== null; node = node.next) {
  //     const nodeNew = node.next;
  //     node.next = node.next.next;
  //     nodeNew.next = nodeNew.next !== null ? nodeNew.next.next : null
  //   }
  //   return headNew;
  // }
  var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }
    for (let node = head; node !== null; node = node.next.next) {
        const nodeNew = new ListNode(node.val, node.next, null);
        node.next = nodeNew;
    }
    // for (let node = head; node !== null; node = node.next.next) {
    //     const nodeNew = node.next;
    //     nodeNew.random = (node.random !== null) ? node.random.next : null;
    // }
    // const headNew = head.next;
    for (let node = head; node !== null; node = node.next) {
        const nodeNew = node.next;
        node.next = node.next.next;
        // nodeNew.random = node
        nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
    }
    // return headNew;
  };

  function ListNode(val, next, random) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
    this.random = (random===undefined ? null : random)
  }

  const node1 = new ListNode(7)
  const node2 = new ListNode(13)
  const node3 = new ListNode(11)
  const node4 = new ListNode(10)
  const node5 = new ListNode(1)
  // const node6 = new ListNode(6)
  node1.next = node2
  node2.next = node3
  node3.next = node4
  node4.next = node5
  
  node1.random = null
  node2.random = node1
  node3.random = node5
  node4.random = node3
  node5.random = node1

  console.log( copyRandomList(node1) )
```

## 合并俩个排序链表
```js
// 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
  /**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */
  /**
  * @param {ListNode} l1
  * @param {ListNode} l2
  * @return {ListNode}
  */
  var mergeTwoLists = function(l1, l2) {
    let cur = new ListNode()
    let dum = cur
    while (l1 || l2) {
      if (!l1) {
        cur.next = l2;
        return dum.next
      }
      if (!l2) {
        cur.next = l1;
        return dum.next
      }
      if (l1.val < l2.val) {
        cur.next = l1;
        l1 = l1.next;
      } else {
        cur.next = l2
        l2 = l2.next;
      }
      cur = cur.next;
    }
    return dum.next
  }
  // var mergeTwoLists = function(l1, l2) {
  //   if (l1 === null) return l2;
  //   if (l2 === null) return l1;
  //   if (l1.val < l2.val) {
  //     l1.next = mergeTwoLists(l1.next, l2);
  //     return l1;
  //   } else {
  //     l2.next = mergeTwoLists(l1, l2.next);
  //     return l2;
  //   }
  // };
  // var mergeTwoLists = function(l1, l2) {
  //   let current = new ListNode();
  //   const dummy = current;

  //   while (l1 || l2) {
  //     if (!l1) {
  //       current.next = l2;
  //       return dummy.next;
  //     } else if (!l2) {
  //       current.next = l1;
  //       return dummy.next;
  //     }

  //     if (l1.val <= l2.val) {
  //       current.next = l1;
  //       l1 = l1.next;
  //     } else {
  //       current.next = l2;
  //       l2 = l2.next;
  //     }

  //     current = current.next;
  //   }

  //   return dummy.next;
  // };
  // var mergeTwoLists = function(l1, l2) {
  //   let p1 = l1, p = null, len = 0;
  //   while (p1) {
  //     if (p1.next) {
  //       p1 = p1.next
  //       continue
  //     }
  //     l1.next = l2
  //     break;
  //   }
  //   p1 = l1
  //   while (p1) {
  //     p1 = p1.next
  //     len++;
  //   }
  //   console.log(len, l1)
  //   // let low = 0, fast = len;
  //   // while (condition) {
      
  //   // }
  // };

  function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }

  const node1 = new ListNode(1)
  const node2 = new ListNode(2)
  const node3 = new ListNode(4)
  node1.next = node2
  node2.next = node3

  const node4 = new ListNode(1)
  const node5 = new ListNode(3)
  const node6 = new ListNode(4)
  node4.next = node5
  node5.next = node6

  console.log( mergeTwoLists(node1, node4) )
```

## 链表中环的入口节点
```js
/* 给定一个链表，返回链表开始入环的第一个节点。
  从链表的头节点开始沿着 next 指针进入环的第一个节点为环的入口节点。
  如果链表无环，则返回 null。
  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
  如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
  说明：不允许修改给定的链表。 */
  /**
  * Definition for singly-linked list.
  * function ListNode(val) {
  *     this.val = val;
  *     this.next = null;
  * }
  */

  /**
  * @param {ListNode} head
  * @return {ListNode}
  */
    // var detectCycle = function(head) {
    //   let map = new Map(), p = head;
    //   while (p) {
    //     map.set(p);
    //     if (map.has(p.next)) {
    //       return p.next;
    //     }
    //     p = p.next;
    //   }
    //   return null;
    // };

    var detectCycle = function(head) {
        let low = head, fast = head;
        while (true) {
        if (fast === null || fast.next === null) return null;
        fast = fast.next.next;
        low = low.next;
        if (fast === low) break;
        }
        fast = head;
        while (fast !== low) {
        low = low.next;
        fast = fast.next;
        }
        return fast;
    }
```

## 和为s的俩个数字
```js
// 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。
  // 如果有多对数字的和等于s，则输出任意一对即可。
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number[]}
   */
  var twoSum = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while (start < end) {
      let s = nums[start] + nums[end]
      if (s > target) end--;
      else if (s < target) start++;
      else return [nums[start], nums[end]]
    }
    return []
  }
  //暴力法  时间O(n^2)  空间O(1)
  // var twoSum = function(nums, target) {
  //   let result = []
  //   for (let i = 0; i < nums.length; i++) {
  //     for (let j = i + 1; j < nums.length; j++) {
  //       if (nums[i] + nums[j] === target) {
  //         [].push.call(result, nums[i], nums[j])
  //         return result;
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  //   return result
  // };
  //双指针  时间复杂度O(n) 空间复杂度 O(1)
  // var twoSum = function(nums, target) {
  //   let i = 0, j = nums.length - 1;
  //   while(i < j) {
  //       let s = nums[i] + nums[j];
  //       if(s < target) i++;
  //       else if(s > target) j--;
  //       else return [nums[i], nums[j]];
  //   }
  //   return [];
  // }
  // let arr = [2,7,11,15]
  let arr = [10,26,30,31,47,60]
  console.log( twoSum(arr, 40) )
```

## 调整数组顺序使奇数位于偶数前面
```js
// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
  // 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
  /**
   * @param {number[]} nums
   * @return {number[]}
   */
  // var exchange = function(nums) {
  //   let start = 0, end = nums.length - 1;
  //   while (start < end) {
  //     if (nums[start] % 2 === 0) {
  //       let temp = nums[start]
  //       nums[start] = nums[end]
  //       nums[end] = temp
  //       end--
  //     } else {
  //       start++
  //     }
  //   }
  //   return nums
  // };
  var exchange = function(nums) {
    let fast = 0, low = 0;
    while (fast < nums.length) {
      if (nums[fast] & 1) { //为0是偶数，1代表奇数
        let temp = nums[fast];
        nums[fast] = nums[low];
        nums[low] = temp;
        low++;
      }
      fast++;
    }
    return nums;
  }
  const arr = [1,2,3,4];
  console.log(exchange(arr))
  console.log(2 & 1)
```

## 回溯法
```js
//和为s的连续正整数序列
//    输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
//    序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
  /**
  * @param {number} target
  * @return {number[][]}
  */
  var findContinuousSequence = function(target) {
    let ans = [];
    let result = [];
    function trackback(start, sum) {
      if (sum === target && result.length >= 2) {
        ans.push([...result].sort());
        return;
      } else if (sum > target){
        return;
      }
      for (let i = start; i < target - sum + 1; i++) {
        result.push(i);
        trackback(start + 1 , sum + i);
        result.pop();
      }
    }
    trackback(1, 0)
    return ans;
  };
  console.log(findContinuousSequence(9))
```

## 双指针
```js
//回文数
/* 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
  回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。 */
  /**
  * @param {number} x
  * @return {boolean}
  */
  var isPalindrome = function(x) {
    x = x.toString();
    let left = 0,right = x.length-1;
    while (left < right) {
      if (x[left] === x[right]) {
        left++;
        right--;
      } else {
        return false
      }
    }
    return true
  };

  console.log(isPalindrome(-121))
```
## 高度检查器
```js
/**
  * @param {number[]} heights
  * @return {number}
  */
  var heightChecker = function(heights) {
    let temp = [...heights];
    temp.sort((a,b) => a-b);
    let count = 0;
    for (let i = 0; i < heights.length; i++) {
      if (temp[i] !== heights[i]) {
        count++
      }
    }
    return count;
  };

  var heightChecker = function(heights) {
    // int[] arr = new int[101];
    //     for (int height : heights) {
    //         arr[height]++;
    //     }
    //     int count = 0;
    //     for (int i = 1, j = 0; i < arr.length; i++) {
    //         while (arr[i]-- > 0) {
    //             if (heights[j++] != i) count++;
    //         }
    //     }
    //     return count;
  }

  console.log(heightChecker([1,1,4,2,1,3]))
```

## 同构字符串
```js
/* 给定两个字符串 s 和 t，判断它们是否是同构的。
如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，
相同字符只能映射到同一个字符上，字符可以映射到自己本身。 */
  /**
  * @param {string} s
  * @param {string} t
  * @return {boolean}
  */
  var isIsomorphic = function(s, t) {
    if (s.length !== t.length) {
      return false
    }
    const map1 = new Map();
    const map2 = new Map();
    for (let i = 0; i < s.length; i++) {
      if (!map1.has(s[i])) {
        map1.set(s[i], t[i])
      }
      if (!map2.has(t[i])) {
        map2.set(t[i], s[i])
      }
      if (map1.get(s[i]) !== t[i] || map2.get(t[i]) !== s[i]) {
        return false
      }
    }
    return true
  };
```

## 删除重复元素
```js
/* 给定一个排序数组，你需要在原地删除重复元素，返回移除后数组的新长度。
  不许使用额外的数组空间，并使用O(1)的空间复杂度 */
  var noRepeat = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == arr[i+1]) {
        arr.splice(i, 1);
        i--;
      }
    }
    return arr.length;
  }

  var removeDuplicates = function(nums) {
    if (nums == null || nums.length == 0) return 0
    if (nums.length == 1) return 1
    var count = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[count] !== nums[i]) {
        count++;
        nums[count] = nums[i];
      }
    }
    return ++count;
  }
  const arr = [1,1,1,2,2,4,5,5,5,6];
  console.log(removeDuplicates(arr), arr)
```
