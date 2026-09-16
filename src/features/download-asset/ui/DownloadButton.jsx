import { useState } from 'react';
import { Download, Check, ShieldAlert } from 'lucide-react';
import { Button } from '@shared/ui/atoms/Button';
import { request } from '@shared/api/client';
import { useI18n } from '@shared/i18n/LocaleProvider';

/**
 * Simulates the server-side entitlement check the architecture requires
 * before any download is authorized — the client never assumes access.
 */
export function DownloadButton({ assetId, size = 'md', variant = 'secondary', label }) {
  const { t } = useI18n();
  const [status, setStatus] = useState('idle'); // idle | authorizing | ready | error

  const handleClick = async () => {
    setStatus('authorizing');
    try {
      await request(() => true, { delay: [500, 900], failRate: 0.05 });
      setStatus('ready');
      setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2200);
    }
  };

  return (
    <Button
      variant={status === 'error' ? 'destructive' : variant}
      size={size}
      loading={status === 'authorizing'}
      onClick={handleClick}
      iconLeft={status === 'ready' ? <Check /> : status === 'error' ? <ShieldAlert /> : <Download />}
    >
      {status === 'authorizing' && t('download.authorizing')}
      {status === 'ready' && t('download.ready')}
      {status === 'error' && t('download.error')}
      {status === 'idle' && (label || t('download.default'))}
    </Button>
  );
}
