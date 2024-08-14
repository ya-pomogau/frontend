export interface IBottomBarProps {
  extClassName?: string;
}

export const BottomBar = ({ extClassName }: IBottomBarProps) => (
  <div className={extClassName} />
);
