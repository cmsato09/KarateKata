import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      title: "Katas",
      href: "/katas",
    },
    {
      title: "Stances",
      href: "/stances",
    },
    {
      title: "Techniques",
      href: "/techniques",
    },
    {
      title: "Kata Moves",
      href: "/kata-moves",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to the Kata Database
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b pb-2">道場訓</h2>
            <div className="space-y-1 text-muted-foreground">
              <p>一、人格完成に努むること</p>
              <p>一、誠の道を守ること</p>
              <p>一、努力の精神を養うこと</p>
              <p>一、礼儀を重んずること</p>
              <p>一、血気の勇を戒むること</p>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b pb-2">Dojo kun</h2>
            <div className="space-y-1 text-muted-foreground">
              <p>Hitotsu, jinkaku kansei ni tsutomuru koto</p>
              <p>Hitotsu, makoto no michi wo mamoru koto</p>
              <p>Hitotsu, doryoku no seishin wo yashinau koto</p>
              <p>Hitotsu, reigi wo omonzuru koto</p>
              <p>Hitotsu, kekki no yū wo imashimuru koto</p>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold border-b pb-2">Dojo kun</h2>
            <div className="space-y-1 text-muted-foreground">
              <p>Seek perfection of character.</p>
              <p>Be faithful.</p>
              <p>Endeavor.</p>
              <p>Respect others.</p>
              <p>Refrain from violent behavior.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 pt-8">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  View {feature.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
