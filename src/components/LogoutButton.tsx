'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button className="btn btn-outline-light" onClick={() => signOut()}>
      Logout
    </button>
  );
}
