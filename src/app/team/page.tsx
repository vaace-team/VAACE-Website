"use client";

import React, { useState, useEffect } from "react";
import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Icon } from "@/once-ui/components";
import { home, team, person } from "@/app/resources/content";

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

  return (
    <Column maxWidth="m" horizontal="center">
      {/* Full-Screen Centered Intro */}
      <Flex
        style={{ minHeight: "100vh" }}
        fillWidth
        horizontal="center"
        vertical="center"
        direction="column"
        paddingX="16"
      >
        <Heading variant="display-strong-xl" align="center">
          {displayedText}
          <span style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}>|</span>
        </Heading>

        <Heading
          variant="heading-strong-xl"
          align="center"
          marginTop="24"
          onBackground="neutral-strong"
        >
          Venus Aerobot for Atmosphere and Cloud Exploration
        </Heading>

        <Text
          variant="body-default-xl"
          align="center"
          onBackground="neutral-weak"
          marginTop="16"
          style={{ lineHeight: "1.6", maxWidth: "32rem" }}
        >
          V.A.A.C.E is a NASA L'SPACE NPWEE funded, student-led initiative developing innovative phase-change balloon systems to support Venus exploration since Aug 2024.
        </Text>

        <Text variant="heading-default-m" onBackground="neutral-medium" marginTop="32">
          Scroll to explore ↓
        </Text>
      </Flex>
    </Column>
  );
}