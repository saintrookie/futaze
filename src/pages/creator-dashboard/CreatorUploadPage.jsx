import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { UploadDropzone } from '@features/upload-asset';
import { useI18n } from '@shared/i18n/LocaleProvider';

export default function CreatorUploadPage() {
  const { t } = useI18n();
  return (
    <Stack gap="lg">
      <div>
        <Heading level="h4" as="h2">
          {t('creatorUpload.title')}
        </Heading>
        <Text size="sm" muted className="mt-1">
          {t('creatorUpload.description')}
        </Text>
      </div>
      <UploadDropzone />
    </Stack>
  );
}
