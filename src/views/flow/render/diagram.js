'use strict'
import { Inspector } from './inspector.js'

var go = require('gojs')
var goInstance = go.GraphObject.make

export function FlowDiagram (diagramDivId) {
  var _flowDiagram = {}

  this.show = function (flowData) {
    if (!flowData) {
      return
    }
    _flowDiagram.model = go.Model.fromJson(flowData)
  }

  this.load = function () {
    return _flowDiagram.model.toJson()
  }

  this.setReadOnly = function () {
    _flowDiagram.isReadOnly = true
  }

  this.reset = function () {
    _flowDiagram.model.modelData = {}
    _flowDiagram.model.nodeDataArray = []
    _flowDiagram.model.linkDataArray = []
  }

  this.check = function () {
    var errorMsg = ''
    if (!_flowDiagram.model.nodeDataArray) return '请绘制流程图'
    return errorMsg
  }

  this.makeSvg = function () {
    var svg = _flowDiagram.makeSvg({
      scale: 0.8,
      background: 'rgba(0, 255, 0, 0.5)'
    })
    svg.style.border = '1px solid black'
    return svg
  }

  this.createPalette = function (paletteDivId, paletteData) {
    return goInstance(
      go.Palette,
      paletteDivId, // must name or refer to the DIV HTML element
      {
        scrollsPageOnFocus: true,
        nodeTemplateMap: _flowDiagram.nodeTemplateMap, // share the templates used by leiseDiagram
        model: new go.GraphLinksModel(paletteData),
        layout: goInstance(go.GridLayout)
      }
    )
  }

  this.createModelInspector = function (modelInspectorDivId, isReadOnly) {
    var modelInspector = new Inspector(modelInspectorDivId, _flowDiagram, {
      inspectSelection: false,
      properties: {
        flowModelId: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        moduleId: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        moduleName: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        flowId: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        flowName: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        flowVersion: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        requestUrl: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        status: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        createTime: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        modifyTime: {
          readOnly: isReadOnly,
          show: Inspector.showIfPresent
        },
        flowInfoId: {
          show: false
        },
        moduleInfoId: {
          show: false
        }
      }
    })
    modelInspector.inspectObject(_flowDiagram.model.modelData)
  }

  this.createActionInspector = function (actionInspectorDivId) {
    var actionInspector = new Inspector(actionInspectorDivId, _flowDiagram, {
      // uncomment this line to only inspect the named properties below instead of all properties on each object:
      // includesOwnProperties: false,
      properties: {
        actionId: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        actionName: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        groupId: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        category: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        refClass: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        key: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        text: {},
        newTransation: {
          show: Inspector.showIfPresent,
          type: 'select',
          choices: ['true', 'false']
        },
        operSql: {
          show: Inspector.showIfPresent
        },
        querySql: {
          show: Inspector.showIfPresent
        },
        queryCount: {
          show: Inspector.showIfPresent,
          type: 'select',
          choices: ['true', 'false']
        },
        countSql: {
          show: Inspector.showIfPresent
        },
        pageSql: {
          show: Inspector.showIfPresent
        },
        sourceNames: {
          show: Inspector.showIfPresent
        },
        targetNames: {
          show: Inspector.showIfPresent
        },
        listOperationType: {
          show: Inspector.showIfPresent,
          type: 'select',
          choices: ['add', 'addAll']
        },
        mapOperationType: {
          show: Inspector.showIfPresent,
          type: 'select',
          choices: ['put', 'remove', 'get', 'putAll']
        },
        keyNames: {
          show: Inspector.showIfPresent
        },
        mapName: {
          show: Inspector.showIfPresent
        },
        desc: {
          readOnly: true,
          show: Inspector.showIfPresent
        },
        dateFormat: {
          show: Inspector.showIfPresent,
          type: 'select',
          choices: ['yyyyMMddHHmmss', 'yyyyMMdd']
        },
        // key would be automatically added for nodes, but we want to declare it read-only also:

        // color would be automatically added for nodes, but we want to declare it a color also:
        color: {
          show: Inspector.showIfPresent,
          type: 'color'
        }
        // // Comments and LinkComments are not in any node or link data (yet), so we add them here:
        // 'Comments': {
        //   show: Inspector.showIfNode
        // },
        // 'LinkComments': {
        //   show: Inspector.showIfLink
        // },
        // 'isGroup': {
        //   readOnly: true,
        //   show: Inspector.showIfPresent
        // },
        // 'flag': {
        //   show: Inspector.showIfNode,
        //   type: 'checkbox'
        // },
        // 'state': {
        //   show: Inspector.showIfNode,
        //   type: 'select',
        //   choices: function (node, propName) {
        //     if (Array.isArray(node.data.choices)) return node.data.choices
        //     return ['one', 'two', 'three', 'four', 'five']
        //   }
        // },
        // 'choices': {
        //   show: false
        // }, // must not be shown at all
        // // an example of specifying the  type
        // 'password': {
        //   show: Inspector.showIfPresent,
        //   type: 'password'
        // }
      }
    })
  }

  createInstance(diagramDivId)

  function createInstance (divId) {
    _flowDiagram = goInstance(
      go.Diagram,
      divId, // must name or refer to the DIV HTML element
      {
        // 设置画布栅栏
        grid: goInstance(
          go.Panel,
          'Grid',
          goInstance(go.Shape, 'LineH', {
            stroke: 'lightgray',
            strokeWidth: 0.5
          }),
          goInstance(go.Shape, 'LineH', {
            stroke: 'gray',
            strokeWidth: 0.5,
            interval: 10
          }),
          goInstance(go.Shape, 'LineV', {
            stroke: 'lightgray',
            strokeWidth: 0.5
          }),
          goInstance(go.Shape, 'LineV', {
            stroke: 'gray',
            strokeWidth: 0.5,
            interval: 10
          })
        ),
        // 自动动画展示 可能会影响性能
        'animationManager.isEnabled': true,
        initialContentAlignment: go.Spot.Center,
        allowDrop: true, // must be true to accept drops from the Palette
        allowTextEdit: true,
        LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: showLinkLabel,
        scrollsPageOnFocus: false,
        'draggingTool.isGridSnapEnabled': true,
        'resizingTool.isGridSnapEnabled': true,
        'undoManager.isEnabled': true, // enable undo & redo
        // 允许使用ctrl+c、ctrl+v复制粘贴
        'commandHandler.copiesTree': true
      }
    )

    _flowDiagram.addDiagramListener('Modified', onModifiedDiagramListener)

    function onModifiedDiagramListener (e) {
      var button = document.getElementById('SaveButton')
      if (button) button.disabled = !_flowDiagram.isModified
      var idx = document.title.indexOf('*')
      if (_flowDiagram.isModified) {
        if (idx < 0) document.title += '*'
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx)
      }
    }

    _flowDiagram.linkTemplate = goInstance(
      go.Link, // the whole link panel
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 10,
        toShortLength: 8,
        // relinkableFrom: true,
        // relinkableTo: true,
        // reshapable: true,
        // resegmentable: true,
        // mouse-overs subtly highlight links:
        mouseEnter: function (e, link) {
          link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)'
        },
        mouseLeave: function (e, link) {
          link.findObject('HIGHLIGHT').stroke = 'transparent'
        }
      },
      new go.Binding('points').makeTwoWay(),
      goInstance(
        go.Shape, // the highlight shape, normally transparent
        {
          isPanelMain: true,
          strokeWidth: 8,
          stroke: 'transparent',
          name: 'HIGHLIGHT'
        }
      ),
      goInstance(
        go.Shape, // the link path shape
        {
          isPanelMain: true,
          stroke: 'gray',
          strokeWidth: 2
        }
      ),
      goInstance(
        go.Shape, // the arrowhead
        {
          toArrow: 'standard',
          stroke: null,
          fill: 'gray'
        }
      ),
      goInstance(
        go.Panel,
        'Auto', // the link label, normally not visible
        {
          visible: false,
          name: 'LABEL',
          segmentIndex: 2,
          segmentFraction: 0.5
        },
        new go.Binding('visible', 'visible').makeTwoWay(),
        goInstance(
          go.Shape,
          'RoundedRectangle', // the label shape
          {
            fill: '#F8F8F8',
            stroke: null
          }
        ),
        goInstance(
          go.TextBlock,
          'transition', // the label
          {
            name: 'Label',
            textAlign: 'center',
            font: '10pt helvetica, arial, sans-serif',
            stroke: '#333333',
            editable: true
          },
          new go.Binding('text', 'text').makeTwoWay()
        )
      )
    )

    var databaseNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      goInstance(
        go.Panel,
        'Auto',
        goInstance(go.Shape, 'DATABASE', {
          minSize: new go.Size(40, 40),
          fill: '#400080',
          stroke: null,
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer'
        }),
        goInstance(
          go.TextBlock,
          {
            font: 'bold 10pt Helvetica, Arial, sans-serif',
            stroke: '#ffffff',
            maxSize: new go.Size(60, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            isMultiline: true
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // four named ports, one on each side:
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, true, true),
      makePort('R', go.Spot.Right, true, true),
      makePort('B', go.Spot.Bottom, true, false)
    )

    var startActionNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      goInstance(
        go.Panel,
        'Auto',
        goInstance(go.Shape, 'Circle', {
          minSize: new go.Size(40, 40),
          fill: '#79C900',
          stroke: null
        }),
        goInstance(
          go.TextBlock,
          'Start',
          {
            font: 'bold 11pt Helvetica, Arial, sans-serif',
            stroke: '#000000'
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // three named ports, one on each side except the top, all output only:
      makePort('L', go.Spot.Left, true, false),
      makePort('R', go.Spot.Right, true, false),
      makePort('B', go.Spot.Bottom, true, false)
    )

    var endActionNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      goInstance(
        go.Panel,
        'Auto',
        goInstance(go.Shape, 'Circle', {
          minSize: new go.Size(40, 40),
          fill: '#DC3C00',
          stroke: null
        }),
        goInstance(
          go.TextBlock,
          'End',
          {
            font: 'bold 11pt Helvetica, Arial, sans-serif',
            stroke: '#000000'
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // three named ports, one on each side except the bottom, all input only:
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, false, true),
      makePort('R', go.Spot.Right, false, true)
    )

    var commentActionNodeTemplate = goInstance(
      go.Node,
      'Auto',
      nodeStyle(),
      goInstance(go.Shape, 'File', {
        fill: '#EFFAB4',
        stroke: null
      }),
      goInstance(
        go.TextBlock,
        {
          margin: 5,
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          textAlign: 'center',
          editable: true,
          font: 'bold 12pt Helvetica, Arial, sans-serif',
          stroke: '#454545'
        },
        new go.Binding('text').makeTwoWay()
      )
      // no ports, because no links are allowed to connect with a comment
    )

    var jumpActionNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      goInstance(
        go.Panel,
        'Auto',
        goInstance(go.Shape, 'Diamond', {
          fill: '#00A9C9',
          stroke: null
        }),
        goInstance(
          go.TextBlock,
          {
            margin: 8,
            font: 'bold 10pt Helvetica, Arial, sans-serif',
            stroke: '#000000',
            maxSize: new go.Size(80, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // four named ports, one on each side:
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, true, true),
      makePort('R', go.Spot.Right, true, true),
      makePort('B', go.Spot.Bottom, true, false)
    )

    // cache
    var cacheActionNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      goInstance(
        go.Panel,
        'Auto',
        goInstance(
          go.Shape,
          'Cylinder3',
          {
            fill: '#00A9C9',
            stroke: null
          },
          new go.Binding('figure', 'figure')
        ),
        goInstance(
          go.TextBlock,
          {
            margin: 8,
            font: 'bold 10pt Helvetica, Arial, sans-serif',
            stroke: '#000000',
            maxSize: new go.Size(90, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // four named ports, one on each side:
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, true, true),
      makePort('R', go.Spot.Right, true, true),
      makePort('B', go.Spot.Bottom, true, false)
    )

    // other
    var otherActionNodeTemplate = goInstance(
      go.Node,
      'Spot',
      nodeStyle(),
      // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
      goInstance(
        go.Panel,
        'Auto',
        goInstance(
          go.Shape,
          'Rectangle',
          {
            fill: '#00A9C9',
            stroke: null
          },
          new go.Binding('figure', 'figure')
        ),
        goInstance(
          go.TextBlock,
          {
            margin: 8,
            font: 'bold 10pt Helvetica, Arial, sans-serif',
            stroke: '#000000',
            maxSize: new go.Size(90, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding('text').makeTwoWay()
        ),
        {
          // this tooltip Adornment is shared by all nodes
          toolTip: goInstance(
            go.Adornment,
            'Auto',
            goInstance(go.Shape, {
              fill: '#FFFFCC'
            }),
            goInstance(
              go.TextBlock,
              {
                margin: 4
              }, // the tooltip shows the result of calling nodeInfo(data)
              new go.Binding('text', '', nodeInfo)
            )
          ),
          // 绑定上下文菜单
          contextMenu: makePartContextMenu()
        }
      ),
      // four named ports, one on each side:
      makePort('T', go.Spot.Top, false, true),
      makePort('L', go.Spot.Left, true, true),
      makePort('R', go.Spot.Right, true, true),
      makePort('B', go.Spot.Bottom, true, false)
    )

    var nodeTemplateMap = new go.Map('string', go.node)
    nodeTemplateMap.add('DATABASE', databaseNodeTemplate)
    nodeTemplateMap.add('FLOW_START', startActionNodeTemplate)
    nodeTemplateMap.add('FLOW_END', endActionNodeTemplate)
    nodeTemplateMap.add('FLOW_JUMP', jumpActionNodeTemplate)
    nodeTemplateMap.add('OPERATION', otherActionNodeTemplate)
    nodeTemplateMap.add('ENCRYPT', otherActionNodeTemplate)
    nodeTemplateMap.add('CommentAction', commentActionNodeTemplate)
    nodeTemplateMap.add('CACHE', cacheActionNodeTemplate)
    nodeTemplateMap.add('OTHER', otherActionNodeTemplate)
    _flowDiagram.nodeTemplateMap = nodeTemplateMap

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    _flowDiagram.toolManager.linkingTool.temporaryLink.routing =
      go.Link.Orthogonal
    _flowDiagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal

    // load() // load an initial diagram from some JSON text

    _flowDiagram.select(_flowDiagram.nodes.first())

    /**
     * tooltip上显示的信息
     * @param d
     * @returns {string}
     */
    function nodeInfo (d) {
      return '双击或单击右键可编辑'
    }

    /**
     * 右键菜单
     * @returns {*}
     */
    function makePartContextMenu () {
      return goInstance(
        go.Adornment,
        'Vertical',
        makeMenuItem('编辑', function (e, obj) {
          // OBJ is this Button
          var contextmenu = obj.part // the Button is in the context menu Adornment
          var part = contextmenu.adornedPart // the adornedPart is the Part that the context menu adorns
          // now can do something with PART, or with its data, or with the Adornment (the context menu)
          // showEditNode(part)
        }),
        makeMenuItem(
          '剪切',
          function (e, obj) {
            e.diagram.commandHandler.cutSelection()
          },
          function (o) {
            return o.diagram.commandHandler.canCutSelection()
          }
        ),
        makeMenuItem(
          '复制',
          function (e, obj) {
            e.diagram.commandHandler.copySelection()
          },
          function (o) {
            return o.diagram.commandHandler.canCopySelection()
          }
        ),
        makeMenuItem(
          '删除',
          function (e, obj) {
            e.diagram.commandHandler.deleteSelection()
          },
          function (o) {
            return o.diagram.commandHandler.canDeleteSelection()
          }
        )
      )
    }

    /**
     * 生成右键菜单项
     * @param text
     * @param action
     * @param visiblePredicate
     * @returns {*}
     */
    function makeMenuItem (text, action, visiblePredicate) {
      return goInstance(
        'ContextMenuButton',
        goInstance(go.TextBlock, text, {
          margin: 5,
          textAlign: 'left',
          stroke: '#555555'
        }),
        {
          click: action
        },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate
          ? new go.Binding('visible', '', visiblePredicate).ofObject()
          : {}
      )
    }

    // helper definitions for node templates
    function nodeStyle () {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
          // isShadowed: true,
          // shadowColor: "#888",
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function (e, obj) {
            showPorts(obj.part, true)
          },
          mouseLeave: function (e, obj) {
            showPorts(obj.part, false)
          }
        }
      ]
    }

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
    function showLinkLabel (e) {
      var label = e.subject.findObject('LABEL')
      console.log(label)
      if (label !== null) {
        // label.visible = e.subject.fromNode.data.figure === 'Diamond'
        label.visible = e.subject.fromNode.data.category === 'FLOW_JUMP'
      }
    }

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort (name, spot, output, input) {
      // the port is basically just a small circle that has a white stroke when it is made visible
      return goInstance(go.Shape, 'Circle', {
        fill: 'transparent',
        stroke: null, // this is changed to "white" in the showPorts function
        desiredSize: new go.Size(7, 7),
        alignment: spot,
        alignmentFocus: spot, // align the port on the main Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: 'pointer' // show a different cursor to indicate potential link point
      })
    }

    // Make all ports on a node visible when the mouse is over the node
    function showPorts (node, show) {
      var diagram = node.diagram
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) return
      node.ports.each(function (port) {
        port.stroke = show ? 'white' : null
      })
    }
  }

  return this
}
