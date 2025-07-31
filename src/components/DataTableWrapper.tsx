import { useRef } from 'react';
import type { DataTablePageEvent, DataTableRowClickEvent } from 'primereact/datatable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useArtworks } from '../hooks/useArtworks';
import { useSelection } from '../hooks/useSelection';
import { useBulkSelection } from '../hooks/useBulkSelection';
import type { Artwork } from '../types/artwork';

export default function DataTableWrapper() {
  const op = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);
  
  const {
    artworks,
    totalRecords,
    loading,
    page,
    setPage,
    PAGE_SIZE
  } = useArtworks();
  
  const {
    selectedRows,
    setSelectedRows,
    isRowSelected,
    toggleRow,
  } = useSelection();
  
  const {
    overlayInput,
    setOverlayInput,
    isSubmitting,
    handleBulkSelection
  } = useBulkSelection(
    selectedRows,
    setSelectedRows
  );

  const handleRowClick = (e: DataTableRowClickEvent) => {
    const target = e.originalEvent.target as HTMLElement;
    if (target.closest('.p-checkbox')) {
      return;
    }
    toggleRow(e.data as Artwork);
  };

  const handleOverlaySubmit = async () => {
    if (overlayInput <= 0) return;

    try {
      const selectedCount = await handleBulkSelection(page, artworks, totalRecords);
      setOverlayInput(0);
      
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: `Selected ${selectedCount} items`,
        life: 3000
      });
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to complete selection',
        life: 3000
      });
    } finally {
      op.current?.hide();
    }
  };

  const onPageChange = (e: DataTablePageEvent) => {
    setPage(e.page ?? 0);
  };

  return (
    <div className="p-4" key={Object.keys(selectedRows).length}>
      <Toast ref={toast} position="top-right" />
      <h2 className="text-xl font-bold mb-3">Artworks Table</h2>

      <OverlayPanel ref={op}>
        <div className="flex flex-column gap-3" style={{ width: '250px' }}>
          <div className="flex flex-column gap-2">
            <label htmlFor="selectCount">Number of rows to select</label>
            <InputNumber
              id="selectCount"
              value={overlayInput}
              onValueChange={(e) => setOverlayInput(e.value ?? 0)}
              mode="decimal"
              min={0}
              className="w-full"
            />
          </div>
          <Button
            label={isSubmitting ? 'Selecting...' : 'Submit'}
            onClick={handleOverlaySubmit}
            loading={isSubmitting}
            icon={isSubmitting ? undefined : "pi pi-check"}
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

      <DataTable
        value={artworks}
        paginator
        rows={PAGE_SIZE}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        first={page * PAGE_SIZE}
        onPage={onPageChange}
        rowClassName={(row: Artwork) => (isRowSelected(row) ? 'bg-blue-50' : '')}
        onRowClick={handleRowClick}
      >
        <Column
          header={() => (
            <i
              className="pi pi-angle-down cursor-pointer hover:text-blue-500"
              onClick={(e) => op.current?.toggle(e)}
            ></i>
          )}
          body={(row: Artwork) => (
            <div className="flex items-center gap-2">
              <Checkbox
                inputId={`cb-${row.id}`}
                checked={isRowSelected(row)}
                onChange={() => toggleRow(row)}
                className={isRowSelected(row) ? '!border-blue-500 !bg-blue-500' : ''}
              />
            </div>
          )}
          style={{ width: '4rem' }}
        />
        <Column field="title" header="Title" sortable />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

      <div className="mt-3 text-sm text-gray-600">
        Total Selected: <span className="font-bold text-blue-600">{Object.keys(selectedRows).length}</span>
      </div>
    </div>
  );
}