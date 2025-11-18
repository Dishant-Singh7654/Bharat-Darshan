import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  contribution: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dishant",
    role: "Backend Developer",
    image: "/dishant.jpg",
    contribution: "Led the team as coordinator while focusing on Backend development. Implemented core functionalities and managed database systems."
  },
  {
    name: "Gungun",
    role: "Frontend Developer",
    image: "/gungun.jpg",
    contribution: "Contributed to Frontend development as a volunteer. Helped implement website features and design website layout."
  },
  {
    name: "Angad",
    role: "Data Collector",
    image: "/angad.jpg",
    contribution: "Served as a volunteer focusing on data collection. Gathered and organized cultural heritage information for the platform."
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4 px-4 sm:px-6">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Meet Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            The Creators Behind This Project
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base">
            We are a passionate team of developers and designers dedicated to showcasing India's rich cultural heritage through modern technology.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur">
              <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  loading="lazy"
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="space-y-2 sm:space-y-1.5">
                <CardTitle className="text-lg sm:text-xl">{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.contribution}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our goal is to create an engaging digital platform that preserves and promotes India's cultural heritage. We combine traditional elements with modern technology to make our rich history accessible to everyone.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
