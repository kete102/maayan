import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          type="video/mp4"
          src="https://res.cloudinary.com/dqkxothoe/video/upload/v1781536540/hero-video_1_ari1cw.mp4 "
        />
      </video>
      <div className="absolute inset-0 bg-linear-to-r from-primary/75 via-primary/45 to-primary/20" />
      <div className="relative flex flex-col gap-6 mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
        <div className="max-w-2xl text-primary-foreground">
          <h1 className="text-2xl md:text-5xl tracking-widest uppercase mb-4 text-primary-foreground">
            Escrituras que fluyen
          </h1>
          <p className="text-pretty font-bold md:text-xl text-primary-foreground/80">
            Biblias artesanales creadas para honrar la belleza de Dios
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button variant="solid" size="hero">
            Conócenos
          </Button>
          <Button variant="glass" size="hero">
            Nuestras Biblias
          </Button>
        </div>
      </div>
    </section>
  );
}
