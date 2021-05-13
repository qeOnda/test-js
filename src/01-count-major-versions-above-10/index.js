import {apiGetter} from '../api'


module.exports = async function countMajorVersionsAbove10() {
  try { 
    const res = await apiGetter();
    
    // Create new array from all items in content array which pass the test of
    // having package.version greater than 10. Return array length.
    return res.data.content.filter(p => parseFloat(p.package.version) > 10).length;
  } catch (err) {
    console.log(err);
  }
};
