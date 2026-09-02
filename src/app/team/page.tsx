import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  RevealFx,
  Text,
} from "@/once-ui/components";

import { baseURL } from "@/app/resources";
import styles from "@/components/team/team.module.scss";
import { person, team, social } from "@/app/resources/content";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";
import teamData from "../data/team_info.csv";
import { processTeamData } from "../utils/readCsv";
import type { TeamMember } from "../utils/readCsv";
import AMember from "@/components/team/TeamMember";
import { TypingHeading } from "@/components/TypingHeader";

export async function generateMetadata() {
  return Meta.generate({
    title: team.title,
    description: team.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(team.title)}`,
    path: team.path,
  });
}

interface TeamGridProps {
  members: TeamMember[];
}

function TeamGrid({ members }: TeamGridProps) {
  if (members.length === 0) {
    return (
      <Flex
        fillWidth
        padding="24"
        radius="l"
        background="neutral-weak"
        border="neutral-alpha-weak"
        horizontal="center"
        vertical="center"
      >
        <Text variant="body-default-m" onBackground="neutral-medium">
          Members coming soon...
        </Text>
      </Flex>
    );
  }

  return (
    <div className={styles.teamGrid}>
      {members.map((member, index) => (
        <AMember key={index} {...member} />
      ))}
    </div>
  );
}

export default function Team() {
  const allMembers = processTeamData(teamData);

  // First 4 members go to Leadership Team
  const leadershipMembers = allMembers.slice(0, 4);

  // Subteam Filtering (Filters by tag or defaults to empty if none exist yet)
  const engineeringMembers = allMembers.filter((m) =>
    m.subteams?.some((t) => t.toLowerCase().includes("engineering"))
  );
  
  const softwareMembers = allMembers.filter((m) =>
    m.subteams?.some((t) => t.toLowerCase().includes("software"))
  );

  const socialMediaMembers = allMembers.filter((m) =>
    m.subteams?.some((t) => t.toLowerCase().includes("social") || t.toLowerCase().includes("media"))
  );

  const teamSections = [
    { title: "Leadership Team", members: leadershipMembers },
    { title: "Engineering", members: engineeringMembers },
    { title: "Software", members: softwareMembers },
    { title: "Social Media", members: socialMediaMembers },
  ];

  return (
    <RevealFx translateY="8" delay={0.06}>
      <Column maxWidth="m">
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={team.title}
          description={team.description}
          path={team.path}
          image={`${baseURL}/og?title=${encodeURIComponent(team.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${team.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* Hero / Intro Header */}
        <Flex fillWidth mobileDirection="column" horizontal="center">
          <Column
            className={styles.blockAlign}
            flex={9}
            horizontal="center"
            gap="16"
          >
            <Heading className={styles.textAlign} variant="display-strong-xs">
              {person.role}
            </Heading>

            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map((item) =>
                  item.link ? (
                    <React.Fragment key={item.name}>
                      <Button
                        className="s-flex-hide"
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="secondary"
                      />
                      <IconButton
                        className="s-flex-show"
                        size="l"
                        href={item.link}
                        icon={item.icon}
                        variant="secondary"
                      />
                    </React.Fragment>
                  ) : null
                )}
              </Flex>
            )}

            <Flex gap="8" vertical="center" marginTop="m">
              <Icon onBackground="accent-weak" name="globe" />
              {"College Park, Maryland"}
            </Flex>

            {team.intro.display && (
              <Column textVariant="body-default-l" fillWidth gap="m" marginTop="xl">
                {team.intro.description}
              </Column>
            )}
          </Column>
        </Flex>

        {/* Categorized Team Sections */}
        <Column fillWidth gap="40" marginTop="xl" className={styles.teamSection}>
          <TypingHeading
            texts={["Our Team", "Meet the Researchers"]}
            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
          />

          {teamSections.map((section, idx) => (
            <Column key={idx} fillWidth gap="16">
              <Heading variant="heading-strong-l" onBackground="neutral-strong">
                {section.title}
              </Heading>
              <TeamGrid members={section.members} />
            </Column>
          ))}
        </Column>
      </Column>
    </RevealFx>
  );
}