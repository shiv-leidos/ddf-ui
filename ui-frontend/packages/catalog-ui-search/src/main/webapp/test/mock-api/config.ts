export default {
  mapHome: '',
  resultCount: 250,
  showIngest: true,
  showLogo: false,
  listTemplates: [],
  relevancePrecision: 5,
  attributeDescriptions: {},
  zoomPercentage: 100,
  basicSearchTemporalSelectionDefault: [
    'created',
    'effective',
    'modified',
    'metacard.created',
    'metacard.modified',
  ],
  branding: 'DDF',
  showWelcome: true,
  autoMergeTime: 16,
  basicSearchMatchType: 'datatype',
  onlineGazetteer: true,
  imageryProviders: [
    {
      type: 'SI',
      url: './images/natural_earth_50m.png',
      parameters: {
        imageSize: [10800, 5400],
      },
      alpha: 1,
      name: 'Default Layer',
      show: true,
      proxyEnabled: true,
      order: 0,
    },
  ],
  isCacheDisabled: false,
  isVersioningEnabled: true,
  isMetacardPreviewDisabled: false,
  customBackgroundAccentContent: '#2A2A2E',
  customNegativeColor: '#8a423c',
  isHistoricalSearchDisabled: false,
  summaryShow: ['created', 'modified', 'thumbnail'],
  readOnly: [
    '^checksum$',
    '^checksum-algorithm$',
    '^id$',
    '^resource-download-url$',
    '^resource-uri$',
    '^resource.derived-uri$',
    '^resource.derived-download-url$',
    '^modified$',
    '^metacard-tags$',
    '^metacard-type$',
    '^metadata$',
    '^source-id$',
    '^point-of-contact$',
    '^metacard.',
    '^version.',
    '^validation.',
  ],
  version: '2.14.0-SNAPSHOT',
  i18n: {
    'sources.unavailable':
      '{amountDown} {amountDown, plural, one {source is} other {sources are}} currently down',
    'sources.polling.error.title': 'Error Polling Sources',
    'search.sources.selected.none.message':
      'No sources are currently selected. Edit the search and select at least one source.',
    'sources.available': 'All sources are currently up',
    'sources.title': 'Sources',
    'sources.polling.error.message':
      'Unable to query server for list of active sources',
    'sources.options.all': 'All Sources',
    'form.title': 'title',
  },
  queryFeedbackEmailSubjectTemplate: 'Query Feedback from {{username}}',
  customBackgroundModal: '#252529',
  isExperimental: false,
  queryFeedbackEmailBodyTemplate:
    '<h2>Query Feedback</h2><p><br><b>Authenticated User</b>: {{{auth_username}}}<br><br><b>User</b>: {{{username}}}<br><br><b>Email</b>: {{{email}}}<br><br><b>Workspace</b>: {{{workspace_name}}} ({{{workspace_id}}})<br><br><b>Query</b>: {{{query}}}<br><br><b>Query time</b>: {{{query_initiated_time}}}<br><br><b>Query status</b>: {{{query_status}}}<br><br><b>Comments</b>: {{{comments}}}<br><br><b>Query_results</b>: <pre>{{{query_results}}}</pre></p>',
  resultPageSize: 25,
  sourcePollInterval: 60000,
  customBackgroundContent: '#35353a',
  requiredAttributes: [],
  customWarningColor: '#c89600',
  scheduleFrequencyList: [1800, 3600, 7200, 14400, 28800, 57600, 86400],
  facetWhitelist: [],
  terrainProvider: {
    type: 'CT',
    url: './proxy/catalog0',
  },
  customBackgroundDropdown: '#35353a',
  hiddenAttributes: ['^sorts$', '^cql$', '^polling$', '^cached$'],
  timeout: 300000,
  attributeAliases: {},
  commonAttributes: [],
  enums: {},
  queryFeedbackEnabled: false,
  editorAttributes: [],
  resultShow: [],
  spacingMode: 'comfortable',
  disableUnknownErrorBox: false,
  theme: 'dark',
  customPrimaryColor: '#3c6dd5',
  projection: 'EPSG:4326',
  defaultLayout: [
    {
      type: 'stack',
      content: [
        {
          type: 'component',
          component: 'cesium',
          componentName: 'cesium',
          title: '3D Map',
        },
        {
          type: 'component',
          component: 'inspector',
          componentName: 'inspector',
          title: 'Inspector',
        },
      ],
    },
  ],
  webSocketsEnabled: false,
  showRelevanceScores: false,
  customPositiveColor: '#428442',
  product: 'Intrigue',
  customFavoriteColor: '#d1d179',
  typeNameMapping: {},
  gazetteer: true,
  showTask: false,
  exportResultLimit: 1000,
  bingKey: '',
  isArchiveSearchDisabled: false,
  useHyphensInUuid: false,
  disableLocalCatalog: false,
  customBackgroundNavigation: '#252529',
  customBackgroundSlideout: '#252529',
}
