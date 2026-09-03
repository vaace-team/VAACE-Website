import { getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  let allProjects = getPosts(["src", "content", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <div
          key={post.slug}
          style={{
            // CSS scoping to enlarge card titles and description summaries
            fontSize: "1.25rem",
          }}
        >
          <style jsx global>{`
            /* Enlarge Project Card Titles */
            div[data-project-card="${post.slug}"] h2,
            div[data-project-card="${post.slug}"] [class*="heading"],
            div[data-project-card="${post.slug}"] [class*="display"] {
              font-size: 2rem !important;
              line-height: 1.25 !important;
              font-weight: 700 !important;
            }

            /* Enlarge Project Card Summaries / Descriptions */
            div[data-project-card="${post.slug}"] p,
            div[data-project-card="${post.slug}"] [class*="body"] {
              font-size: 1.2rem !important;
              line-height: 1.6 !important;
              color: var(--neutral-on-background-medium, #cbd5e1) !important;
            }
          `}</style>

          <div data-project-card={post.slug}>
            <ProjectCard
              priority={index < 2}
              href={`work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
              link={post.metadata.link || ""}
            />
          </div>
        </div>
      ))}
    </Column>
  );
}