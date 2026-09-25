import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Projects
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              active={project.active}
              tags={project.technologies}
              image={project.image}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
