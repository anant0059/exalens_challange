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

