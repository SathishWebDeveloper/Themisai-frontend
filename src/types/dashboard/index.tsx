export interface IDashboardCardData {
  value: string;
  imagesrc: JSX.Element;
  count: number | JSX.Element;
  color: string;
  backgroundColor: string;
}
export interface IDashboardDownloadReport {
  icons: string;
  value: string;
  subtext: string;
  Downloadicon: JSX.Element;
}

export interface IDashboardQuicklinks {
  value: string;
}

export interface IDashboardData {
  value: any;
  label: any;
}

export interface IDashboardsize {
  width: number;
  height: number;
}

export interface IFeatureCardData {
  title: string;
  content: string;
  rating: number;
  icons: JSX.Element | any;
}

export interface DataTableProps {
  tableData: any[];
  columns: any[];
  className?: string;
}