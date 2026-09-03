
const person = {
  firstName: "V.A.A.C.E",
  lastName: "",
  get name() {
    return `${this.firstName}`;
  },
  role: "Venus Aerobot for Atmosphere and Cloud Exploration",
  avatar: "/team_images/pic_Team.jpg",
  email: "example@gmail.com",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to the newsletter</>,
  description: (
    <>
      Get all our exciting updates delivered straight to your inbox.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Instagram",
    icon: "person",
    link: "https://www.instagram.com/vaace_team/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/vaace/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/V_A_A_C_E",
  },

  // {
  //   name: "Email",
  //   icon: "email",
  //   link: `mailto:${person.email}`,
  // },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: ``,
  headline: <>Venus Aerobot for Atmosphere and Cloud Exploration</>,
  featured: {
    display: true,
    // title: <>Recent project: <strong className="ml-4">Annoucing our NASA Funding</strong></>,
    title: <>Recent project: <strong className="ml-4">August 2025, Phase One Complete!</strong></>,
    // href: "/work/introducing-vaace",
    href: "/work/phase-one-payload-test",
  },
  subline: (
    <>
      V.A.A.C.E is a NASA L&apos;SPACE NPWEE funded, student-led initiative developing innovative phase-change balloon systems to support Venus exploration since Aug 2024.
    </>
  ),
};

const team = {
  path: "/team",
  label: "Team",
  title: "Meet Our Team",
  description: "Meet our amazing team members",
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: false,
    title: "Introduction",
    description: (
      <>
      </>
    ),
  },
  team: {
    display: true,
    title: "Our Team",
    members: [
      {
      }
    ],
    groupBy: "subteam", 
    filters: {
      display: true,
      options: ["All", "Lab Inflation", "Payload", "Balloon", "Advisors"]
    }
  }
};


const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `Photos and videos from our LIT and Payload tests Summer 2025`,
  // Last updated 10/14/25
  // Add images to the gallery by adding new image objects to the "images" array below
  // Add videos the same way 
  images: [
    {
      src: "/images/gallery/full_payload_team.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/payload_flight_setup.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vaace_payload.jpg",
      alt: "image",
      orientation: "horizontal",
    },
        {
      src: "/video/gallery/clip_payload_flight_recording_runcam.mp4",
      alt: "video",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/lit_setup.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/payload_in_air.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/payload_team_leads.png",
      alt: "image",
      orientation: "vertical",
    },
        {
      src: "/images/gallery/building_pic.png",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, team, blog, work, gallery };
