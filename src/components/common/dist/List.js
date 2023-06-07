"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
var antd_1 = require("antd");
var image_1 = require("next/image");
var Title = antd_1.Typography.Title;
var columns = [
    {
        key: 'sort',
        width: 20
    },
    {
        title: 'Thumbnails',
        dataIndex: 'thumbnails',
        render: function (text, record, index) { return (react_1["default"].createElement(image_1["default"], { src: record.thumbnails, alt: "thumbnails", width: '256', height: '144', style: { borderRadius: '8px' } })); },
        width: 320
    },
    {
        title: 'Title',
        dataIndex: 'title',
        render: function (text, record, index) {
            return (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Title, { level: 3 }, text),
                react_1["default"].createElement(Title, { level: 4 }, record.videoOwnerChannelTitle)));
        }
    },
];
var Row = function (_a) {
    var _b;
    var children = _a.children, props = __rest(_a, ["children"]);
    var _c = sortable_1.useSortable({
        id: props['data-row-key']
    }), attributes = _c.attributes, listeners = _c.listeners, setNodeRef = _c.setNodeRef, setActivatorNodeRef = _c.setActivatorNodeRef, transform = _c.transform, transition = _c.transition, isDragging = _c.isDragging;
    var style = __assign(__assign(__assign({}, props.style), { transform: (_b = utilities_1.CSS.Transform.toString(transform && __assign(__assign({}, transform), { scaleY: 1 }))) === null || _b === void 0 ? void 0 : _b.replace(/translate3d\(([^,]+),/, 'translate3d(0,'), transition: transition }), (isDragging ? { position: 'relative', zIndex: 9999 } : {}));
    return (react_1["default"].createElement("tr", __assign({}, props, { ref: setNodeRef, style: style }, attributes), react_1["default"].Children.map(children, function (child) {
        if (child.key === 'sort') {
            return react_1["default"].cloneElement(child, {
                children: (react_1["default"].createElement(icons_1.MenuOutlined, __assign({ ref: setActivatorNodeRef, style: { touchAction: 'none', cursor: 'move' } }, listeners)))
            });
        }
        return child;
    })));
};
var List = function (_a) {
    var data = _a.data, from = _a.from;
    var _b = react_1.useState(data), dataSource = _b[0], setDataSource = _b[1];
    var onDragEnd = function (_a) {
        var active = _a.active, over = _a.over;
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
            setDataSource(function (previous) {
                var activeIndex = previous.findIndex(function (i) { return i.key === active.id; });
                var overIndex = previous.findIndex(function (i) { return i.key === (over === null || over === void 0 ? void 0 : over.id); });
                return sortable_1.arrayMove(previous, activeIndex, overIndex);
            });
        }
    };
    return (react_1["default"].createElement(core_1.DndContext, { onDragEnd: onDragEnd },
        react_1["default"].createElement(sortable_1.SortableContext
        // rowKey array
        , { 
            // rowKey array
            items: dataSource.map(function (i) { return i.key; }), strategy: sortable_1.verticalListSortingStrategy },
            react_1["default"].createElement(antd_1.Table, { components: {
                    body: {
                        row: Row
                    }
                }, rowKey: "key", columns: columns, dataSource: dataSource, showHeader: false }))));
};
exports["default"] = List;
