import {
  // Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  // SmartImage,
  // Tag,
  // Text,
  RevealFx,
} from "@/once-ui/components";

import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/team/TableOfContents";
import styles from "@/components/team/team.module.scss";
import { person, team, social } from "@/app/resources/content";
import React, { ReactNode } from "react";
import { Meta, Schema } from "@/once-ui/modules";
import teamData from '../data/team_info.csv';
import { processTeamData } from '../utils/readCsv';
import type { TeamMember } from '../utils/readCsv';
import AMember from '@/components/team/TeamMember';
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
  return (
    <div className={styles.teamGrid}>
      {members.map((member, index) => (
        <div key={index} className={styles.teamMember}>
          <AMember {...member} />
        </div>
      ))}
    </div>
  );
}

export default function Team() {
  const teamMembers = processTeamData(teamData);

  const structure = [
    {
      title: team.intro.title,
      display: team.intro.display,
      items: [],
    }
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
      {/* {team.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} team={team} />
        </Column>
      )} */}


      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column
          className={styles.blockAlign}
          flex={9}
          horizontal="center"
          gap="16"
        >
          {/* @shiv update when we have the logo */}
          {/* <Avatar src={person.avatar} size="xl" /> */}
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


      <div className={styles.teamSection}>
      <TypingHeading
        texts={["Our Team", "And more on hover"]}
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      />
        <TeamGrid members={teamMembers} />
      </div>

      <div className={styles.memberInfo}>
        <p className={styles.school}>
          Legacy Members:<br />
          Edwin Chen, David Tome, Emily O&#39;Keeffe, Kieran Cooke, Chiana Trabal,
          Vamsikrishna Kurakalva, Dharmesh Chowdhary, Ricardo Yanez Gonzales,
          Carter Scanlan, William Hamilton, Logan Thompson, Soham Karandikar, 
          Julissa Liang, Kennedy Swyers, Luna Harrison, Chloe Li, Evan Chang, 
          Evan Sharp, Shivani Dodamani
        </p>
      </div>

    </Column>
    </RevealFx>
  );
}
