import { useCallback, useEffect, useRef, useState } from 'react';
import { UploadCloud, FileImage, CheckCircle2, X } from 'lucide-react';
import { cn } from '@shared/lib/cn';
import { Text } from '@shared/ui/atoms/Typography';
import { useI18n } from '@shared/i18n/LocaleProvider';

const STAGES = ['UPLOADING', 'PROCESSING', 'DRAFT'];
const STAGE_LABEL_KEY = {
  UPLOADING: 'creatorUpload.stageUploading',
  PROCESSING: 'creatorUpload.stageProcessing',
  DRAFT: 'creatorUpload.stageDraft',
};

function FileRow({ file, onRemove }) {
  const { t } = useI18n();
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stage = STAGES[stageIndex];

  // UPLOADING: drive progress upward until it completes the stage.
  useEffect(() => {
    if (stage !== 'UPLOADING') return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 8 + Math.random() * 10));
    }, 150);
    return () => clearInterval(interval);
  }, [stage]);

  // Advance UPLOADING -> PROCESSING once progress completes.
  useEffect(() => {
    if (stage === 'UPLOADING' && progress >= 100) {
      const timeout = setTimeout(() => setStageIndex(1), 150);
      return () => clearTimeout(timeout);
    }
  }, [stage, progress]);

  // Advance PROCESSING -> DRAFT after a simulated processing window.
  useEffect(() => {
    if (stage !== 'PROCESSING') return;
    const timeout = setTimeout(() => setStageIndex(2), 1400);
    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <li className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated px-4 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-surface text-muted">
        <FileImage className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-foreground">{file.name}</span>
          {stage === 'DRAFT' ? (
            <CheckCircle2 className="size-4 shrink-0 text-success" />
          ) : (
            <button type="button" onClick={onRemove} aria-label={t('creatorUpload.cancelUpload')} className="shrink-0 text-muted hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>
        <Text size="xs" muted className="mt-0.5">
          {t(STAGE_LABEL_KEY[stage])}
        </Text>
        {stage === 'UPLOADING' && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        )}
        {stage === 'PROCESSING' && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-accent" />
          </div>
        )}
      </div>
    </li>
  );
}

export function UploadDropzone() {
  const { t } = useI18n();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = useCallback((fileList) => {
    const items = Array.from(fileList).map((f) => ({ id: `${f.name}-${Date.now()}-${Math.random()}`, name: f.name }));
    setFiles((prev) => [...items, ...prev]);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-fast',
          dragging ? 'border-accent bg-accent/5' : 'border-border'
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-surface text-muted">
          <UploadCloud className="size-6" />
        </span>
        <div>
          <Text size="base" className="font-medium">
            {t('creatorUpload.dropHint')}{' '}
            <button type="button" onClick={() => inputRef.current?.click()} className="text-accent underline underline-offset-2">
              {t('creatorUpload.browse')}
            </button>
          </Text>
          <Text size="xs" muted className="mt-1">
            {t('creatorUpload.supportedFormats')}
          </Text>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {files.map((f) => (
            <FileRow key={f.id} file={f} onRemove={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))} />
          ))}
        </ul>
      )}
    </div>
  );
}
