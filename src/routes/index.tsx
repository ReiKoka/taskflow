import { createFileRoute } from "@tanstack/react-router";
import Img1 from "../assets/images/img-1.svg?react";
import Img2 from "../assets/images/img-2.svg?react";
import Img3 from "../assets/images/img-3.svg?react";
import Img4 from "../assets/images/img-4.svg?react";
import HeroImage from "../components/landing/HeroImage";
import HeroMain from "../components/landing/HeroMain";
import { useMediaQuery } from "usehooks-ts";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicLayout from "../components/PublicLayout";
import AppLayout from "../components/AppLayout";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const { token } = context;
  const matches = useMediaQuery("(min-width: 1024px)");

  return !token ? (
    <PublicLayout>
      <div className="pattern-bg font-secondary relative z-10 flex h-full max-h-full max-w-full items-center justify-center rounded-t-4xl p-4 lg:p-6">
        {matches && (
          <>
            <HeroImage className="top-12 left-6 -rotate-12" Img={Img1} />
            <HeroImage className="bottom-20 left-10 -rotate-3" Img={Img2} />
            <HeroImage className="top-12 right-6 rotate-6" Img={Img3} />
            <HeroImage className="right-12 bottom-12 -rotate-12" Img={Img4} />
          </>
        )}
        <HeroMain />
      </div>
    </PublicLayout>
  ) : (
    <AppLayout>
      <div>Authenticated</div>
    </AppLayout>
  );
}
