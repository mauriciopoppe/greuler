import Graph from '@mauriciopoppe/graph'

export class GraphManager extends Graph {
  constructor(opts) {
    super(opts)
    //
    // if (!'owner' in opts) {
    //   throw new Error('opts should have the property `owner`')
    // }
  }
}
