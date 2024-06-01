"use client";

import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/clerk-react";


const Account = () => {
  return (
    <div className="cursor-pointer">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Account;
