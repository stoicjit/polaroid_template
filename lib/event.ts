export const eventConfig = {
  title: "Wedding Guest App",
  shortName: "Wedding",
  description: "Capture and share memories from the celebration.",
  coupleNames: ["Gagan", "Pooja"],
  dateLabel: "Your wedding date",
  welcomeBackground: "/photos/photo6.jpg",
  welcomePhotos: [
    { src: "/photos/photo1.jpg", rotate: "-8deg", top: "2%", left: "-8%" },
    { src: "/photos/photo2.png", rotate: "9deg", top: "1%", right: "-9%" },
    { src: "/photos/photo3.jpg", rotate: "-5deg", top: "35%", left: "-8%" },
    { src: "/photos/photo4.png", rotate: "5deg", top: "33%", right: "-8%" },
    { src: "/photos/photo1.jpg", rotate: "8deg", bottom: "5%", left: "-7%" },
    { src: "/photos/photo2.png", rotate: "-8deg", bottom: "6%", right: "-6%" },
  ],
} as const;
