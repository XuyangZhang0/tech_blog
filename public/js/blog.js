// post comment
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = window.location.pathname.split('/')[(window.location.pathname.split('/').length-1)]
    console.log(blog_id);

  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blog_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/blogs/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('Failed to delete blog');
//       }
//     }
//   };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.blog-list')
//     .addEventListener('click', delButtonHandler);
  