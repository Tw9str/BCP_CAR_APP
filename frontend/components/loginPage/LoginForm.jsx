import { useState } from 'react';
import { setLogin } from '@/state';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email');
      return;
    }
    if (!password) {
      setMessage('Please enter your password');
      return;
    }

    const user = {
      email,
      password
    };

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage(data.message);
          dispatch(setLogin({
            user: data.user,
            token: data.token,
          }))
          router.push("/");
        } else {
          setMessage(data.message);
        }})
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
      <div className="login">
        <form onSubmit={handleFormSubmit}>
          <input type="email" aria-label="Email" name="email" value={email} placeholder="E-mailadres" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" aria-label="Wachtwoord" name="password" value={password} placeholder="Wachtwoord" onChange={(e) => setPassword(e.target.value)} />
          {message && <p className='validation'>{message}</p>}
          <button type="submit">Inloggen</button>
          <p>Nog geen account? <Link href="/auth/register">Registeren</Link></p>
        </form>
      </div>
  );
}

export default LoginForm;
