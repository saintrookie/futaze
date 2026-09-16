import { Check, Languages } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';
import { Dropdown, DropdownItem } from '@shared/ui/molecules/Dropdown';
import { IconButton } from '@shared/ui/atoms/Button';

export function LanguageSwitcher({ className }) {
  const { locale, setLocale, locales, t } = useI18n();

  return (
    <Dropdown
      trigger={() => (
        <IconButton label={t('nav.language')} className={className}>
          <Languages />
        </IconButton>
      )}
    >
      {Object.values(locales).map((l) => (
        <DropdownItem key={l.code} onClick={() => setLocale(l.code)}>
          <span className="flex w-full items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span aria-hidden>{l.flag}</span>
              {l.label}
            </span>
            {locale === l.code && <Check className="size-3.5 text-accent" />}
          </span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
