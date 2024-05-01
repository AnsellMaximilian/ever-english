import Header from "@/components/Header";
import Image from "next/image";
import wave from "@/assets/images/wave.svg";
import icon from "@/assets/images/icon.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import { account } from "@/appwrite";
import dashboardSs from "@/assets/images/screenshots/dashboard.png";
import loadingSs from "@/assets/images/screenshots/loading.png";

export default async function Home() {
  return (
    <main className="">
      <Header landing />
      <section>
        <div className="text-center py-24">
          <Image
            src={icon}
            width={200}
            height={200}
            alt="Icon"
            className="w-64 block mx-auto mb-16"
          />
          <h1 className="font-bold text-5xl tracking-tighter mb-2">
            Level Up Your <span className="main-colors-gradient">English</span>
          </h1>
          <p className="font-semibold text-3xl mb-6">
            Let Google&apos;s Gemini AI take your English Skills to the next
            level
          </p>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants(),
              "font-bold text-2xl py-8 px-6 hover:bg-secondPrimary"
            )}
          >
            Get Started
          </Link>
        </div>
        <Image
          src={wave}
          width={100}
          height={25}
          className="w-full"
          alt="wave"
        />
      </section>
      <section className="py-4 bg-secondPrimary text-primary-foreground">
        <div className="mx-auto container max-w-[1024px] text-center">
          <h2 className="text-4xl font-bold text-center">
            Powered by Gemini AI
          </h2>
          <div className="mt-8 space-y-4 text-2xl ">
            <p className="">
              Using Google&apos;s Gemini AI, Ever English dynamically generate
              English quizzes based on your current English level and fun random
              concepts.
            </p>
            <p className="">
              Level up your English by gaining XP through completing quiz
              sessions. Enjoy four unique types of quizzes.
            </p>
          </div>
          <div className="mt-8">
            <Image
              src={dashboardSs}
              width={1024}
              height={800}
              alt="dashboard screenshot"
              className="max-w-full mx-auto w-[800px] rounded-md"
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <svg viewBox="0 0 1440 320" version="1.1" id="svg142" className="">
          <g id="g739">
            <g id="g734">
              <path
                className="fill-primary"
                id="rect713"
                d="M 675.81641 86.310547 C 671.84848 86.177045 667.94434 86.254609 664.02148 86.480469 C 661.96908 86.609663 659.60209 86.812105 657.43555 87.054688 C 656.81607 87.128373 655.7661 87.258455 655.14844 87.328125 C 646.79423 88.414769 638.55187 90.270551 630.48438 92.685547 C 610.4432 98.729739 591.57736 108.15318 573.74805 119.02734 C 555.84072 129.89564 539.11944 142.56501 522.64648 155.4668 C 504.52398 169.575 486.65501 184.06109 467.62109 196.94531 C 452.98228 206.80079 437.66183 215.86386 421.13672 222.19141 C 407.94269 227.25446 393.91581 230.44749 379.74023 230.49219 C 368.99394 230.59041 358.25803 228.75205 348.10938 225.23438 C 333.10317 220.0615 319.46165 211.63736 306.70703 202.3125 C 290.17027 190.10652 274.97694 176.22218 259.78711 162.41211 C 250.53201 153.99296 241.18888 145.47597 231.66602 137.4375 C 224.60362 131.4896 217.37947 125.71429 209.74805 120.50781 C 200.92752 114.52605 191.56295 109.04396 181.24805 106.10742 C 179.93122 105.74744 178.55074 105.41163 177.13086 105.14062 C 167.30254 103.26157 157.11529 104.89245 147.77344 108.20312 C 134.6299 112.93464 122.74664 120.58156 111.80078 129.1582 C 92.348085 144.50123 75.522969 162.85206 59.703125 181.83789 C 39.715553 206.47589 19.873069 231.22927 0 255.95898 L 0 320 L 1440 320 L 1440 95.927734 C 1435.0554 102.07826 1430.1107 108.22842 1425.166 114.37891 C 1406.4668 137.8047 1387.1715 160.8558 1365.6426 181.75781 C 1348.7864 198.06999 1330.6917 213.32301 1310.4258 225.25195 C 1295.6195 234.00483 1279.5094 240.8991 1262.4941 243.85156 C 1247.0837 246.56728 1231.2061 245.66089 1215.9434 242.45898 C 1197.0419 238.4635 1179.0108 231.25456 1161.4258 223.39453 C 1146.2595 216.62572 1131.3895 209.31609 1116.0742 202.89258 C 1103.8244 197.81377 1091.2846 193.18676 1078.2188 190.71484 C 1064.2856 188.04529 1049.8938 188.0431 1035.8574 189.29297 C 1010.6842 191.52871 985.92835 196.99376 960.77148 199.35547 C 941.38609 201.19056 921.63858 201.21613 902.52148 197.13477 C 884.72741 193.41279 867.86977 186.17341 851.93164 177.55859 C 826.73116 163.87211 803.50532 146.96102 779.82422 130.87305 C 766.22114 121.66286 752.45615 112.53662 738.02148 104.77148 C 724.63825 97.554058 710.44959 91.556701 695.48828 88.5625 C 692.95298 88.055209 690.55416 87.656574 688.00586 87.3125 C 683.97493 86.772184 679.81026 86.431882 675.81641 86.310547 z "
              />
            </g>
            <path
              className="fill-secondPrimary"
              fill-opacity="1"
              d="M0,224L30,186.7C60,149,120,75,180,85.3C240,96,300,192,360,208C420,224,480,160,540,117.3C600,75,660,53,720,74.7C780,96,840,160,900,176C960,192,1020,160,1080,170.7C1140,181,1200,235,1260,224C1320,213,1380,139,1410,101.3L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
              id="path140"
            />
          </g>
        </svg>
        <div className="bg-primary text-primary-foreground pt-8 py-16">
          <h2 className="text-4xl font-bold text-center">
            Try Ever English Now
          </h2>
          <div className="mt-8">
            <Image
              src={dashboardSs}
              width={1024}
              height={800}
              alt="dashboard screenshot"
              className="max-w-full mx-auto w-[800px] rounded-md"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href={"/dashboard"}
              className="bg-secondPrimary text-primary-foreground px-6 py-4 rounded-md text-3xl font-bold hover:bg-secondPrimary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <footer className="p-4 bg-primary text-primary-foreground text-center border-white border-t">
        Made with love by{" "}
        <a
          href="https://github.com/AnsellMaximilian"
          className="italic hover:text-secondPrimary"
        >
          Ansell Maximilian
        </a>
      </footer>
    </main>
  );
}
