import { Terminal, Cpu, User, FileCode2, FolderGit2, Mail } from 'lucide-react';
import BentoCard from '@components/ui/BentoCard';
import IdentityCard from '@components/sections/IdentityCard';
import ProfileCard from '@components/sections/ProfileCard';
import TerminalAbout from '@components/sections/TerminalAbout';
import SkillsRadar from '@components/sections/SkillsRadar';
import ExperiencePanel from '@components/sections/ExperiencePanel';
import ProjectsGrid from '@components/sections/ProjectsGrid';
import ContactPanel from '@components/sections/ContactPanel';

const ICON = 'h-3.5 w-3.5';

/**
 * Bento grid. DOM order is the mobile reading order; the column spans place the same
 * order on a 6-column tablet grid and a 12-column desktop grid without reordering:
 *
 *   tablet  : identity | profile | about + skills | experience | projects | contact
 *   desktop : identity + profile | about + skills + experience | projects | contact
 */
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
          <IdentityCard />
        </BentoCard>

        <BentoCard
          id="profile"
          title="profile.json"
          icon={<User className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-profile"
        >
          <ProfileCard />
        </BentoCard>

        <BentoCard
          id="about"
          title="about.ts"
          icon={<Terminal className={ICON} aria-hidden />}
          className="md:col-span-3 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-about"
        >
          <TerminalAbout />
        </BentoCard>

        <BentoCard
          id="skills"
          title="skills.json"
          icon={<Cpu className={ICON} aria-hidden />}
          className="md:col-span-3 lg:col-span-4"
          bodyClassName="p-0"
          data-testid="bento-skills"
        >
          <SkillsRadar />
        </BentoCard>

        <BentoCard
          id="experience"
          title="experience.log"
          icon={<FileCode2 className={ICON} aria-hidden />}
          className="md:col-span-6 lg:col-span-4"
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
