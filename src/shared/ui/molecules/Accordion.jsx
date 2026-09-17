import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Text } from '@shared/ui/atoms/Typography';
import { cn } from '@shared/lib/cn';

/**
 * Generic single-open-at-a-time disclosure list. Domain-agnostic — renders
 * whatever title/content each item is given, with no business logic.
 * Uncontrolled by default; pass `openIndex`/`onChange` to control it.
 */
export function Accordion({ items, openIndex: controlledIndex, defaultOpenIndex = -1, onChange, className }) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultOpenIndex);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : uncontrolledIndex;

  const toggle = (index) => {
    const next = activeIndex === index ? -1 : index;
    if (!isControlled) setUncontrolledIndex(next);
    onChange?.(next);
  };

  return (
    <div className={cn('divide-y divide-separator border-t border-b border-separator', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? index}
          title={item.title}
          isOpen={activeIndex === index}
          onToggle={() => toggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <ChevronDown className={cn('size-4 shrink-0 text-muted transition-transform duration-fast', isOpen && 'rotate-180')} />
      </button>
      <div className={cn('grid transition-[grid-template-rows] duration-normal ease-standard', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <Text size="sm" muted className="pb-5">
            {children}
          </Text>
        </div>
      </div>
    </div>
  );
}
