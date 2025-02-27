export interface Pageable<T> {
    content: T[];
    pageable: PageableInfo;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: SortInfo;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

interface PageableInfo {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    unpaged: boolean;
}

export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
