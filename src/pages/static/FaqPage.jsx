import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { cn } from '@shared/lib/cn';

const FAQS = [
  {
    q: 'What can I do with a Commercial license?',
    a: 'The Commercial license covers most client and business use — web, social, and print — for one end product, up to 500,000 impressions. See the full breakdown on the Pricing page.',
  },
  {
    q: 'Can I resell or redistribute assets I download?',
    a: 'Not under Personal or Commercial licenses. If you need merchandise or resale rights, choose the Extended license, which is built for exactly that.',
  },
  {
    q: 'How do creator payouts work?',
    a: 'Creators earn a share of every completed, non-refunded sale of their work, visible in real time from their dashboard. Payouts run monthly to a connected payout method.',
  },
  {
    q: 'What happens if I refund an order?',
    a: 'Refunds reverse future download authorization for that item, but anything already downloaded remains usable under the terms already granted — we don\'t revoke work already in progress.',
  },
  {
    q: 'How is my content moderated as a creator?',
    a: 'Every upload passes through review before publishing. You can track its status — draft, under review, approved, or published — from your creator dashboard at any time.',
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <Container className="py-4xl">
      <div className="mx-auto max-w-2xl">
        <Text size="caption" className="mb-3 text-accent">
          FAQ
        </Text>
        <Heading level="h1" className="mb-9">
          Frequently asked questions
        </Heading>
        <div className="divide-y divide-separator border-t border-b border-separator">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{item.q}</span>
                  <ChevronDown className={cn('size-4 shrink-0 text-muted transition-transform duration-fast', isOpen && 'rotate-180')} />
                </button>
                <div className={cn('grid transition-[grid-template-rows] duration-normal ease-standard', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden">
                    <Text size="sm" muted className="pb-5">
                      {item.a}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
