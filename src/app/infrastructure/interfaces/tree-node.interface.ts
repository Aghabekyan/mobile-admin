import {TreeNode} from '../../../../node_modules/primeng/api';

export interface ITreeNode extends TreeNode {
  id: number;
  parentCategoryID: number;
  natureType: number;
  children?: ITreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  parent?: ITreeNode;
}
