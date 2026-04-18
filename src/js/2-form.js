let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const styles = `
body {
background-color: #f5f5f5;
margin: 0;
display: flex;
justify-content: center;
align-items: center;
}

  .feedback-form {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px; /* Відступ між Email та Message */
    width: 408px;
    padding: 24px;
    margin-top: 24px;
    border-radius: 8px;
    background-color: #fff;
  }

  .feedback-form label {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5; /* 150% */
    letter-spacing: 0.04em;
    color: #2e2f42;
  }

  .feedback-form input, 
  .feedback-form textarea {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #8e8f99;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    font-family: inherit; /* Щоб шрифт всередині збігався з формою */
    transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .feedback-form input:hover, 
  .feedback-form textarea:hover {
    border-color: #000;
  }

  .feedback-form input:focus, 
  .feedback-form textarea:focus {
    border-color: #4d5ae5;
  }

  .feedback-form button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    margin-top: 8px;
    
    background-color: #4d5ae5;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    font-family: var(--font-family, sans-serif);
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.04em;
    
    transition: background-color 250ms ease;
  }

  .feedback-form button:hover {
    background-color: #404bbf;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (err) {
    console.error('Storage parse error', err);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    return alert('Fill please all fields');
  }

  console.log('Submitted Data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
