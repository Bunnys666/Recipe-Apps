import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="absolute left-1/2 right-1/2 top-1/2 -translate-x-52 -translate-y-52">
      <SignIn />
    </div>
  );
}
