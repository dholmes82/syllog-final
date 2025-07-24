'use client'
import Script from 'next/script'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { CredentialResponse } from 'google-one-tap'
import Link from 'next/link'

// This declare block tells TypeScript that 'google' will exist on the window
declare global {
  interface Window {
    handleSignInWithGoogle: (response: CredentialResponse) => void;
  }
}

// This function needs to be available in the global scope
// so we attach it to the window object
if (typeof window !== 'undefined') {
    window.handleSignInWithGoogle = async function(response: CredentialResponse) {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        })

        if (!error) {
            window.location.href = '/'
        } else {
            console.error("Error signing in with Google:", error)
        }
    }
}

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" > <polyline points="15 18 9 12 15 6" /> </svg> Back
        </Link>
      
      <Script src="https://accounts.google.com/gsi/client" async />

      <div className="w-full max-w-sm mx-auto text-center text-white">
        <h2 className="mb-4 text-2xl">Sign In</h2>
        <p className="mb-6">Please sign in to continue.</p>

        <div
          id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
          data-auto_select="true"
          data-itp_support="true"
        ></div>
        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </div>
    </div>
  )
}