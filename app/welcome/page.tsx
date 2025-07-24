import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function WelcomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto', color: 'white' }}>
      <h2>Welcome, {user.email}</h2>
      <p>You have successfully logged in and reached the welcome page!</p>
      <Link href="/">Go to Homepage</Link>
    </div>
  );
}