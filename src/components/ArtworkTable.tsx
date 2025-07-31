import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import type { DataTablePageEvent, DataTableRowClickEvent } from 'primereact/datatable';
import type { Artwork } from '../types/artwork';

const PAGE_SIZE = 12; // Moved from hooks to here since it's used in the table

interface ArtworkTableProps {
  artworks: Artwork[];
  totalRecords: number;
  loading: boolean;
  page: number;
  onPageChange: (e: DataTablePageEvent) => void;
  isRowSelected: (row: Artwork) => boolean;
  toggleRow: (row: Artwork) => void;
  op: React.RefObject<any>;
}

export default function ArtworkTable({
  artworks,
  totalRecords,
  loading,
  page,
  onPageChange,
  isRowSelected,
  toggleRow,
  op
}: ArtworkTableProps) {
  const handleRowClick = (e: DataTableRowClickEvent) => {
    if ((e.originalEvent.target as HTMLElement).closest('.p-checkbox')) {
      return;
    }
    toggleRow(e.data as Artwork);
  };

  return (
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
          />
        )}
        body={(row: Artwork) => (
          <Checkbox
            checked={isRowSelected(row)}
            onChange={() => toggleRow(row)}
            className={isRowSelected(row) ? '!border-blue-500 !bg-blue-500' : ''}
          />
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
  );
}