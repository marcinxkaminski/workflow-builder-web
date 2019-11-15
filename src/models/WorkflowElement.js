export class WorkflowElementError extends Error { }

export const ID_ERROR_MESSAGE = 'Invalid workflow element\'s ID';
export const NAME_ERROR_MESSAGE = 'Invalid workflow element\'s name';

export default class WorkflowElement {
  constructor({
    id, name, description = null, materialIcon = null, config = null,
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
