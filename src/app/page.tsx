"use client";

import React, { useState, useEffect } from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, team, person, newsletter } from "@/app/resources/content";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "VAACE";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200); // Adjust typing speed here (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <Column maxWidth="m" horizontal="center">
     {/* Full-Screen Splash Intro */}
      <Flex
        style={{ minHeight: "100vh" }}
        fillWidth
        horizontal="center"
        vertical="start"
        paddingTop="128"
        marginTop="64"
        direction="column"
      >
        <Heading variant="display-strong-xl">
          {displayedText}
          <span style={{ opacity: 0.5 }}>|</span>
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" marginTop="16">
          Welcome! Scroll to explore!
        </Text>
      </Flex>

      {/* Main Content (Appears on Scroll) */}
      <Column fillWidth paddingY="24" gap="m">
        <Column>
          {home.featured && (
            <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="team"
              data-border="rounded"
              href={team.path}
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {team.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {team.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx translateY="16" delay={0.6}>
        <Column gap="l">
          <Column gap="m">
            <Heading variant="heading-strong-m">Why Venus?</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Venus is Earth’s twin in size but radically different — acidic clouds, crushing pressure, and scorching heat. Exploring Venus helps us understand climate, habitability, and Earth’s own future.
            </Text>
          </Column>

          <Column gap="m">
            <Heading variant="heading-strong-m">Why an Aerobot?</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Traditional landers fail quickly on Venus. Aerobots — high-altitude balloons — can float safely in the temperate zone, collecting data for much longer and covering more ground.
            </Text>
          </Column>

          <Column gap="m">
            <Heading variant="heading-strong-m">Why Now?</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              NASA is returning to Venus with missions like <em>VERITAS</em> and <em>DAVINCI</em>. In 2024, our V.A.A.C.E team received early-stage NASA funding to prototype the next generation of Venus aerobots.
            </Text>
          </Column>

          <Text variant="body-default-l" onBackground="neutral-weak">
            We’re building, testing, and flying — shaping the future of planetary exploration, one balloon at a time.
          </Text>
        </Column>
      </RevealFx>
    </Column>
  );
}