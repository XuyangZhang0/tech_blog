const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();

  const content = document.querySelector('#blog-content').value.trim();


  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    await fetch(`/api/blogs/${id}`, {
      method: 'GET',
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      document.querySelector('#blog-title').value = data.title;
      document.querySelector('#blog-content').value = data.content;
      document.getElementById('confirm-update').style.display = "inline-block";
      document.getElementById('create-blog').style.display = "none";
      document.getElementById('confirm-update').setAttribute('data-id', id);
    })





  }
};

const confirmUpdateFormHandler = async (event) => {
  event.preventDefault();
  console.log("running PUT update");
  const title = document.querySelector('#blog-title').value.trim();


  const content = document.querySelector('#blog-content').value.trim();
  const id= document.getElementById('confirm-update').getAttribute('data-id');

  if (title && content) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};

document
  .getElementById('create-blog')
  .addEventListener('click', newFormHandler);

// document
//   .querySelector('.blog-list')
//   .addEventListener('click', delButtonHandler);
document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.btn-warning')
  .addEventListener('click', updateButtonHandler);

document
  .getElementById('confirm-update')
  .addEventListener('click', confirmUpdateFormHandler);
