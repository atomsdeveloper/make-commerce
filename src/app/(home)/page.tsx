// Auth user
import { auth } from "@clerk/nextjs/server";

// Redirect Next
import { redirect } from "next/navigation";

// Components

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
