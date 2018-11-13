import {
  FilteringState,
  IntegratedFiltering,
  IntegratedSorting,
  SelectionState,
  SortingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableFilterRow,
  TableHeaderRow,
  TableSelection
} from "@devexpress/dx-react-grid-material-ui";

import Paper from "@material-ui/core/Paper";
import React from "react";

const columns = [
  { name: "title", title: "Title" },
  { name: "year", title: "Year" },
  { name: "runtime", title: "Runtime" },
  { name: "revenue", title: "Revenue" },
  { name: "rating", title: "Rating" },
  {
    name: "genre",
    title: "Genre",
    getCellValue: row => (row.genre.length > 0 ? row.genre + ", " : "")
  }
];

const MovieList = ({
  movies,
  sorting,
  changeSorting,
  changeSelection,
  selection
}) => (
  <Paper>
    <Grid rows={movies} columns={columns}>
      <SortingState sorting={sorting} onSortingChange={changeSorting} />
      <IntegratedSorting />
      <FilteringState defaultFilters={[]} />
      <IntegratedFiltering />
      <SelectionState onSelectionChange={changeSelection} />
      <Table />
      <TableHeaderRow showSortingControls />
      <TableSelection
        selectByRowClick
        highlightRow
        showSelectionColumn={false}
      />
      <TableFilterRow />
    </Grid>
  </Paper>
);

export default MovieList;
