import React, {useState} from 'react';

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s,
            _e,
            _x,
            _r,
            _arr = [],
            _n = !0,
            _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) ;
        } catch (err) {
            _d = !0, _e = err;
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function DragElement(props) {
    var onDragEnd = props.onDragEnd,
        _props$data = props.data,
        data = _props$data === void 0 ? [] : _props$data,
        MoveItem = props.MoveItem,
        _props$backgroundStyl = props.backgroundStyle,
        backgroundStyle = _props$backgroundStyl === void 0 ? {
            display: "flex",
            flexDirection: "column",
            background: "lightgray",
            width: "300px",
            padding: "16px"
        } : _props$backgroundStyl,
        _props$backgroundItem = props.backgroundItemStyle,
        backgroundItemStyle = _props$backgroundItem === void 0 ? {
            margin: "10px",
            background: "gray",
            transition: "all 3s ease",
            padding: "16px"
        } : _props$backgroundItem;
    var _useState = useState(data),
        _useState2 = _slicedToArray(_useState, 2),
        list = _useState2[0],
        setList = _useState2[1];
    var handleAllow = function handleAllow(e) {
        e = e || event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    };
    return /*#__PURE__*/React.createElement("div", {
        style: backgroundStyle ? backgroundStyle : {}
    }, list.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
            style: backgroundItemStyle ? backgroundItemStyle : {},
            key: index,
            draggable: true,
            onDragStart: function onDragStart(e) {
                var _e$target;
                e.dataTransfer.setData("name", item);
                e.dataTransfer.setData("startIndex", (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.getAttribute("data-index"));
            },
            "data-index": index,
            onDragOver: handleAllow,
            onDragEnter: handleAllow,
            onDrop: function onDrop(e) {
                var _e$target2;
                var targetIndex = Number((_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.getAttribute("data-index"));
                var startIndex = Number(e.dataTransfer.getData("startIndex"));
                var result = Array.from(list);
                var _result$splice = result.splice(startIndex, 1),
                    _result$splice2 = _slicedToArray(_result$splice, 1),
                    remove = _result$splice2[0];
                result.splice(targetIndex, 0, remove);
                setList(result);
                onDragEnd(result, startIndex, targetIndex);
            }
        }, MoveItem(item));
    }));
}

export {DragElement};
