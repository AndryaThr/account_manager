type FilterModalHandle = {
  showModal: () => void;
  hideModal: () => void;
};

type SearchFilter = {
  category?: number;
  sortKey: "name" | "date" | "user";
  sortType: "asc" | "desc";
};

export type { FilterModalHandle, SearchFilter };
