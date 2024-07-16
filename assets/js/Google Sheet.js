const scriptURL = 'https://script.google.com/macros/s/AKfycbxlD7SvKb5sqxXQ9v49G4CW2XOA-C00O6h6cT-Fuoc4hSyu3xcYlWJSBnStPBflCg1Jlw/exec';
const form = document.forms['contact-form'];
const submitButton = form.querySelector('button[type="submit"]');
const statusMessage = document.getElementById('status-message'); // Assuming you have an element to show status

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);

  submitButton.disabled = true; // Disable the submit button to prevent multiple submissions

  fetch(scriptURL, { 
    method: 'POST', 
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.result === 'success') {
      statusMessage.textContent = "Thank you! Your form is submitted successfully.";
      statusMessage.classList.add('success-message'); // Optionally, apply a success message style
      form.reset(); // Clear the form fields if needed
    } else {
      throw new Error(`Error: ${data.error}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    statusMessage.textContent = 'There was a problem submitting your form. Please try again later.';
    statusMessage.classList.add('error-message'); // Optionally, apply an error message style
  })
  .finally(() => {
    submitButton.disabled = false; // Enable the submit button after submission attempt
  });
});
