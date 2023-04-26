"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var react_youtube_1 = require("react-youtube");
var partyListContext_1 = require("@/context/partyListContext");
var antd_2 = require("antd");
var tb_1 = require("react-icons/tb");
var secToMin_1 = require("@/utils/secToMin");
var styled_components_1 = require("styled-components");
var devices_1 = require("@/utils/devices");
var image_1 = require("next/image");
var Text = antd_2.Typography.Text;
var StyledButton = styled_components_1["default"](antd_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 18px;\n  color: ", ";\n"], ["\n  font-size: 18px;\n  color: ",
    ";\n"])), function (props) {
    return props.isActive ? props.theme.antd.colorPrimary : 'inherit';
});
var StyledBigButton = styled_components_1["default"](antd_1.Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-content: center;\n  font-size: 32px;\n  height: auto;\n"], ["\n  display: flex;\n  align-content: center;\n  font-size: 32px;\n  height: auto;\n"])));
var StyledSlider = styled_components_1["default"](antd_1.Slider)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  /* width: 99vw;\n  margin-left: -50px;\n  position: absolute;\n  top: -4px;\n  padding-top: 0px; */\n"], ["\n  /* width: 99vw;\n  margin-left: -50px;\n  position: absolute;\n  top: -4px;\n  padding-top: 0px; */\n"])));
var StyledDuration = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: none;\n  @media ", " {\n    display: initial;\n  }\n"], ["\n  display: none;\n  @media ", " {\n    display: initial;\n  }\n"])), devices_1["default"].laptop);
var opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0
    }
};
var MusicPlayer = function () {
    var _a = react_1.useState(false), isPlay = _a[0], setIsPlay = _a[1];
    var _b = react_1.useState(false), isRepeat = _b[0], setIsRepeat = _b[1];
    var _c = react_1.useState(false), isRepeatOne = _c[0], setIsRepeatOne = _c[1];
    var _d = react_1.useState(false), isShuffle = _d[0], setIsShuffle = _d[1];
    var _e = react_1.useState(null), player = _e[0], setPlayer = _e[1];
    var _f = react_1.useState(''), currentVideoData = _f[0], setCurrentVideoData = _f[1];
    var _g = react_1.useState({ value: 0, max: 0 }), progress = _g[0], setProgress = _g[1];
    var _h = react_1.useState(undefined), timeoutId = _h[0], setTimeoutId = _h[1];
    var _j = react_1.useState(false), isTooltipVisible = _j[0], setIsTooltipVisible = _j[1];
    var _k = react_1.useState(''), currentVideoThumbnails = _k[0], setCurrentVideoThumbnails = _k[1];
    var playerRef = react_1.useRef(null);
    var playlist = react_1.useContext(partyListContext_1.partyListContext).playlist;
    var play = function () {
        var _a;
        if (!player)
            return;
        (_a = playerRef.current) === null || _a === void 0 ? void 0 : _a.getInternalPlayer().playVideo();
    };
    var pause = function () {
        if (!player)
            return;
        player === null || player === void 0 ? void 0 : player.pauseVideo();
        setIsPlay(false);
    };
    var next = function () {
        if (!player)
            return;
        player === null || player === void 0 ? void 0 : player.nextVideo();
    };
    var previous = function () {
        if (!player)
            return;
        player === null || player === void 0 ? void 0 : player.previousVideo();
    };
    var setRepeat = function (bool) {
        if (!player)
            return;
        setIsRepeat(bool);
        player === null || player === void 0 ? void 0 : player.setLoop(bool);
    };
    var setShuffle = function (bool) {
        if (!player)
            return;
        setIsShuffle(function (pre) {
            return !pre;
        });
        player === null || player === void 0 ? void 0 : player.setShuffle(bool);
    };
    var setRepeatOne = function (bool) {
        setIsRepeatOne(function (pre) { return !pre; });
    };
    var onPlayerReady = function (event) {
        setPlayer(function () { return event.target; });
    };
    var onPlay = function () {
        setCurrentVideoData(player.getVideoData());
        setCurrentVideoThumbnails(getSrcById(player.getVideoData().video_id));
        setIsPlay(true);
        updateDuration();
        listenCurrentTime();
    };
    var updateDuration = function () {
        setProgress(function (progress) { return (__assign(__assign({}, progress), { max: player.getDuration() })); });
    };
    var listenCurrentTime = function () {
        window.clearInterval(timeoutId);
        var id = window.setInterval(function () {
            setProgress(function (progress) { return (__assign(__assign({}, progress), { value: player.getCurrentTime() })); });
        }, 1000);
        setTimeoutId(id);
    };
    var getSrcById = function (id) {
        return playlist.find(function (e) { return e.videoId === id; }).thumbnails;
    };
    var setVolume = function (value) {
        player.setVolume(value);
    };
    var setTimeAt = function (value) {
        player.seekTo(value);
    };
    react_1.useEffect(function () {
        if (!player || !player.i)
            return;
        if (playlist.length < 1) {
            player.loadPlaylist('', 0);
            player.seekTo(0);
            player.stopVideo();
            setCurrentVideoData('');
        }
        try {
            player.cuePlaylist({
                playlist: playlist.map(function (e) { return e.videoId; })
            });
            player.pauseVideo();
        }
        catch (error) {
            console.log(error);
        }
    }, [playlist, player]);
    react_1.useEffect(function () {
        if (isRepeatOne && progress.max - progress.value <= 1) {
            setProgress(function () { return ({
                value: 0,
                max: player.getDuration()
            }); });
            player.seekTo(0, true);
            player.playVideo();
        }
    }, [progress, player, isRepeatOne]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { onMouseEnter: function () { return setIsTooltipVisible(true); }, onMouseLeave: function () { return setIsTooltipVisible(false); } },
            react_1["default"].createElement(StyledSlider, { value: progress.value, max: progress.max, style: {
                    width: '100vw',
                    position: 'absolute',
                    paddingTop: '0px',
                    margin: '0'
                }, tooltip: {
                    formatter: function (value) { return secToMin_1.secToMin(value); },
                    open: isTooltipVisible
                }, handleStyle: { top: '-4px' }, onAfterChange: function (value) { return setTimeAt(value); } })),
        react_1["default"].createElement("div", { style: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            } },
            react_1["default"].createElement("div", { style: {
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1 0'
                } },
                react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return previous(); } },
                    react_1["default"].createElement(tb_1.TbPlayerSkipBackFilled, null)),
                isPlay ? (react_1["default"].createElement(StyledBigButton, { type: "text", onClick: function () { return pause(); } },
                    react_1["default"].createElement(tb_1.TbPlayerPauseFilled, null))) : (react_1["default"].createElement(StyledBigButton, { type: "text", onClick: function () { return play(); } },
                    react_1["default"].createElement(tb_1.TbPlayerPlayFilled, null))),
                react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return next(); } },
                    react_1["default"].createElement(tb_1.TbPlayerSkipForwardFilled, null)),
                react_1["default"].createElement("div", null),
                currentVideoData && (react_1["default"].createElement(StyledDuration, null,
                    secToMin_1.secToMin(progress.value),
                    " / ",
                    secToMin_1.secToMin(progress.max)))),
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    flex: '3 3 200px',
                    overflow: 'hidden'
                } }, currentVideoData && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(image_1["default"], { src: currentVideoThumbnails, alt: "thumbnails", width: '64', height: '36', style: { margin: '0 10px' } }),
                react_1["default"].createElement("div", { style: { flexDirection: 'column', display: 'flex' } },
                    react_1["default"].createElement(Text, { strong: true, style: {
                            fontSize: '18px',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        } }, currentVideoData.title),
                    react_1["default"].createElement(Text, null,
                        " ",
                        currentVideoData.author))))),
            react_1["default"].createElement("div", { style: {
                    display: 'flex',
                    flex: '0 1 10px',
                    justifyContent: 'center'
                } },
                react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return setRepeatOne(true); }, isActive: isRepeatOne },
                    react_1["default"].createElement(tb_1.TbRepeatOnce, null)),
                isRepeat ? (react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return setRepeat(false); } },
                    react_1["default"].createElement(tb_1.TbRepeat, null))) : (react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return setRepeat(true); } },
                    react_1["default"].createElement(tb_1.TbRepeatOff, null))),
                react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return setShuffle(true); }, isActive: isShuffle },
                    react_1["default"].createElement(tb_1.TbArrowsShuffle, null)),
                react_1["default"].createElement(antd_1.Slider, { min: 0, max: 100, defaultValue: 100, onChange: function (value) { return setVolume(value); }, style: { width: '100px', marginRight: '25px' }, tooltip: {
                        open: false
                    } }))),
        react_1["default"].createElement(react_youtube_1["default"], { opts: opts, onReady: onPlayerReady, onPlay: onPlay, onPause: function () { return setIsPlay(false); }, ref: playerRef, style: { display: 'none' } })));
};
exports["default"] = MusicPlayer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
