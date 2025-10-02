// Table Controls Components
//
// Komponen-komponen untuk kontrol tabel yang dapat digunakan ulang:
// - SearchInput: Input pencarian dengan ikon search
// - PerPageSelector: Dropdown untuk memilih jumlah item per halaman
// - TableControls: Wrapper yang menggabungkan search, per page selector, dan info pagination
//
// Usage:
// import TableControls from '../../../components/TableControls';
//
// <TableControls
//   searchValue={search}
//   onSearchChange={handleSearchChange}
//   perPage={limit}
//   onPerPageChange={handlePerPageChange}
//   totalItems={meta.total || 0}
//   currentPage={page}
//   itemsPerPage={limit}
//   searchPlaceholder="Search..."
// />

export { default as SearchInput } from "./SearchInput";
export { default as PerPageSelector } from "./PerPageSelector";
export { default as TableControls } from "./TableControls";
