import { Container, Section } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';

export default function AboutPage() {
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Text size="caption" className="mb-3 text-accent">
          About Futaze
        </Text>
        <Heading level="h1">Built for the people who make the work</Heading>
        <Section className="prose-content">
          <Text size="lg" muted>
            Futaze is a marketplace for creative assets — photography, footage, illustration, audio, and design
            — built around a simple premise: the people who make the work should be able to make a living from it.
          </Text>
          <Text size="base" muted className="mt-6">
            We started Futaze because too many marketplaces treat creative work as inventory. We built ours
            around transparent licensing, fair revenue share, and a discovery experience that respects both the
            person searching and the person who made what they find. Every asset on Futaze is reviewed before
            publication, every license is written in plain language, and every creator can see exactly what they've
            earned and when they'll be paid.
          </Text>
          <Text size="base" muted className="mt-6">
            Today, thousands of independent creators publish on Futaze, and teams of every size — from solo
            freelancers to enterprise brand teams — license their work for campaigns, products, and stories
            told around the world.
          </Text>
        </Section>
      </div>
    </Container>
  );
}
