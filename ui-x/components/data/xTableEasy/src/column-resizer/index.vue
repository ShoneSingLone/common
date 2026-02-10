<script lang="ts">
export default async function () {
  // 导入工具函数
  const [util] = await Promise.all([
    _.$importVue("/common/ui-x/components/data/xTableEasy/src/util/index.vue")
  ]);

  return {
    name: "xTableEasyColumnResizer",
    props: {
      parentRendered: {
        type: Boolean,
        required: true
      },
      tableContainerEl: {
        type: Object,
        default: null
      },
      hooks: {
        type: Object,
        required: true
      },
      colgroups: {
        type: Array,
        required: true
      },
      isColumnResizerHover: {
        type: Boolean,
        required: true
      },
      isColumnResizing: {
        type: Boolean,
        required: true
      },
      setIsColumnResizerHover: {
        type: Function,
        required: true
      },
      setIsColumnResizing: {
        type: Function,
        required: true
      },
      setColumnWidth: {
        type: Function,
        required: true
      },
      columnWidthResizeOption: {
        type: Object,
        default: function () {
          return null;
        }
      }
    },
    data() {
      return {
        columnResizerStartX: 0,
        currentResizingColumn: null,
        columnResizerHandlerWidth: 5,
        columnResizerRect: {
          top: 0,
          left: 0,
          height: 0
        }
      };
    },
    computed: {
      columnMinWidth() {
        let result = 30;
        const { columnWidthResizeOption } = this;
        if (columnWidthResizeOption) {
          const { minWidth } = columnWidthResizeOption;
          if (typeof minWidth === "number" && minWidth > 0) {
            result = minWidth;
          }
        }
        return result;
      }
    },
    watch: {
      parentRendered: {
        handler: function (val) {
          if (val) {
            // 监听表头单元格鼠标移动事件
            this.hooks.addHook('HEADER_CELL_MOUSEMOVE', ({ event, column }) => {
              if (column.disableResizing) return;
              this.initColumnResizerPosition({ event, column });
            });
          }
        },
        immediate: true
      }
    },
    methods: {
      initColumnResizerPosition({ event, column }) {
        const { tableContainerEl, isColumnResizing } = this;
        if (tableContainerEl && !isColumnResizing) {
          const { left: tableContainerLeft, top: tableContainerTop } = tableContainerEl.getBoundingClientRect();
          
          // 查找对应列
          let col = null;
          for (let i = 0; i < this.colgroups.length; i++) {
            const rowCols = this.colgroups[i];
            col = rowCols.find(x => x.key === column.key);
            if (col) break;
          }
          
          // 不支持分组表头列宽拖动
          if (!col) {
            return false;
          }
          
          if (col._realTimeWidth) {
            const target = event.target;
            const cellRect = target.getBoundingClientRect();
            const { height, left, top } = cellRect;
            
            this.columnResizerRect.left = left + col._realTimeWidth - tableContainerLeft;
            this.columnResizerRect.top = top - tableContainerTop;
            this.columnResizerRect.height = height;
            
            this.currentResizingColumn = col;
            this.columnResizerStartX = left + col._realTimeWidth;
          } else {
            console.warn("Resizer column needs set column width");
          }
        }
      },
      
      setColumnResizerPositionByDrag(event) {
        const { tableContainerEl, isColumnResizing, currentResizingColumn } = this;
        if (tableContainerEl && isColumnResizing) {
          const { left: tableContainerLeft } = tableContainerEl.getBoundingClientRect();
          if (isColumnResizing && currentResizingColumn) {
            const { columnResizerStartX, columnMinWidth } = this;
            
            // 不允许拖动小于列最小宽度
            if (currentResizingColumn._realTimeWidth + (event.clientX - columnResizerStartX) > columnMinWidth) {
              this.columnResizerRect.left = event.clientX - tableContainerLeft;
            }
          }
        }
      },
      
      columnResizerHandlerMousedown({ event }) {
        if (this.isColumnResizerHover) {
          this.setIsColumnResizing(true);
          
          // 添加文档鼠标移动和释放事件监听器
          this.mousemoveListener = (e) => {
            this.setColumnResizerPositionByDrag(e);
          };
          this.mouseupListener = (e) => {
            this.columnResizerMouseup(e);
          };
          
          document.addEventListener("mousemove", this.mousemoveListener);
          document.addEventListener("mouseup", this.mouseupListener);
          
          // 禁止文本选择
          document.onselectstart = function () {
            return false;
          };
          document.ondragstart = function () {
            return false;
          };
        }
      },
      
      columnResizerMouseup(event) {
        const {
          isColumnResizing,
          currentResizingColumn,
          columnResizerStartX,
          setColumnWidth,
          columnWidthResizeOption,
          columnMinWidth
        } = this;
        
        if (!isColumnResizing || !currentResizingColumn) {
          return false;
        }
        
        let differWidth;
        // 拖动小于列最小宽度
        if (currentResizingColumn._realTimeWidth + (event.clientX - columnResizerStartX) < columnMinWidth) {
          differWidth = columnMinWidth - currentResizingColumn._realTimeWidth;
        } else {
          differWidth = event.clientX - columnResizerStartX;
        }
        differWidth = Math.floor(differWidth);
        
        // 偏差阈值，低于则不处理
        if (Math.abs(differWidth) > 1) {
          let nextColumnWidth = currentResizingColumn._realTimeWidth;
          nextColumnWidth += differWidth;
          
          // 设置列宽
          setColumnWidth({
            colKey: currentResizingColumn.key,
            width: nextColumnWidth
          });
          
          if (columnWidthResizeOption) {
            const { sizeChange } = columnWidthResizeOption;
            sizeChange && sizeChange({
              column: currentResizingColumn,
              differWidth,
              columnWidth: nextColumnWidth
            });
          }
        }
        
        this.clearColumnResizerStatus();
        // 移除事件监听器
        if (this.mousemoveListener) {
          document.removeEventListener("mousemove", this.mousemoveListener);
        }
        if (this.mouseupListener) {
          document.removeEventListener("mouseup", this.mouseupListener);
        }
      },
      
      clearColumnResizerStatus() {
        this.currentResizingColumn = null;
        this.columnResizerStartX = 0;
        this.setIsColumnResizerHover(false);
        this.setIsColumnResizing(false);
        
        // 启用文本选择
        document.onselectstart = function () {
          return true;
        };
        document.ondragstart = function () {
          return true;
        };
      }
    },
    render(h) {
      const {
        isColumnResizerHover,
        isColumnResizing,
        columnResizerRect,
        columnResizerHandlerWidth
      } = this;
      
      const { left, top, height } = columnResizerRect;
      
      // 列宽调整手柄
      const columnResizerHandler = h(
        "div",
        {
          class: {
            "column-resizer-handler": true,
            "active": isColumnResizerHover || isColumnResizing
          },
          style: {
            left: (left - columnResizerHandlerWidth) + "px",
            top: top + "px",
            height: height + "px"
          },
          on: {
            click: () => {},
            mousedown: (event) => {
              this.columnResizerHandlerMousedown({ event });
            },
            mouseenter: () => {
              this.setIsColumnResizerHover(true);
            },
            mouseleave: () => {
              this.setIsColumnResizerHover(false);
            },
            mouseup: (event) => {
              this.columnResizerMouseup(event);
            }
          }
        }
      );
      
      // 列宽调整线
      const columnResizerLine = h(
        "div",
        {
          class: ["column-resizer-line"],
          style: {
            display: isColumnResizing ? "block" : "none",
            left: left + "px"
          }
        }
      );
      
      // 容器
      return h(
        "div",
        {
          class: "column-resizer"
        },
        [columnResizerHandler, columnResizerLine]
      );
    }
  };
}
</script>

<style scoped>
.column-resizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.column-resizer-handler {
  position: absolute;
  width: 5px;
  cursor: col-resize;
  pointer-events: auto;
  background-color: transparent;
  transition: background-color 0.2s;
}

.column-resizer-handler:hover,
.column-resizer-handler.active {
  background-color: rgba(24, 144, 255, 0.3);
}

.column-resizer-line {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #1890ff;
  pointer-events: none;
  z-index: 101;
}
</style>