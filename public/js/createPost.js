const createPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="create-post-title"]').value;
  const content = document.querySelector('textarea[name="create-post-content"]').value;
  // var content = text.split(/\s+/);



  if (title  && content) {
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({ title , content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.create-post')
  .addEventListener('submit', createPostFormHandler);
