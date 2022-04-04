import { CellListItemProps } from './cell-list-item-props';

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return <div>{cell.id}</div>;
};

export default CellListItem;
