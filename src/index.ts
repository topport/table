import "@visualjs/grid/dist/style.css";
import "@visualjs/grid/dist/themes/default.css";
import { Grid, RowData, InputEditor } from "@visualjs/grid";

let rows: RowData[] = [];

for (let i = 0; i < 1000; i++) {
  let data: RowData = {
    id: String(i)
  };

  for (let j = 1; j <= 20; j++) {
    data[String(j)] = `${i} - ${j}`;
  }

  rows.push(data);
}

new Grid(document.querySelector("#app") as HTMLElement, {
  columns: [
    {
      headerName: "Group 01",
      collapsible: true,
      children: [
        { field: "1", headerName: "1", resizable: true, width: 100 },
        { field: "2", headerName: "2", resizable: true, width: 100 },
        { field: "3", headerName: "3", resizable: true, width: 100 }
      ]
    },
    { field: "4", headerName: "4", resizable: true, width: 100 },
    { field: "5", headerName: "5", resizable: true, width: 100 },
    { field: "6", headerName: "6", resizable: true, width: 100 },
    { field: "7", headerName: "7", resizable: true, width: 100 },
    {
      headerName: "Group 02",
      collapsible: true,
      children: [
        { field: "8", headerName: "8", resizable: true, width: 100 },
        { field: "9", headerName: "9", resizable: true, width: 100 },
        { field: "10", headerName: "10", resizable: true, width: 100 }
      ]
    },
    { field: "11", headerName: "11", resizable: true, width: 100 },
    { field: "12", headerName: "12", resizable: true, width: 100 },
    { field: "13", headerName: "13", resizable: true, width: 100 },
    { field: "14", headerName: "14", resizable: true, width: 100 },
    { field: "15", headerName: "15", resizable: true, width: 100 },
    { field: "16", headerName: "16", resizable: true, width: 100 },
    { field: "17", headerName: "17", resizable: true, width: 100 },
    { field: "18", headerName: "18", resizable: true, width: 100 },
    { field: "19", headerName: "19", resizable: true, width: 100 },
    { field: "20", headerName: "20", resizable: true, width: 100 }
  ],
  defaultColumnOption: {
    width: 60,
    cellEditor: InputEditor
  },
  rows: rows,
  fillable: "xy",
  getColumnMenuItems: (params) => {
    const options = params.grid.getColumnOptions(params.column);

    const setColumnPinned = (pinned?: "left" | "right") => {
      params.grid.setColumnPinned(params.column, pinned);
    };

    const pinnedIcon = (pinned?: "left" | "right") => {
      if (pinned === options.pinned) {
        return "vg-checkmark";
      }
    };

    return [
      {
        name: "Pin Current Column",
        icon: "vg-pin",
        disabled: options.readonly,
        subMenus: [
          {
            name: "Pin Left",
            action: () => setColumnPinned("left"),
            icon: pinnedIcon("left")
          },
          {
            name: "Pin Right",
            action: () => setColumnPinned("right"),
            icon: pinnedIcon("right")
          },
          {
            name: "No Pin",
            action: () => setColumnPinned(),
            icon: pinnedIcon()
          }
        ]
      },
      {
        name: "Flex",
        icon: options.flex ? "vg-checkmark" : "",
        action: () => {
          params.grid.setColumnWidth(params.column, {
            flex: Number(!options.flex)
          });
        }
      },
      {
        name: "Visible",
        icon: options.visible ? "vg-checkmark" : "",
        action: () => {
          params.grid.setColumnVisible(params.column, false);
        }
      }
    ];
  },
  getContextMenuItems: (params) => {
    const options = params.grid.getColumnOptions(params.column);

    const setRowsPinned = (pinned?: "top" | "bottom") => {
      if (pinned == "top") {
        params.grid.appendPinnedTopRows(params.grid.getSelectedRows());
      } else if (pinned == "bottom") {
        params.grid.appendPinnedBottomRows(params.grid.getSelectedRows());
      } else {
        params.grid.takePinnedRows(params.grid.getSelectedRows());
      }
    };

    const pinnedTopRowIcon = () => {
      return params.grid.isPinnedTop(params.row) ? "vg-checkmark" : "";
    };
    const pinnedBottomRowIcon = () => {
      return params.grid.isPinnedBottom(params.row) ? "vg-checkmark" : "";
    };
    const noPinnedRowIcon = () => {
      return !params.grid.isPinnedRow(params.row) ? "vg-checkmark" : "";
    };

    return [
      { name: "Enlarge", icon: "vg-enlarge-simplicit" },
      { separator: true },
      {
        name: "Pin Current Row",
        icon: "vg-pin",
        subMenus: [
          {
            name: "Pin Top",
            action: () => setRowsPinned("top"),
            icon: pinnedTopRowIcon()
          },
          {
            name: "Pin Bottom",
            action: () => setRowsPinned("bottom"),
            icon: pinnedBottomRowIcon()
          },
          {
            name: "No Pin",
            action: () => setRowsPinned(),
            icon: noPinnedRowIcon()
          }
        ]
      },
      { separator: true },
      {
        name: "Copy",
        icon: "vg-copy",
        action: () => params.grid.copySelection()
      },
      {
        name: "Paste",
        disabled: options.readonly,
        icon: "vg-paste",
        action: () => params.grid.pasteFromClipboard()
      },
      { separator: true },
      {
        name: "Delete",
        disabled: options.readonly,
        icon: "vg-trash-bin",
        action: () => {
          params.grid.removeRows([params.row]);
        }
      },
      { separator: true },
      { name: "Download", icon: "vg-download", disabled: true }
    ];
  }
});
