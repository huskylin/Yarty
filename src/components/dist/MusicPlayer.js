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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var shuffle_1 = require("@/utils/shuffle");
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
    var _b = react_1.useState(true), isRepeat = _b[0], setIsRepeat = _b[1];
    var _c = react_1.useState(false), isRepeatOne = _c[0], setIsRepeatOne = _c[1];
    var _d = react_1.useState(false), isShuffle = _d[0], setIsShuffle = _d[1];
    var _e = react_1.useState(null), player = _e[0], setPlayer = _e[1];
    var _f = react_1.useState(''), currentVideoData = _f[0], setCurrentVideoData = _f[1];
    var _g = react_1.useState({ value: 0, max: 0 }), progress = _g[0], setProgress = _g[1];
    var _h = react_1.useState(undefined), timeoutId = _h[0], setTimeoutId = _h[1];
    var _j = react_1.useState(false), isTooltipVisible = _j[0], setIsTooltipVisible = _j[1];
    var _k = react_1.useState(''), currentVideoThumbnails = _k[0], setCurrentVideoThumbnails = _k[1];
    var _l = react_1.useState({
        raw: [],
        videoIds: []
    }), playingList = _l[0], setPlayingList = _l[1];
    var playerRef = react_1.useRef(null);
    var playlist = react_1.useContext(partyListContext_1.partyListContext).playlist;
    var play = function () {
        var _a, _b;
        if (!player)
            return;
        if (((_a = player.getPlaylist()) === null || _a === void 0 ? void 0 : _a.length) === 0 ||
            !((_b = player.getVideoData()) === null || _b === void 0 ? void 0 : _b.video_id) ||
            player.getPlayerState() === -1) {
            updatePlayingList();
        }
        setTimeout(function () {
            player.playVideo();
        }, 200);
    };
    var pause = function () {
        if (!player)
            return;
        player === null || player === void 0 ? void 0 : player.pauseVideo();
        setIsPlay(false);
    };
    var stop = function () {
        if (!player)
            return;
        player === null || player === void 0 ? void 0 : player.stopVideo();
        onEnd();
    };
    var next = function () {
        updatePlayingList();
        if (!player)
            return;
        setTimeout(function () {
            player === null || player === void 0 ? void 0 : player.nextVideo();
        }, 1000);
    };
    var previous = function () {
        if (!player)
            return;
        setTimeout(function () {
            player === null || player === void 0 ? void 0 : player.previousVideo();
        }, 1000);
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
        var player = event.target;
        if (!player || !player.i || !player.g)
            return;
        setPlayer(function () { return player; });
    };
    var onPlay = function () {
        setCurrentVideoData(player.getVideoData());
        setCurrentVideoThumbnails(getSrcById(player.getVideoData().video_id));
        setIsPlay(true);
        updateDuration();
        listenCurrentTime();
    };
    var onEnd = function () {
        setCurrentVideoData('');
        setCurrentVideoThumbnails('');
        setIsPlay(false);
    };
    var onStateChange = function (state) { };
    var updateDuration = function () {
        setProgress(function (progress) { return (__assign(__assign({}, progress), { max: player.getDuration() })); });
    };
    var listenCurrentTime = function () {
        window.clearInterval(timeoutId);
        var id = window.setInterval(function () {
            setProgress(function (progress) { return (__assign(__assign({}, progress), { value: player.getCurrentTime() })); });
        }, 200);
        setTimeoutId(id);
    };
    var getSrcById = function (id) {
        if (playingList.raw.length < 1)
            return '';
        return playingList.raw.find(function (e) { return e.videoId === id; })
            .thumbnails;
    };
    // const setVolume = (value: number) => {
    //   player.setVolume(value);
    // };
    // const setTimeAt = (value: number) => {
    //   player.seekTo(value);
    // };
    var updatePlayingList = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var playlistIndex, updatedPlaylist, playingIndex, random, isChange;
        var _a, _b;
        return __generator(this, function (_c) {
            if (!player)
                return [2 /*return*/];
            playlistIndex = player.playerInfo.playlist
                ? (_a = player.playerInfo.playlist) === null || _a === void 0 ? void 0 : _a.indexOf(player.getVideoData().video_id) : 0;
            if ((!isRepeat && playlistIndex + 1 >= ((_b = player.playerInfo.playlist) === null || _b === void 0 ? void 0 : _b.length)) ||
                playlist.length === 0) {
                stop();
            }
            updatedPlaylist = playlist.map(function (e) { return e.videoId; }) !== undefined
                ? playlist.map(function (e) { return e.videoId; })
                : [];
            playingIndex = playlistIndex >= 0 ? playlistIndex : 0;
            if (isShuffle) {
                random = shuffle_1.shuffle(__spreadArrays(updatedPlaylist));
                playingIndex =
                    playlist.map(function (e) { return e.videoId; }).indexOf(random[0]) + 1 === playingIndex
                        ? playlist.map(function (e) { return e.videoId; }).indexOf(random[1])
                        : playlist.map(function (e) { return e.videoId; }).indexOf(random[0]);
            }
            isChange = function (arr1, arr2) {
                var array2Sorted = __spreadArrays(arr2).sort();
                return !(arr1.length === arr2.length &&
                    arr1
                        .slice()
                        .sort()
                        .every(function (value, index) {
                        return value === array2Sorted[index];
                    }));
            };
            if (player.getPlaylist() &&
                isChange(updatedPlaylist, player.getPlaylist())) {
                stop();
                setTimeout(function () {
                    player.cuePlaylist(updatedPlaylist, playingIndex + 1);
                }, 1000);
            }
            else {
                player.cuePlaylist(updatedPlaylist, playingIndex);
            }
            setPlayingList({ raw: playlist, videoIds: updatedPlaylist });
            return [2 /*return*/];
        });
    }); }, [isRepeat, player, playlist, isShuffle]);
    react_1.useEffect(function () {
        if (!player || !player.i || !player.g)
            return;
        if (!isPlay && !player.getPlaylist() && playlist.length > 0) {
            updatePlayingList();
        }
    }, [player, isPlay, updatePlayingList, playlist]);
    react_1.useEffect(function () {
        if (!player || !player.i || !player.g)
            return;
        if (progress.max > 0 && progress.max - progress.value <= 1) {
            if (isRepeatOne) {
                setProgress(function () { return ({
                    value: 0,
                    max: player.getDuration()
                }); });
                player.seekTo(0, true);
                player.playVideo();
            }
            else {
                next();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                }, handleStyle: { top: '-4px' }, onAfterChange: function (value) { return player.seekTo(value); } })),
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
                react_1["default"].createElement(StyledButton, { type: "text", onClick: function () { return setShuffle(!isShuffle); }, isActive: isShuffle },
                    react_1["default"].createElement(tb_1.TbArrowsShuffle, null)),
                react_1["default"].createElement(antd_1.Slider, { min: 0, max: 100, defaultValue: 100, onChange: function (value) { return player.setVolume(value); }, style: { width: '100px', marginRight: '25px' }, tooltip: {
                        open: false
                    } }))),
        react_1["default"].createElement(react_youtube_1["default"], { opts: opts, onReady: onPlayerReady, onPlay: onPlay, onPause: function () { return setIsPlay(false); }, onEnd: onEnd, onStateChange: function (state) { return onStateChange(state); }, ref: playerRef, style: { display: 'none' } })));
};
exports["default"] = MusicPlayer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
