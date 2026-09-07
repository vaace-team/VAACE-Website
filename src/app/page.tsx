"use client";

import React, { useState, useEffect } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Icon,
  SmartImage,
} from "@/once-ui/components";
import { home, team, person } from "@/app/resources/content";

function TiltCard({ children }: { children: React.ReactNode }) {
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [transition, setTransition] = useState("transform 0.5s ease-out");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const cardWidth = card.width;
    const cardHeight = card.height;

    const centerX = e.clientX - card.left - cardWidth / 2;
    const centerY = e.clientY - card.top - cardHeight / 2;

    const rotateX = (-centerY / (cardHeight / 2)) * 8;
    const rotateY = (centerX / (cardWidth / 2)) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseEnter = () => {
    setTransition("transform 0.1s ease-out");
  };

  const handleMouseLeave = () => {
    setTransition("transform 0.5s ease-out");
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition,
        transformStyle: "preserve-3d",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "VAACE";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 200);

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const features = [
    {
      title: "Why Venus?",
      text: "Venus is Earth's evil twin in size but radically different—acidic clouds, crushing pressure, and scorching heat. Exploring Venus helps us understand planetary climate, habitability, and Earth's own long-term evolution.",
      icon: "globe",
      tag: "Target Planet",
    },
    {
      title: "Why an Aerobot?",
      text: "Traditional landers fail quickly on the extremely hot surface. Aerobots—high-altitude variable-buoyancy balloons—float safely in the temperate atmospheric zone, enabling extended high-altitude data collection across vast distances.",
      icon: "sparkles",
      tag: "Architecture",
    },
    {
      title: "Why Now?",
      text: "With NASA returning to Venus via VERITAS and DAVINCI in the 2030s, the V.A.A.C.E. team is prototyping next-generation dynamic balloon controls and self-healing skin systems to redefine atmospheric planetary exploration!",
      icon: "rocket",
      tag: "Mission Phase",
    },
  ];

  return (
    <Column maxWidth="m" horizontal="center">
      {/* Full-Screen Splash Intro */}
      <Flex
        style={{ minHeight: "100vh", paddingTop: "200px", position: "relative" }}
        fillWidth
        horizontal="center"
        vertical="start"
        direction="column"
      >
        {/* Ambient Gradient Glow Effect */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(255, 120, 40, 0.25) 0%, rgba(255, 70, 0, 0.08) 50%, rgba(0, 0, 0, 0) 75%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Horizontal Row: VAACE Text on Left, Dynamic Logo on Right */}
        <Row
          fillWidth
          horizontal="center"
          vertical="center"
          gap="24"
          wrap
          style={{ zIndex: 1, position: "relative" }}
        >
          {/* Left Side: Typewriter Text */}
          <Heading variant="display-strong-xl">
            {displayedText}
            <span
              style={{
                opacity: cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            >
              |
            </span>
          </Heading>

          {/* Right Side: Dynamic Logo from content.js */}
          <SmartImage
            src={home.logo.src}
            alt={home.logo.alt}
            aspectRatio="1 / 1"
            radius="m"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </Row>

        <Text
          variant="heading-default-l"
          onBackground="neutral-medium"
          marginTop="16"
          style={{ zIndex: 1, position: "relative" }}
        >
          Welcome! Scroll to explore
        </Text>
      </Flex>

      {/* Main Content */}
      <Column fillWidth paddingY="24" gap="m">
        <Column horizontal="center">
          {home.featured && home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="16"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-m"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          {/* Centered Headline */}
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            <Heading variant="display-strong-xl" align="center">
              {home.headline}
            </Heading>
          </RevealFx>

          {/* Centered Subline */}
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              align="center"
              onBackground="neutral-strong"
              variant="display-default-xs"
            >
              {home.subline}
            </Text>
          </RevealFx>

          {/* Centered Action Button */}
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            <Button
              id="team"
              data-border="rounded"
              href={team.path}
              variant="secondary"
              size="l"
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

      {/* Feature Cards */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column gap="l" fillWidth>
          <Column gap="m" fillWidth>
            {features.map((item, idx) => (
              <TiltCard key={idx}>
                <Column
                  background="neutral-weak"
                  border="neutral-alpha-weak"
                  radius="l"
                  padding="32"
                  gap="16"
                  style={{
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Row horizontal="space-between" vertical="center" fillWidth>
                    <Badge
                      background="neutral-alpha-weak"
                      onBackground="neutral-strong"
                      paddingX="12"
                      paddingY="4"
                      textVariant="label-default-m"
                    >
                      {item.tag}
                    </Badge>
                    <Icon
                      name={item.icon}
                      size="m"
                      onBackground="neutral-medium"
                    />
                  </Row>

                  <Heading variant="heading-strong-xl" marginTop="8">
                    {item.title}
                  </Heading>

                  <Text
                    variant="body-default-xl"
                    onBackground="neutral-strong"
                    style={{ lineHeight: "1.6" }}
                  >
                    {item.text}
                  </Text>
                </Column>
              </TiltCard>
            ))}
          </Column>

          {/* Closing Highlight Banner */}
          <Flex
            fillWidth
            padding="32"
            radius="l"
            background="brand-alpha-weak"
            border="brand-alpha-medium"
            horizontal="center"
            vertical="center"
          >
            <Text
              variant="heading-strong-l"
              align="center"
              onBackground="neutral-strong"
            >
              Building, testing, and flying—shaping the future of planetary
              exploration, one aerobot at a time.
            </Text>
          </Flex>
        </Column>
      </RevealFx>
    </Column>
  );
}