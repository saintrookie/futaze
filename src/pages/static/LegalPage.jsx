import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';

const SECTIONS = {
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated September 2025',
    body: [
      'By using Futaze, you agree to license (not purchase outright) the digital assets available on the platform, subject to the license tier selected at checkout.',
      'Creators retain copyright of their work. Purchasing a license grants usage rights as described for that tier — it does not transfer ownership.',
      'Misuse of downloaded assets outside the granted license terms may result in license revocation and account suspension.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated September 2025',
    body: [
      'We collect the information necessary to operate your account, process payments, and deliver licensed downloads securely.',
      'We never sell your personal data. Analytics events are used in aggregate to improve search relevance and platform performance.',
      'You can request a copy or deletion of your data at any time from Account → Settings.',
    ],
  },
};

export default function LegalPage({ type = 'terms' }) {
  const section = SECTIONS[type];
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Heading level="h1">{section.title}</Heading>
        <Text size="sm" muted className="mt-2">
          {section.updated}
        </Text>
        <div className="mt-8 flex flex-col gap-5">
          {section.body.map((p, i) => (
            <Text key={i} size="base" muted>
              {p}
            </Text>
          ))}
        </div>
      </div>
    </Container>
  );
}
