import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <Link 
        href="/techniques"
        className="text-lg bg-blue-500 hover:bg-blue-600 text-white"
      >
        View Techniques
      </Link>
      
    </div>
  );
}
