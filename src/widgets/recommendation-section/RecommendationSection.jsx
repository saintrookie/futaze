import { Section, Container } from '@shared/ui/primitives/Layout';
import { SectionHeader } from '@shared/ui/patterns/SectionHeader';
import { AssetGrid } from '@widgets/asset-grid/AssetGrid';

export function RecommendationSection({ eyebrow, title, description, action, assets, loading, contained = true, cols }) {
  const content = (
    <>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} action={action} />
      <AssetGrid assets={assets} loading={loading} cols={cols} />
    </>
  );

  return (
    <Section>{contained ? <Container>{content}</Container> : content}</Section>
  );
}
