import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      
      data.success ? router.push("/auth/login") : setMessage(data.message);

    } catch (err) {
      console.error('Error registering user:', err);
    }
  };

  return (
      <div className="register">
        <form onSubmit={handleFormSubmit}>
          <input type="text" aria-label="Name" id="name" name="name" value={name} placeholder="Naam" onChange={e => setName(e.target.value)} />
          <input type="email" aria-label="Email" name="email" value={email} placeholder="E-mailadres" onChange={e => setEmail(e.target.value)} />
          <input type="password" aria-label="Wachtwoord" name="password" value={password} placeholder="Wachtwoord" onChange={e => setPassword(e.target.value)} />
          {message && <p className='validation'>{message}</p>}
          <button type="submit">Registeren</button>
          <p>Heb je al een account? <Link href="/auth/login">Inloggen</Link></p>
        </form>
      </div>
  );
}

export default RegisterForm;
