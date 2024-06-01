import React from 'react'
import { currentUser } from "@clerk/nextjs/server";

const Welcome = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-15 w-full blur-bg">
      <h1 className="font-bold mt-6 text-xl mb-6 top-10">
        Welcome, <span className="font-extralight">{user?.firstName||"there"}🏢</span>
      </h1>
    </div>
  );
}

export default Welcome