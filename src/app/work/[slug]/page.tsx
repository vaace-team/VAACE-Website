import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Flex, Heading, Icon, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { team, person, work } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { Metadata } from "next";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "content", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "content", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image ? `${baseURL}${post.metadata.image}` : `${baseURL}/og?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "content", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={`${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${team.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Back Button */}
      <Column fillWidth maxWidth="s" gap="16">
        <Button
          data-border="rounded"
          href="/work"
          variant="secondary"
          weight="default"
          size="s"
          prefixIcon="chevronLeft"
        >
          Back to Projects
        </Button>
      </Column>

      {/* Hero Header Card */}
      <Column
        fillWidth
        maxWidth="s"
        padding="32"
        radius="xl"
        gap="24"
        style={{
          background: "linear-gradient(135deg, rgba(255, 107, 0, 0.12) 0%, rgba(99, 102, 241, 0.12) 50%, rgba(16, 185, 129, 0.12) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Category / Status Badges */}
        <Flex gap="8" wrap>
          <Flex
            paddingX="12"
            paddingY="4"
            radius="s"
            style={{
              background: "linear-gradient(90deg, #FF6B00 0%, #FF8800 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            NASA Funded
          </Flex>
          <Flex
            paddingX="12"
            paddingY="4"
            radius="s"
            style={{
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#818CF8",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            Payload Test
          </Flex>
        </Flex>

        {/* Scaled Up Title */}
        <Heading
          variant="display-strong-m"
          style={{
            fontSize: "2.5rem",
            lineHeight: "1.2",
            background: "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {post.metadata.title}
        </Heading>

        {/* Scaled Up Summary / Subtitle */}
        {post.metadata.summary && (
          <Text
            variant="heading-default-s"
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.6",
              color: "#CBD5E1",
              fontWeight: 400,
            }}
          >
            {post.metadata.summary}
          </Text>
        )}

        {/* Dynamic Metadata Row */}
        <Flex gap="16" wrap vertical="center" horizontal="space-between" marginTop="8">
          <Flex gap="12" vertical="center">
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Flex gap="8" vertical="center">
              <Icon name="calendar" size="s" onBackground="accent-weak" />
              <Text variant="body-default-m" style={{ color: "#94A3B8" }}>
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
            </Flex>
          </Flex>

          {post.metadata.link && (
            <Button
              href={post.metadata.link}
              suffixIcon="arrowUpRight"
              variant="primary"
              size="m"
              style={{
                background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)",
                border: "none",
              }}
            >
              View Announcement
            </Button>
          )}
        </Flex>
      </Column>

      {/* Hero Image */}
      {post.metadata.images && post.metadata.images.length > 0 && (
        <Column fillWidth maxWidth="s" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: "-2px",
              borderRadius: "18px",
              background: "linear-gradient(45deg, #FF6B00, #6366F1, #10B981)",
              opacity: 0.5,
              filter: "blur(8px)",
              zIndex: 0,
            }}
          />
          <SmartImage
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt={post.metadata.title}
            src={post.metadata.images[0]}
            style={{ position: "relative", zIndex: 1 }}
          />
        </Column>
      )}

      {/* Main Content Body */}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs" fillWidth>
        <CustomMDX source={post.content} />
      </Column>

      <ScrollToHash />
    </Column>
  );
}