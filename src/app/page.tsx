import { Terminal, Cpu, Activity, FileCode2, FolderGit2, Mail } from 'lucide-react';
import BentoCard from '@components/ui/BentoCard';
import IdentityCard from '@components/sections/IdentityCard';
import TerminalAbout from '@components/sections/TerminalAbout';
import SkillsRadar from '@components/sections/SkillsRadar';
import GitHubActivity from '@components/sections/GitHubActivity';
import ExperiencePanel from '@components/sections/ExperiencePanel';
import ProjectsGrid from '@components/sections/ProjectsGrid';
import ContactPanel from '@components/sections/ContactPanel';

const basePath = process.env.NODE_ENV === 'production' ? '/next-portfolio' : '';
const ICON = 'h-3.5 w-3.5';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        <BentoCard
          id="top"
          className="md:col-span-6 lg:col-span-8"
          bodyClassName="flex min-h-0 flex-1 flex-col p-0"
          data-testid="bento-identity"
        >
          <IdentityCard basePath={basePath} />
        </BentoCard>

        <BentoCard
          id="about"
          title="about.ts"
          icon={<Terminal className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-about"
        >
          <TerminalAbout />
        </BentoCard>

        <BentoCard
          id="skills"
          title="skills.json"
          icon={<Cpu className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-skills"
        >
          <SkillsRadar />
        </BentoCard>

        <BentoCard
          id="activity"
          title="contributions"
          icon={<Activity className={ICON} aria-hidden />}
          className="md:col-span-3 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-activity"
        >
          <GitHubActivity />
        </BentoCard>

        <BentoCard
          id="experience"
          title="experience.log"
          icon={<FileCode2 className={ICON} aria-hidden />}
          className="md:col-span-3 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-experience"
        >
          <ExperiencePanel />
        </BentoCard>

        <BentoCard
          id="projects"
          title="projects/"
          icon={<FolderGit2 className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-12"
          bodyClassName="p-0"
          data-testid="bento-projects"
        >
          <ProjectsGrid />
        </BentoCard>

        <BentoCard
          id="contact"
          title="contact.md"
          icon={<Mail className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-12"
          bodyClassName="p-0"
          data-testid="bento-contact"
        >
          <ContactPanel />
        </BentoCard>
      </div>
    </div>
  );
}
