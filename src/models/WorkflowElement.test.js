import WorkflowElement, * as we from './WorkflowElement';

describe('WORKFLOW ELEMENT', () => {
  it('has defined WorkflowElementError', async () => {
    expect(we.WorkflowElementError).toBeDefined();
  });

  it('has defined ID_ERROR_MESSAGE', async () => {
    expect(we.ID_ERROR_MESSAGE).toEqual('Invalid workflow element\'s ID');
  });

  it('has defined NAME_ERROR_MESSAGE', async () => {
    expect(we.NAME_ERROR_MESSAGE).toEqual('Invalid workflow element\'s name');
  });

  it('creates class object with default props', async () => {
    const mockId = 'mock-id';
    const mockName = 'mock-element-name';
    const element = new WorkflowElement({ id: mockId, name: mockName });

    expect(element.id).toEqual(mockId);
    expect(element.name).toEqual(mockName);
    expect(element.description).toBeDefined();
    expect(element.materialIcon).toBeDefined();
    expect(element.config).toBeDefined();
  });

  it('creates class object with all props', async () => {
    const mockId = 'mock-id';
    const mockName = 'mock-element-name';
    const mockDescription = 'mock-description';
    const mockMaterialIcon = 'mock-material-icon';
    const mockConfig = { someProp: 'mocked-config' };

    const element = new WorkflowElement({
      id: mockId,
      name: mockName,
      description: mockDescription,
      materialIcon: mockMaterialIcon,
      config: mockConfig,
    });

    expect(element.id).toEqual(mockId);
    expect(element.name).toEqual(mockName);
    expect(element.description).toEqual(mockDescription);
    expect(element.materialIcon).toEqual(mockMaterialIcon);
    expect(element.config).toEqual(mockConfig);
  });

  it('throws WorkflowElementError when no id passed', async () => {
    expect(() => new WorkflowElement({ name: 'mock-name' })).toThrow(we.WorkflowElementError);
  });

  it('throws WorkflowElementError when no name passed', async () => {
    expect(() => new WorkflowElement({ id: 'mock-id' })).toThrow(we.WorkflowElementError);
  });
});
