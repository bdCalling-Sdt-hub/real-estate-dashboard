/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Table, TablePaginationConfig } from "antd";
interface ScrollProps {
  x?: number;
  y?: number | "max";
}
interface ResTableProps {
  loading?: boolean;
  onTableChange?: () => void;
  column: any;
  data: any[];
  style?: React.CSSProperties;
  pagination?: false | TablePaginationConfig | undefined;
  theme?: Record<string, any>;
  scroll?: ScrollProps;
}

const ResTable = ({
  loading,
  onTableChange,
  column,
  data,
  style,
  pagination = false,
  theme,
  scroll,
}: ResTableProps) => {
  return (
    <ConfigProvider theme={theme}>
      <Table
        components={{
          header: {
            cell: (props: any) => {
              return (
                <th
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: "#0052B4",
                    color: "white",
                  }}
                />
              );
            },
          },
        }}
        style={style}
        loading={loading}
        columns={column}
        dataSource={data}
        pagination={pagination}
        onChange={onTableChange}
        scroll={scroll}
      ></Table>
    </ConfigProvider>
  );
};

export default ResTable;
