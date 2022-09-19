const blogList = document.getElementById("blog-list")
const btnSubmit = document.getElementById("btn-submit")
const newPostForm = document.getElementById("new-post")

let postsArray = []

function renderPosts(posts) {
  let postsHtml = ""
  for (let post of posts) {
    postsHtml += `<div class="post-div"><h3>${post.title}</h3><p>${post.body}</p></div><hr>`
  }
  postsHtml = postsHtml.substring(0, postsHtml.length - 4) // trim final hr!
  blogList.innerHTML = postsHtml
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json()) // turn json into js array of obejects
  .then((data) => {
    postsArray = data.slice(0, 9) // display only posts [0] - [4]

    renderPosts(postsArray)
  })

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const postTitle = document.getElementById("post-title").value
  const postBody = document.getElementById("post-body").value
  const data = {
    title: postTitle,
    body: postBody,
  }

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      newPostForm.reset()
      postsArray.unshift(post)
      renderPosts(postsArray)
    })
})
