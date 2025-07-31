import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

interface BulkSelectPanelProps {
  op: React.RefObject<OverlayPanel>;
  overlayInput: number;
  setOverlayInput: (value: number) => void;
  handleOverlaySubmit: () => void;
  isSubmitting: boolean;
  MAX_SELECTION: number;
}

export default function BulkSelectPanel({
  op,
  overlayInput,
  setOverlayInput,
  handleOverlaySubmit,
  isSubmitting,
  MAX_SELECTION
}: BulkSelectPanelProps) {
  return (
    <OverlayPanel ref={op}>
      <div className="flex flex-column gap-3" style={{ width: '250px' }}>
        <div className="flex flex-column gap-2">
          <label htmlFor="selectCount">Number of rows to select</label>
          <InputNumber
            id="selectCount"
            value={overlayInput}
            onValueChange={(e) => setOverlayInput(Math.min(e.value ?? 0, MAX_SELECTION))}
            mode="decimal"
            min={0}
            max={MAX_SELECTION}
            className="w-full"
          />
        </div>
        <Button
          label={isSubmitting ? 'Selecting...' : 'Submit'}
          onClick={handleOverlaySubmit}
          loading={isSubmitting}
          disabled={overlayInput <= 0 || isSubmitting}
          className="w-full"
        />
        {isSubmitting && (
          <div className="flex align-items-center gap-2">
            <ProgressSpinner style={{ width: '20px', height: '20px' }} />
            <span>Processing selection...</span>
          </div>
        )}
      </div>
    </OverlayPanel>
  );
}