import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './success.css';
export default function Success() {
  const { loginWithRedirect } = useAuth0();

  const hasRedirected = useRef(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;

      // Scroll to the Success component
      successRef.current?.scrollIntoView({ behavior: "smooth" });

      // Delay redirect so user sees the success message
      setTimeout(() => {
        loginWithRedirect({
          appState: { returnTo: "/success" }
        });
      }, 10000);
    }
  }, [loginWithRedirect]);

  return (
    <div ref={successRef} style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Thanks for your order!</h1>
      <p>Your order has been received.</p>

      {/* Spinner */}
      <div className="spinner"></div>

      <p>Redirecting…</p>
    </div>
  );
}