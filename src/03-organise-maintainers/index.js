import {apiGetter} from '../api'


// Helper function that takes an array of objects and sorts username key 
// alphabetically then items inside list at packageNames key. Returns sorted array.
function makeAlphabetical(arr) {
  let sortedUsername = arr.sort((a, b) => 
    a.username.toLowerCase().localeCompare(b.username.toLowerCase())
  )
  for (let item of sortedUsername) {
    item.packageNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) 
  }
  return sortedUsername
}

// Helper function that takes an array of objects and identifies maintainers
// of each package. Add mainainer's username with name of package if maintainer 
// is not in the 'mapped' list. If username exists, add name of package to package array.
function outer(arr) {
  let mapped = []
  for (let item of arr) {
    let pkg = item.package.name
    for (let mtainer of item.package.maintainers) {
      let username = mtainer.username
      let known = mapped.findIndex(c => c.username == username);
      if (known == -1) {
        mapped.push({username, packageNames: [pkg]});
      } else {
        mapped[known].packageNames.push(pkg)
      }
    }
  }
  return makeAlphabetical(mapped)
}

module.exports = async function organiseMaintainers() {
  try { 
    const res = await apiGetter()
    return outer(res.data.content)
  } catch (err) {
    console.log(err);
  }
};