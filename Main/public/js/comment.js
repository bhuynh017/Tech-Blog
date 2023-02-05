// creating an event handler that submits a comment on a post. 
const commentFormHandler = async function (event) {
  event.preventDefault();

  // gets the post ID and comment body from form inputs
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // sending a post request
  if (body) {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        postId,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);
