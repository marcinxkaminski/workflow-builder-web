class WorkflowElementError extends Error { }

const ID_ERROR_MESSAGE = 'Invalid workflow element\'s ID';
const NAME_ERROR_MESSAGE = 'Invalid workflow element\'s name';

export default class WorkflowElement {
  constructor({
    id, name, description = '', materialIcon = '', config = {},
  }) {
    if (!id) throw new WorkflowElementError(ID_ERROR_MESSAGE);
    if (!name) throw new WorkflowElementError(NAME_ERROR_MESSAGE);

    this.id = id;
    this.name = name;
    this.description = description;
    this.materialIcon = materialIcon;
    this.config = config;
  }
}
