window.exclude = [];
window.watch = true;
window.environment = 'release';
window.localMode = 'build';

window.appConfig = {
  showDebugger: false,
  showExperimentalFeatures: false,
  workspaces: [
    {
      id: 'local',
      label: 'local',
      projectGraphUrl: 'project-graph.json',
      taskGraphUrl: 'task-graph.json',
      taskInputsUrl: 'task-inputs.json',
      sourceMapsUrl: 'source-maps.json'
    }
  ],
  defaultWorkspaceId: 'local',
};
// trimmed: large projectGraphResponse removed for tools copy
