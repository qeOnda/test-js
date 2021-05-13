import {apiGetter} from '../api'
 
module.exports = async function oldestPackageName() {
  try { 
    const res = await apiGetter();
    
    // For every item in the content array, convert 'date' string to Date object, 
    // then compare the current value to acucmulator and check which is older. Return oldest.
    let oldestPackage = res.data.content.reduce((a,b) => {
      return new Date(a.package.date) > new Date(b.package.date) ? b : a;
    })
    return oldestPackage.package.name
  } catch (err) {
    console.log(err);
  }
};
