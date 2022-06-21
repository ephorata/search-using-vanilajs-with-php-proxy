const url = "http://127.0.0.1:8000/"
const body = document.querySelector("body")
const results = document.getElementById("results")
const loader = document.getElementById("loader")

// initial load
window.onload = function () {
  displayResults([{ name: "Type any key to search" }])
}

document.getElementById("search-input").addEventListener("keyup", async e => {
  // making http request on each stroke is inefficent
clearPreviousSearch()
  try {
    const response = await fetch(url, { mode: "cors" })
    if (response.status === 200) {
      const comments = await response.json()
      // perform filter

      const resultsArray =
        (e.target.value !== "" &&
        searchByName(e.target.value, comments).length !== 0)
          ? searchByName(e.target.value, comments)
          : [{ name: "No items found  ,please type any key to search" }] // prevents from displaying the whole list if the search string is empty

      displayResults(resultsArray)
    } else {
      throw new Error("something went wrong")
    }
  } catch (error) {
    displayResults([{ name: "Something went wrong please try again" }])
    setTimeout(() => {
      clearPreviousSearch()
    }, 1000)
    console.log(error)
  }
})

// helper functions to make the code a bit cleaner

const searchByName = (searchString, comments) => {
  return comments.filter(comment => comment.name.search(searchString) !== -1)
}

const displayResults = comments => {
  comments.map(post => {
    const list = document.createElement("li")
    list.innerText = post.name
    results.append(list)
  })
}

const clearPreviousSearch = () => {
  while (results.lastChild) {
    results.removeChild(results.lastChild)
  }
}

// function createLoader(node){
//   const loader = document.createElement('div')

//   loader.className = 'loader'
//   loader.id = 'loader'
//   loader.textContent = "loading .."

//   node.append(loader)
// }
