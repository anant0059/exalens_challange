# exalens_challange

# code:

    function apartmentHunting(blocks, reqs) {
        // Write your code here.
        let min_distances_for_reqs = reqs.map((req) => find_min_distance(blocks, req))
        let max_distance_from_blocks = find_max_distance_from_blocks(min_distances_for_reqs, blocks.length)
        let index = find_index(max_distance_from_blocks)
        return index
    }
  
    function find_min_distance(blocks, req){
          let min_distance = blocks.map((el) => Infinity)
          let closest = Infinity
          for( let i=0;i<blocks.length;i++){
              if(blocks[i][req]) closest=i;
              min_distance[i]=Math.abs(closest-i)
          }

          for(let i=blocks.length-2;i>=0;i--){
              if(blocks[i][req]) closest=i;
              min_distance[i]=Math.abs(closest-i)
              min_distance[i] = Math.min(min_distance[i], Math.abs(closest-i))
          }
          return min_distance
    }
  
    function find_max_distance_from_blocks(min_distances_for_reqs, blocks_length){
          let max_distance = []
          for(let i=0;i<blocks_length;i++){
              let mx_dis = -Infinity
              for(let j=0;j<min_distances_for_reqs.length;j++){
                  mx_dis = Math.max(mx_dis, min_distances_for_reqs[j][i])
              }
              max_distance[i] = mx_dis
          }
          return max_distance
    }
  
    function find_index(max_distance_from_blocks){
          let index=0,min_dis = Infinity
          for(let i=0;i<max_distance_from_blocks.length;i++){
              if(min_dis>max_distance_from_blocks[i]){
                  index=i
                  min_dis=max_distance_from_blocks[i]
              }
          }
          return index
     }

    // Do not edit the line below.
    exports.apartmentHunting = apartmentHunting;



# Explanation:
We have to find the index of the blocks so that the distances for all requirements will be minimum.
For this I have divided the problem into three small parts:
1. For all the requirements, find the minimum distance from each block so that particular requirement is located.
2. Find the maximum distances from each block so that all the requirements is present in that range
3. Find the index of the minimum distance that we find in the step2.

For these sub-problems, I have form three functions to find the requirements of each step:
1. find_min_distance(blocks, req) -> for each requirement we define an array(min_distance) of length blocks.length and initialize all the elements with infinity. 
After that, I traverse through the min_distance array from index 0 to last-1, and if the requirement is present then update the closest to that index, and update the min_min_distance for each index.
After that, traverse the min_distance array from index last-2 to 0 , and if the requirement is present then update the closest to that index, and update the min_min_distance for each index.

Stored the all minimum distances as a form of nested array in min_distances_for_reqs.

For Input:
blocks = [
{
    "gym": false,
    "school": true,
    "store": false,
},
{
    "gym": true,
    "school": false,
    "store": false,
},
{
    "gym": true,
    "school": true,
    "store": false,
},
{
    "gym": false,
    "school": true,
    "store": false,
},
{
"gym": false,
"school": true,
"store": true,
}
]
reqs = ["gym", "school", "store"]


Min_distances_for_reqs = [ [ 1, 0, 0, 1, 2 ], [ 0, 1, 0, 0, 0 ], [ 4, 3, 2, 1, 0 ] ]

2. find_max_distance_from_blocks(min_distances_for_reqs, blocks_length) -> In this function, I am finding the minimum distance from each block such that all requirements are present in that range of distance.
For this, for each block I am traversing through the min_distances_for_reqs nested array in such a way that we go through each requirement at what distance it is present and at last we take away the maximum of them and store in the max_distance for that particular block.

For the example input of step 1:

Max_distance = [ 4, 3, 2, 1, 2 ]

3. find_index(max_distance_from_blocks) -> In this function, I am finding the index so that it will be the minimum element of Max_distance. For this, I am traversing through the Max_distance array and if min_dis is greater than element in Max_distance  then update the index to that index.
And after traversing through each index in Max_distance , the index will be the final block that we are finding

For the example input of step 1:

Index = 3
 As  1 is minimum in Max_distance and located at index 3
