import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Grid } from '@shared/ui/primitives/Layout';
import { Heading } from '@shared/ui/atoms/Typography';
import { SearchInput } from '@shared/ui/molecules/SearchInput';
import { CreatorCard, fetchCreators } from '@entities/creator';
import { EmptyState } from '@shared/ui/patterns/EmptyState';
import { Skeleton } from '@shared/ui/atoms/Feedback';
import { Users } from 'lucide-react';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorsDirectoryPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const { data: creators, isLoading } = useQuery({ queryKey: ['creators'], queryFn: () => fetchCreators() });

  const filtered = (creators || []).filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <Container className="py-9">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Heading level="h2" as="h1">
          {t('creator.directoryTitle')}
        </Heading>
        <div className="w-full sm:max-w-xs">
          <SearchInput value={query} onChange={setQuery} placeholder={t('creator.searchPlaceholder')} size="sm" />
        </div>
      </div>

      {isLoading ? (
        <Grid cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" gap="lg">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-52 w-full rounded-xl" />
          ))}
        </Grid>
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Users />} title={t('creator.noneFoundTitle')} description={t('creator.noneFoundDescription')} />
      ) : (
        <Grid cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" gap="lg">
          {filtered.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
