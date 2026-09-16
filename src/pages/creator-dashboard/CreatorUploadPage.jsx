import { Stack } from '@shared/ui/primitives/Layout';
import { Heading, Text } from '@shared/ui/atoms/Typography';
import { UploadDropzone } from '@features/upload-asset';

export default function CreatorUploadPage() {
  return (
    <Stack gap="lg">
      <div>
        <Heading level="h4" as="h2">
          Upload assets
        </Heading>
        <Text size="sm" muted className="mt-1">
          Files are processed automatically — previews, metadata, and moderation submission happen without blocking you.
        </Text>
      </div>
      <UploadDropzone />
    </Stack>
  );
}
