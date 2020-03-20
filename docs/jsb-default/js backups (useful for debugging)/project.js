window.__require = function e(t, n, o) {
function i(s, a) {
if (!n[s]) {
if (!t[s]) {
var c = s.split("/");
c = c[c.length - 1];
if (!t[c]) {
var u = "function" == typeof __require && __require;
if (!a && u) return u(c, !0);
if (r) return r(c, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var l = n[s] = {
exports: {}
};
t[s][0].call(l.exports, function(e) {
return i(t[s][1][e] || e);
}, l, l.exports, e, t, n, o);
}
return n[s].exports;
}
for (var r = "function" == typeof __require && __require, s = 0; s < o.length; s++) i(o[s]);
return i;
}({
"A_star_1.0": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4438eeLCxZNhoVxcLOfdZsJ", "A_star_1.0");
cc._RF.pop();
}, {} ],
"A_star_2.0": [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2f26fO3FWVLt585f4IEWy7N", "A_star_2.0");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o, i = e("./BinaryHeap"), r = e("../Core/Dungeon/DungeonFactory");
(function(e) {
e[e.Four = 0] = "Four";
e[e.Eight = 1] = "Eight";
})(o = n.SeachType || (n.SeachType = {}));
var s = function() {
return function(e, t) {
this.Gird = e;
this.Const = t;
};
}();
n.Neighbour = s;
var a = function() {
function e(e, t) {
this._g = 0;
this._h = 0;
if (e instanceof cc.Vec2) {
this._position = e;
this._GirdType = t;
} else console.error("postion must be cc.vec2");
}
Object.defineProperty(e.prototype, "GirdType", {
get: function() {
return this._GirdType;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "g", {
get: function() {
return this._g;
},
set: function(e) {
this._g = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "h", {
get: function() {
return this._h;
},
set: function(e) {
this._h = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "position", {
get: function() {
return this._position;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "parent", {
get: function() {
return this._last;
},
set: function(e) {
this._last = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "moveConst", {
get: function() {
return this._moveConst;
},
set: function(e) {
this._moveConst = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "f", {
get: function() {
return this._g + this._h;
},
enumerable: !0,
configurable: !0
});
e.prototype.equalTo = function(t) {
return t instanceof e && this._position.equals(t.position);
};
return e;
}();
n.Gird = a;
var c = function() {
function e() {
this.moveType = o.Four;
this._open = new i.BinaryHeap(function(e) {
return e.f;
});
}
e.ins = function() {
this._instance || (this._instance = new e());
return this._instance;
};
Object.defineProperty(e.prototype, "MapVo", {
set: function(e) {
if (e) {
this._mapVo = [];
this._col = e.length;
this._row = e[0].length;
for (var t = 0; t < e.length; t++) {
this._mapVo[t] = [];
for (var n = e[t], o = 0; o < n.length; o++) {
var i = new a(cc.v2(o, t), e[t][o].type);
this._mapVo[t].push(i);
}
}
this._initNeighbours();
}
},
enumerable: !0,
configurable: !0
});
e.prototype._initNeighbours = function() {
for (var e = 0; e < this._mapVo.length; e++) for (var t = this._mapVo[e], n = 0; n < t.length; n++) {
var o = t[n];
this._initNeighbour(o);
}
};
e.prototype._initNeighbour = function(e) {
var t = Math.max(0, e.position.x - 1), n = Math.max(0, e.position.y - 1), i = Math.min(e.position.x + 1, this._row - 1), a = Math.min(e.position.y + 1, this._col - 1);
e.neighbours = [];
if (this.moveType === o.Eight) {
for (var c = n; c <= a; c++) for (var u = t; u <= i; u++) if (e.position.x !== u || e.position.y !== c) {
if ((p = this._mapVo[c][u]).GirdType !== r.Tile.blank && p.GirdType !== r.Tile.wall && p.GirdType !== r.Tile.door) {
var l = this._constMove(e, p);
e.neighbours.push(new s(p, l));
}
}
} else if (this.moveType === o.Four) for (c = n; c <= a; c++) for (u = t; u <= i; u++) if (!(e.position.x === u && e.position.y === c || e.position.x != u && e.position.y != c)) {
var p;
if ((p = this._mapVo[c][u]).GirdType !== r.Tile.blank && p.GirdType !== r.Tile.wall && p.GirdType !== r.Tile.door) {
l = this._constMove(e, p);
e.neighbours.push(new s(p, l));
}
}
};
e.prototype._constMove = function(e, t) {
return this.moveType == o.Eight && e.position.x !== t.position.x && e.position.y != e.position.y ? Math.SQRT1_2 : 1;
};
e.prototype.Search = function(e, t) {
var n = Date.now();
this._open.Clear();
this._close = [];
for (var o = [], i = this._GetInitizalGird(e.x, e.y); i; ) {
this._close.push(i);
if (i.position.equals(t)) {
var r = i;
do {
o.unshift(r.position);
r = r.parent;
} while (r);
this._close = [];
this._open.Clear();
break;
}
for (var s = i.neighbours, a = s.length - 1; a >= 0; --a) {
var c = s[a].Gird;
if (-1 === this._close.indexOf(c)) {
var u = s[a].Const;
if (this._open.Contains(c)) i.g + u < c.g && (c.g = i.g + u); else {
c.parent = i;
c.g = i.g + u;
var l = c.position.sub(t);
c.h = Math.abs(l.x) + Math.abs(l.y);
this._open.Insert(c);
}
}
}
i = this._open.Pop();
}
console.log(Date.now() - n);
return o;
};
e.prototype._GetInitizalGird = function(e, t) {
var n = this._mapVo[t][e];
n.g = n.h = 0;
n.parent = null;
return n;
};
return e;
}();
n.default = c;
cc._RF.pop();
}, {
"../Core/Dungeon/DungeonFactory": "DungeonFactory",
"./BinaryHeap": "BinaryHeap"
} ],
Abstract_Test: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ac2dbi3u8hIZabh/iGgTKLA", "Abstract_Test");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
new (function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.Execute();
return t;
}
t.prototype.Execute = function() {
console.log("2222");
};
return t;
}(function() {
return function() {
console.log("1111");
};
}()))();
cc._RF.pop();
}, {} ],
Arrow_Demo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "abf5afFC2xOV7rXMSy210Pw", "Arrow_Demo");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Core/Utils/SlayArrow"), s = e("../Core/Manager/TimerManager"), a = cc._decorator, c = a.ccclass, u = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.touchNode = null;
t.headSprite = null;
t.tailSprite = null;
t._startPos = cc.v2(0, 0);
t._up = !0;
return t;
}
t.prototype.onLoad = function() {
s.default.ins().doNext(function() {
console.log("timerManager Test.");
}, this);
};
t.prototype.start = function() {
this._slayArraw = new r.default(this.headSprite, this.tailSprite);
this.node.addChild(this._slayArraw);
this._slayArraw.setActive(!1);
this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onStart, this);
};
t.prototype.onStart = function(e) {
this._slayArraw.setActive(!0);
this._startPos = this.touchNode.convertToWorldSpaceAR(this._startPos);
this._slayArraw.setArrowPos(this._startPos, e.getLocation());
this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this);
this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onEnd, this);
this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
};
t.prototype.onDrag = function(e) {
var t = e.getLocation();
this._slayArraw.setArrowPos(this._startPos, t);
};
t.prototype.onEnd = function(e) {
this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onDrag, this);
this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onEnd, this);
this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
this._startPos = cc.v2(0, 0);
this._slayArraw.setActive(!1);
};
t.prototype.update = function(e) {};
i([ u(cc.Node) ], t.prototype, "touchNode", void 0);
i([ u(cc.Sprite) ], t.prototype, "headSprite", void 0);
i([ u(cc.Sprite) ], t.prototype, "tailSprite", void 0);
return t = i([ c ], t);
}(cc.Component);
n.default = l;
cc._RF.pop();
}, {
"../Core/Manager/TimerManager": "TimerManager",
"../Core/Utils/SlayArrow": "SlayArrow"
} ],
AudioUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1a4a6pfkehNNoWyuaka41cm", "AudioUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.PlayAudioByAnalyser = function(e) {
var t = new AudioContext(), n = t.createBufferSource();
"string" == typeof e && cc.AudioClip._loadByUrl(e, function(t, n) {
n && (e = n);
});
n.buffer = e._audio;
var o = t.createAnalyser();
o.fftSize = 256;
n.connect(o);
o.connect(t.destination);
n.start(0);
return o;
};
e.stopAllPlayingAudio = function() {
this._stopAllPlayingAudio();
};
e.playAudio = function(e, t, n) {
e && this._playAudio(e, t, n);
};
e.stopAudio = function(e) {
"undefined" != typeof e && this._stopAudio(e);
};
e._stopAllPlayingAudio = function() {
for (var e, t = Object.keys(this._playingAudios); t.length; ) (e = parseInt(t.shift())) && !isNaN(e) && this._stopAudio(e);
};
e._playAudio = function(e, t, n) {
var o = this;
if (e) {
var i = cc.audioEngine.playEffect(e, !1);
"undefined" == typeof i && (i = Math.random() + Date.now());
var r = cc.audioEngine.getDuration(i), s = function() {
var e = Object.keys(o._playingAudios), t = e.indexOf(i.toString());
if (-1 != t) {
var n = o._playingAudios[i.toString()];
n.userFunc && n.thiz && n.userFunc.call(n.thiz);
o._playingAudios[e[t]] = null;
delete o._playingAudios[e[t]];
}
}, a = setTimeout(s.bind(this), r);
this._playingAudios[i.toString()] = {
baseFunc: s,
userFunc: t,
thiz: n,
Tid: a
};
return i;
}
return null;
};
e._stopAudio = function(e) {
var t = Object.keys(this._playingAudios), n = e.toString();
if (-1 !== t.indexOf(n)) {
cc.audioEngine.stopEffect(e);
var o = this._playingAudios[n];
null != o && clearTimeout(o.Tid);
this._playingAudios[n] = null;
delete this._playingAudios[n];
}
};
e._playingAudios = {};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
BaseGameEntity: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dbd87HkdNxGgpZVcsNSC24R", "BaseGameEntity");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Config/EntityConfig"), i = function() {
function e(e) {
this.setEntityId(e);
}
e.prototype.setEntityId = function(t) {
if (!(isNaN(t) || this.m_EntityId === t || t > e.m_iNextValidId)) {
this.m_EntityId = t;
e.m_iNextValidId = this.m_EntityId + 1;
}
};
Object.defineProperty(e.prototype, "EntityId", {
get: function() {
return this.m_EntityId;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "EntityName", {
get: function() {
return o.EntityNames[this.m_EntityId];
},
enumerable: !0,
configurable: !0
});
e.m_iNextValidId = 0;
return e;
}();
n.BaseGameEntity = i;
cc._RF.pop();
}, {
"../Config/EntityConfig": "EntityConfig"
} ],
BaseObj: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "40d457AlNFAV6TV/k0W9HvV", "BaseObj");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = cc._decorator, r = (i.ccclass, i.property, function(e) {
o(t, e);
function t() {
return e.call(this) || this;
}
return t;
}(cc.Node));
n.BaseObj = r;
cc._RF.pop();
}, {} ],
BinaryHeap: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ceaf4GDO69Ap5FqJ1qNKPjs", "BinaryHeap");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e(e) {
this._heap = [];
this._getCompareFunc = e;
}
e.prototype._bubble = function(e) {
for (var t = e, n = t - 1 >> 1; n >= 0 && !(this._getCompareFunc(this._heap[n]) < this._heap[t]); ) {
var o = this._heap[t];
this._heap[t] = this._heap[n];
this._heap[n] = o;
n = (t = n) - 1 >> 1;
}
};
e.prototype._down = function(e, t) {
void 0 === t && (t = this.Size - 1);
for (var n = e, o = 1 + (n << 1); o < t; ) {
o < t && this._getCompareFunc(this._heap[o]) < this._getCompareFunc(this._heap[o + 1]) && o++;
if (this._getCompareFunc(this._heap[n]) < this._getCompareFunc(this._heap[o])) break;
var i = this._heap[o];
this._heap[o] = this._heap[n];
this._heap[n] = i;
o = 1 + ((n = o) << 1);
}
};
Object.defineProperty(e.prototype, "Size", {
get: function() {
return this._heap.length;
},
enumerable: !0,
configurable: !0
});
e.prototype.Contains = function(e) {
return -1 !== this._heap.indexOf(e);
};
e.prototype.Get = function(e) {
return this._heap[e];
};
e.prototype.Insert = function(e) {
this._heap.push(e);
this._bubble(this.Size - 1);
};
e.prototype.Pop = function() {
var e = this._heap[0], t = this._heap.pop();
if (this.Size <= 0) return e;
this._heap[0] = t;
this._down(0, this.Size - 1);
return e;
};
e.prototype.Peek = function() {
if (this.Size) return this._heap[0];
};
e.prototype.Remove = function(e) {
var t = this._heap.indexOf(e);
if (-1 != t) return !1;
this._heap[t] = this._heap.pop();
this._heap.length > 0 && this._down(t, this.Size - 1);
return !0;
};
e.prototype.Clear = function() {
do {
this._heap.shift();
} while (this.Size > 0);
};
return e;
}();
n.BinaryHeap = o;
cc._RF.pop();
}, {} ],
DinnerState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "eb3c0OQ205J/ZCzHbflzBLF", "DinnerState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Message/MessageDispatcher"), i = e("../../Message/MessageType"), r = e("../../Config/EntityConfig"), s = e("../WomenState/KeepHouseState"), a = e("../MinerState/EnterMineAndDigForNugget"), c = function() {
function e() {}
e.prototype.onEnter = function(e) {
console.log(e.EntityName + "正在吃晚饭~");
o.MessageDispatcher.Instance.DispatchMessage(e.EntityId, e.EntityId, i.MessageType.Eat_Complete, null, 3);
};
e.prototype.onExit = function(e) {};
e.prototype.Execute = function(e) {
console.log(e.EntityName + "正在吃晚饭~");
};
e.prototype.onMessage = function(e, t) {
if (t) {
console.log(e.EntityName + "吃完晚饭了~");
if (t.MsgType === i.MessageType.Eat_Complete) {
e.EntityId === r.EntityConfig.Miner ? e.StateMachine.ChangeState(a.EnterMineAndDigForNugget.Instance) : e.EntityId === r.EntityConfig.Women && e.StateMachine.ChangeState(s.KeepHouseState.Instance);
return !0;
}
}
};
e.Instance = new e();
return e;
}();
n.DinnerState = c;
cc._RF.pop();
}, {
"../../Config/EntityConfig": "EntityConfig",
"../../Message/MessageDispatcher": "MessageDispatcher",
"../../Message/MessageType": "MessageType",
"../MinerState/EnterMineAndDigForNugget": "EnterMineAndDigForNugget",
"../WomenState/KeepHouseState": "KeepHouseState"
} ],
DiviceUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d0e1cDl71hGIqTRo0UVnS16", "DiviceUtils");
(function() {
function e() {}
e.fullWindow = function() {};
})();
cc._RF.pop();
}, {} ],
DragBoneUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "00d1f0YZT1LMJbA/tcI1mKq", "DragBoneUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.playAnimateByName = function(e, t, n) {
void 0 === n && (n = 1);
e && t && e.playAnimation(t, n);
};
e.playHideEffect = function(e, t, n, o) {
e.node.active = !0;
e.removeEventListener(dragonBones.EventObject.COMPLETE);
e.addEventListener(dragonBones.EventObject.COMPLETE, function() {
e.removeEventListener(dragonBones.EventObject.COMPLETE);
e.node.active = !1;
if (n && o) {
console.log("fn is Used!");
n.call(o);
}
}, this);
e.playAnimation(t, 1);
};
e.palyArmatureByName = function(e, t, n, o, i) {
void 0 === i && (i = 1);
e.node.active = !0;
e.removeEventListener(dragonBones.EventObject.COMPLETE);
e.addEventListener(dragonBones.EventObject.COMPLETE, function() {
e.removeEventListener(dragonBones.EventObject.COMPLETE);
n && o && n.call(o);
}, this);
e.playAnimation(t, i);
};
e.makeArmmatureGotoProcess = function(e, t, n) {
e.node.active || (e.node.active = !0);
e.armature() || (e.armatureName = e.armatureName);
e.armature().animation.gotoAndStopByProgress(t, n);
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
DungeonFactory: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a50e2TxRq5L54BvPKZV6fns", "DungeonFactory");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./dungeon");
(function(e) {
e[e.blank = 0] = "blank";
e[e.wall = 1] = "wall";
e[e.floor = 2] = "floor";
e[e.door = 3] = "door";
e[e.stairsUp = 4] = "stairsUp";
e[e.stairsDown = 5] = "stairsDown";
})(n.Tile || (n.Tile = {}));
var i = function() {
function e() {}
e.prototype.genertor = function(e, t) {
var n = new o.default(e, t);
n.generate();
return n.getFlattenedTiles();
};
e.Ins = new e();
return e;
}();
n.DungeonFactory = i;
cc._RF.pop();
}, {
"./dungeon": "dungeon"
} ],
EffectUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0da55rOPdVFiJ8GaKwOAa35", "EffectUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./GameUtils"), i = function() {
function e() {}
e.fadeToggleNode = function(e, t, n, o, i) {
void 0 === n && (n = 1);
var r = cc.fadeIn(n), s = cc.fadeOut(n);
e.runAction(s);
var a = cc.callFunc(function() {
e.stopAction(s);
e.active = !1;
t.active = !0;
o && i && o.call(i, e);
}, this);
t.active = !0;
t.opacity = 0;
t.runAction(cc.sequence(r, a));
};
e.onFrame = function(e) {
if (this._shakeCount >= this._maxCount) {
if (!this._node) return;
this.stopShake();
} else {
var t = this._shakePos[this._shakeCount % this._shakePos.length], n = this._lastPos.add(t);
this._node.position = n;
this._shakeCount++;
}
};
e.shakeNode = function(e, t, n, o) {
void 0 === o && (o = 3);
if (!this._isShaking) {
this._isShaking = !0;
this._maxCount = this._shakePos.length * o;
this._callFunc = t;
this._callTarget = n;
this._lastPos = e.position;
this._node = e;
this.shakeFrameId = window.requestAnimationFrame(this.onFrame.bind(this));
}
};
e.scaleNodeWidthByMaxNum = function(e, t, n, o, i, r) {
void 0 === n && (n = 20);
void 0 === o && (o = "width");
if (!this._isonScale) {
this._scaleNode = e;
this._scaleMaxWidth = t;
this._lerpWidth = n;
this._peroty = o;
this._scaleFunc = i;
this._scaleFuncthiz = r;
this._isonScale = !0;
this.scaleFrameId = window.requestAnimationFrame(this.onScaleWidth.bind(this));
}
};
e.onScaleWidth = function(e) {
this._scaleNode[this._peroty] >= this._scaleMaxWidth && this.stopScaleWidthByNum();
this._peroty && this._scaleNode ? this._scaleNode[this._peroty] += this._scaleMaxWidth * e * 1.5 : this.stopScaleWidthByNum();
};
e.stopScaleWidthByNum = function() {
this._isonScale = !1;
this._scaleFunc && this._scaleFuncthiz && this._scaleFunc.call(this._scaleFuncthiz);
this._scaleNode = null;
this._scaleMaxWidth = null;
this._lerpWidth = null;
this._peroty = null;
this._scaleFunc = null;
this._scaleFuncthiz = null;
window.cancelAnimationFrame(this.scaleFrameId);
};
e.stopShake = function() {
if (this._isShaking) {
this._node.position = this._lastPos;
window.cancelAnimationFrame(this.shakeFrameId);
this._callFunc && this._callTarget && this._callFunc.call(this._callTarget);
this._isShaking = !1;
this._maxCount = 0;
this._shakeCount = 0;
this._callFunc = null;
this._callTarget = null;
this._lastPos = null;
this._node = null;
}
};
e.onBlink = function() {
if (this._totalRepeat >= this._blinkingCount) {
if (!this._blinkNode || !this._isBlinking) return;
this.stopBlink();
} else if (this._blinkFlag) {
this._blinkNode.opacity += this._disBlink;
if (this._blinkNode.opacity >= 255) {
this._totalRepeat++;
this._blinkFlag = !1;
}
} else {
this._blinkNode.opacity -= this._disBlink;
if (this._blinkNode.opacity <= 0) {
this._totalRepeat++;
this._blinkFlag = !0;
}
}
};
e.stopBlink = function() {
this._disBlink = 0;
this._totalRepeat = 0;
this._isBlinking = !1;
this._blinkingCount = 0;
this._blinkFlag = !1;
window.cancelAnimationFrame(this.blinkFrameId);
if (this._blinkFunc && this._blinkcallTarget) {
this._blinkNode.opacity = 255;
this._blinkFunc.call(this._blinkcallTarget);
this._blinkFunc = null;
this._blinkcallTarget = null;
this._blinkNode = null;
}
};
e.blinkNodebyOpcity = function(e, t, n, o, i) {
void 0 === n && (n = null);
void 0 === o && (o = 3);
void 0 === i && (i = 25);
if (e && !this._isBlinking) {
this._blinkingCount = o;
this._blinkNode = e;
this._blinkFunc = t;
this._blinkcallTarget = n;
this._isBlinking = !0;
this._disBlink = i;
this._totalRepeat = 0;
window.requestAnimationFrame(this.onBlink.bind(this));
}
};
e.cutShortWidthByEase = function(e, t, n, o) {
var i = cc.callFunc(function() {
n && o && n.call(o, e);
}, this), r = cc.sequence(cc.scaleTo(t, 0, 1), i);
e.runAction(r);
};
e.fadeNode = function(e, t, n, o, i) {
void 0 === o && (o = .5);
void 0 === i && (i = !1);
if (e) {
var r = 255;
if (i) {
e.opacity = 255;
e.active = !0;
r = 0;
} else {
e.opacity = 0;
e.active = !0;
r = 255;
}
var s = cc.callFunc(function() {
t && n && t.call(n, e);
}, this), a = cc.sequence(cc.fadeTo(o, r), s);
e.runAction(a);
} else console.error("fadeNode error, not node");
};
e.swapeNodeIndex = function(e, t) {
if (e.getParent() == t.getParent()) {
var n = e.getParent().children, o = n.indexOf(e), i = n.indexOf(t);
n[o] = t;
n[i] = e;
} else console.error("两节点不属于同一节点.");
};
e.moveNodeToPos = function(e, t, n, o, i, r, s) {
void 0 === n && (n = null);
void 0 === o && (o = null);
void 0 === i && (i = .2);
void 0 === r && (r = !1);
void 0 === s && (s = 999);
var a = e.zIndex;
e.zIndex = s;
var c = cc.callFunc(function() {
e.zIndex = a;
n && o && n.call(o, e);
}, o);
if (r) {
var u = cc.scaleTo(.25, .2);
e.runAction(u);
}
var l = cc.sequence(cc.moveTo(i, t), c);
e.runAction(l);
return l;
};
e.scaleByEsca = function(e) {
if (e) {
e.scale = 0;
var t = cc.scaleTo(1, 1.2);
t.easing(cc.easeElasticInOut(1));
e.runAction(t);
}
};
e.shakeMoveByRotate = function(e, t, n, o) {
if (e) {
this.shakeByRotate(e);
var i = cc.moveTo(2.5, t), r = cc.callFunc(function() {
n && o && n.call(o, e);
}, this), s = cc.sequence(i, r);
e.runAction(s);
} else cc.log("shakeByRotate is not node!");
};
e.shakeByRotate = function(e) {
if (e) {
var t = cc.rotateTo(.7, 3), n = cc.rotateTo(.7, -3), o = cc.sequence(t, n).repeatForever();
e.runAction(o);
} else cc.log("shakeByRotate is not node!");
};
e.floorNode = function(e) {
if (e) {
var t = cc.v2(0, 8), n = cc.v2(0, -5), o = e.position, i = cc.moveTo(.7, o.addSelf(t)), r = cc.moveTo(.7, o.addSelf(n)), s = cc.sequence(i, r).repeatForever();
e.runAction(s);
} else cc.log("shakeByRotate is not node!");
};
e.scaleWidth = function(e, t, n, o, i) {
void 0 === o && (o = 1);
void 0 === i && (i = .8);
if (e) {
e.scaleX = 0;
var r = cc.scaleTo(i, o), s = cc.callFunc(function() {
t.call(n, e);
}, this), a = cc.sequence([ r, s ]);
e.runAction(a);
}
};
e.showPanelByScale = function(e, t, n, o, i, r) {
void 0 === o && (o = 2);
void 0 === i && (i = .1);
void 0 === r && (r = .2);
if (e) {
e.scale = 0;
e.active || (e.active = !0);
var s = cc.scaleTo(i, 1.2), a = cc.scaleTo(r, 1), c = cc.sequence(s, a).repeat(o), u = cc.callFunc(function() {
t && n && t.call(n, e);
}), l = cc.sequence(c, u);
return e.runAction(l);
}
};
e.scaleRepeatAction = function(e, t, n, o, i, r, s) {
void 0 === o && (o = 2);
void 0 === i && (i = .1);
void 0 === r && (r = .2);
void 0 === s && (s = .8);
if (e) {
var a = e.scaleX, c = e.scaleY, u = a * s, l = s * c;
e.active || (e.active = !0);
1 === o && (e.scale = 0);
var p = cc.scaleTo(i, a, c), h = cc.scaleTo(r, u, l), f = cc.sequence(p, h).repeat(o), d = cc.callFunc(function() {
e.scaleX = a;
e.scaleY = c;
t && n && t.call(n, e);
}), y = cc.sequence(f, d);
return e.runAction(y);
}
};
e.blinkAction = function(e, t, n) {
if (e) {
e.opacity = 255;
var o = cc.blink(2, 6), i = cc.callFunc(function() {
t && n && t.call(n, e);
}, this), r = cc.sequence(o, i);
return e.runAction(r);
}
};
e.setGrayNode = function(e, t, n) {
void 0 === n && (n = !1);
for (var i = o.default.GetAllChildNode(e), r = 0; r < i.length; r++) {
var s = i[r].getComponent(cc.Sprite);
s && s.setState(Number(t));
}
n && (t ? e.pauseSystemEvents(!0) : e.resumeSystemEvents(!0));
};
e.reversalToggle = function(e, t, n, o, i, r) {
void 0 === i && (i = .2);
void 0 === r && (r = .3);
var s = e.getComponent(cc.Sprite);
if (s) {
var a = cc.scaleTo(i, 0, 1), c = cc.callFunc(function() {
s.spriteFrame = t.spriteFrame;
}, this), u = cc.scaleTo(r, 1, 1), l = cc.callFunc(function() {
n && o && n.call(o, e);
}, e);
return e.runAction(cc.sequence([ a, c, u, l ]));
}
console.error("target is not find cc.Sprite.");
};
e.drawRectMask = function(e, t, n, o, i) {
void 0 === t && (t = -960);
void 0 === n && (n = -540);
void 0 === o && (o = 1920);
void 0 === i && (i = 1080);
if (e) {
var r = e.getComponent(cc.Graphics);
r || e.addComponent(cc.Graphics);
r.clear();
r.rect(t, n, o, i);
r.fillColor = cc.color(0, 0, 0, 120);
r.fillRect();
} else console.error("not Panel on drawRectMask.");
};
e._isShaking = !1;
e._shakePos = [ cc.v2(-4, 0), cc.v2(4, 0), cc.v2(-4, 0) ];
e._maxCount = 0;
e._shakeCount = 0;
e.shakeFrameId = null;
e._isonScale = !1;
e.scaleFrameId = null;
e._isBlinking = !1;
e._blinkingCount = 0;
e._blinkNode = null;
e._blinkcallTarget = null;
e._blinkFlag = !1;
e._disBlink = 0;
e._totalRepeat = 0;
e.blinkFrameId = null;
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./GameUtils": "GameUtils"
} ],
EnterMineAndDigForNugget: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "79881k9UP1N1ZPpxTxI5Egt", "EnterMineAndDigForNugget");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Config/LoncationType"), i = e("./VisitBankAndSaveGold"), r = e("./QuenchTirst"), s = function() {
function e() {}
e.prototype.onEnter = function(e) {
if (!e.isInMineral) {
console.log(e.EntityName + "不在矿洞中， 正在移动至矿洞. 处于: OnEnter");
e.Location = o.LoncationType.Mineral_Estate;
}
};
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开矿洞，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.Execute = function(e) {
if (e.isInMineral) {
e.addMinerGoldNum(1);
e.updateWrokingHealthy();
e.mineralGoldisFull && e.StateMachine.ChangeState(i.VisitBankAndSaveGold.Instance);
e.mineralIsThirst && e.StateMachine.ChangeState(r.QuenchTirst.Instance);
console.log(e.EntityName + "正在矿洞挖矿，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
} else {
console.log(e.EntityName + "不在矿洞中， 正在移动至矿洞. 处于: Execute");
e.Location = o.LoncationType.Mineral_Estate;
}
};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.EnterMineAndDigForNugget = s;
cc._RF.pop();
}, {
"../../Config/LoncationType": "LoncationType",
"./QuenchTirst": "QuenchTirst",
"./VisitBankAndSaveGold": "VisitBankAndSaveGold"
} ],
EntityConfig: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "eb0403dpkpLN6zGvCVUXCTv", "EntityConfig");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.Miner = 0;
e.Women = 1;
return e;
}();
n.EntityConfig = o;
n.EntityNames = [ "小王同学", "小王老婆" ];
var i = function() {
function e() {}
e.MaxGoldGarried = 5;
e.MaxMoneyBank = 10;
e.MaxThirst = 8;
e.MaxFatigue = 8;
e.MinThirst = 0;
e.MinFatigue = 0;
return e;
}();
n.MinerConfig = i;
cc._RF.pop();
}, {} ],
EntityManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e9ae3Jla/NNV7FzijTtErEU", "EntityManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {
this.m_EntityDirection = {};
}
e.prototype.RemoveEntityById = function(e) {
var t = this.m_EntityDirection[e];
if (t) {
t = null;
delete this.m_EntityDirection[e];
}
};
e.prototype.RegisterEntity = function(e) {
e ? this.m_EntityDirection[e.EntityId] = e : console.error("no Entity.");
};
e.prototype.GetEntityById = function(e) {
return this.m_EntityDirection[e];
};
e.Instance = new e();
return e;
}();
n.EntityManager = o;
cc._RF.pop();
}, {} ],
EventManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4da7aMCJwhLzLLwPSAsDiKM", "EventManager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../Utils/GameUtils"), r = e("./TimerManager"), s = e("../Utils/SingleBase"), a = function() {
function e() {}
e.prototype.dispose = function() {
this.msgName = null;
this.args = null;
};
return e;
}();
n.Msg = a;
var c = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t._MaxDealConst = 500;
t._eventsPool = {};
t._nextFrameEventsPool = {};
t._dealEvents = [];
t._msgPool = [];
return t;
}
t.prototype.addEventListener = function(e, t, n) {
if (t && n) {
var o = {
Func: t,
thiz: n,
isOnce: !1
}, i = this._getEventListener(e, this._eventsPool);
if (i) i.push(o); else {
this._eventsPool[e] = [];
this._eventsPool[e].push(o);
}
} else console.error("args is Empty!");
};
t.prototype.once = function(e, t, n) {
if (t && n) {
var o = {
Func: t,
thiz: n,
isOnce: !0
}, i = this._getEventListener(e, this._eventsPool);
if (i) i.push(o); else {
this._eventsPool[e] = [];
this._eventsPool[e].push(o);
}
} else console.error("args is Empty!");
};
t.prototype.addNFrameEventListener = function(e, t, n) {
if (t && n) {
var o = {
Func: t,
thiz: n
}, i = this._getEventListener(e, this._nextFrameEventsPool);
if (i) i.push(o); else {
this._nextFrameEventsPool[e] = [];
this._nextFrameEventsPool[e].push(o);
}
} else console.error("args is Empty!");
};
t.prototype.dispatchNFrameEventListener = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
var o = this._msgPool.pop() || new a();
o.msgName = e;
o.args = t;
this._dealEvents.push(o);
!this._dealMsg() && this._dealEvents.length > 0 && r.default.ins().doNext(this._dealMsg, this);
};
t.prototype.removeEventListener = function(e) {
var t = this._getEventListener(e, this._eventsPool);
if (t) {
for (;t.length; ) t.shift();
t = null;
delete this._eventsPool[e];
}
};
t.prototype.dispatchEventListener = function(e) {
for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
for (var o = this._getEventListener(e, this._eventsPool), i = o.length - 1; i >= 0; i--) {
var r = o[i];
r.Func && r.thiz && r.Func.apply(r.thiz, t);
r.isOnce && o.splice(i, 1);
}
};
t.prototype.removeAllEventListener = function() {
for (var e = 0, t = Object.keys(this._eventsPool); e < t.length; e++) {
var n = t[e];
this.removeEventListener(n);
}
};
t.prototype._getEventListener = function(e, t) {
void 0 === t && (t = this._eventsPool);
if (void 0 == typeof e) return null;
var n = t[e];
if (!n) return null;
if (!(n instanceof Array)) {
n = null;
delete this._eventsPool[e];
}
return n;
};
t.prototype._dealMsg = function() {
var e, t, n = this, o = i.default.GetTime(), r = function() {
if (!(e = n._dealEvents.shift())) return !0;
if (!(t = n._getEventListener(e.msgName, n._nextFrameEventsPool))) return !0;
for (var s = 0, a = t; s < a.length; s++) {
var c = a[s];
c.Func && c.thiz && c.Func.apply(c.thiz, e.args);
}
e.dispose();
n._msgPool.push(e);
return !(i.default.GetTime() - o > n._MaxDealConst) && r();
};
return r();
};
return t;
}(s.SingleBase);
n.default = c;
cc._RF.pop();
}, {
"../Utils/GameUtils": "GameUtils",
"../Utils/SingleBase": "SingleBase",
"./TimerManager": "TimerManager"
} ],
FollowCamera: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "bb870XdrxRNFKF778LG5RHy", "FollowCamera");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./MathUtils"), s = e("../../Game/Map/MapMgr"), a = cc._decorator, c = a.ccclass, u = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.start = function() {
this._winSize = cc.director.getWinSize();
};
t.prototype.onEnable = function() {};
t.prototype.update = function(e) {
e = Math.min(e, .033);
if (this._target) {
var t = Math.max(this._winSize.width >> 1, this._target.x), n = Math.min(-(this._winSize.height >> 1), this._target.y);
t = Math.min(t, s.default.Ins.Map.width - (this._winSize.width >> 1));
n = Math.max(n, 1 + ~(s.default.Ins.Map.height - (this._winSize.height >> 1)));
this.node.x = r.default.lerp(this.node.x, t, 10 * e);
this.node.y = r.default.lerp(this.node.y, n, 10 * e);
}
};
Object.defineProperty(t.prototype, "target", {
set: function(e) {
this._target = e;
},
enumerable: !0,
configurable: !0
});
return t = i([ c ], t);
}(cc.Component));
n.default = u;
cc._RF.pop();
}, {
"../../Game/Map/MapMgr": "MapMgr",
"./MathUtils": "MathUtils"
} ],
GameUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "95d2bcYVStAcZmWaTttOtsi", "GameUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./MathUtils"), i = function() {
function e() {}
e.getNodePos = function(e, t) {
if (e && t) {
var n = e.getParent().convertToWorldSpaceAR(e.position);
return t.convertToNodeSpaceAR(n);
}
console.error("no args node.");
};
e.GetAllChildNode = function(e) {
var t = [], n = function(e) {
t.push(e);
if (e.childrenCount) for (var o = 0; o < e.children.length; o++) {
var i = e.children[o];
t.push(i);
if (!i.childrenCount) return;
n(i);
}
};
n(e);
return t;
};
e.GetSubstringComponent = function(e, t) {
var n = e.getParent();
if (n) return n.getComponentsInChildren(t);
console.error("not ParentNode.");
};
e.GetTime = function() {
return Date.now();
};
e.GetNodeByPath = function(e, t) {
for (var n = e.split("/"); n.length; ) t = t.getChildByName(n.shift());
return t;
};
e.Active = function(e, t) {
e ? e.active = t : console.error("not node.");
};
e.TransGirdPosition = function(e, t, n, i) {
return cc.v2(e * n + n / 2, o.default.resertNumberPosiv(t * i + i / 2));
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./MathUtils": "MathUtils"
} ],
GoHomeAndSleepReset: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4f07aXA2V5K1obDFaCLurVw", "GoHomeAndSleepReset");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Config/LoncationType"), i = e("./EnterMineAndDigForNugget"), r = e("../../Message/MessageDispatcher"), s = e("../../Message/MessageType"), a = e("../../Config/EntityConfig"), c = e("../CommonState/DinnerState"), u = function() {
function e() {}
e.prototype.onEnter = function(e) {
if (!e.isInHome) {
console.log(e.EntityName + "不在家中， 正在移动至家里. 处于: OnEnter");
e.Location = o.LoncationType.Home;
r.MessageDispatcher.Instance.DispatchMessage(e.EntityId, a.EntityConfig.Women, s.MessageType.Hi_Baby_IamGohome, null, -1);
console.log(e.EntityName + "告诉妻子，他回家啦.~");
}
};
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开家中，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.Execute = function(e) {
if (!e.isInHome) {
console.log(e.EntityName + "不在家中， 正在移动至家里. 处于: Excute");
e.Location = o.LoncationType.Home;
}
e.isMineralFullRelax ? e.StateMachine.ChangeState(i.EnterMineAndDigForNugget.Instance) : e.updateMineralFatigue();
console.log(e.EntityName + "正在家里休息，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.onMessage = function(e, t) {
if (t && t.MsgType === s.MessageType.Eat_Dinner) {
e.StateMachine.ChangeState(c.DinnerState.Instance);
return !0;
}
};
e.Instance = new e();
return e;
}();
n.GoHomeAndSleepReset = u;
cc._RF.pop();
}, {
"../../Config/EntityConfig": "EntityConfig",
"../../Config/LoncationType": "LoncationType",
"../../Message/MessageDispatcher": "MessageDispatcher",
"../../Message/MessageType": "MessageType",
"../CommonState/DinnerState": "DinnerState",
"./EnterMineAndDigForNugget": "EnterMineAndDigForNugget"
} ],
GotoToiletState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97bdfc0CNNAdriHSb007orK", "GotoToiletState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开厕所，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.onEnter = function(e) {
console.log(e.EntityName + "准备开始上厕所，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.Execute = function(e) {
e.UpdateGoToiletDet();
e.isNotWannaToilet && e.StateMachine.RevertoPreviousState();
console.log(e.EntityName + "正在上厕所，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.GotoToiletState = o;
cc._RF.pop();
}, {} ],
GustureComponent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "35435mkbwtDVYLYuwM92L3H", "GustureComponent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Core/Utils/GustureUtils"), s = cc._decorator, a = s.ccclass, c = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.resultTxt = null;
return t;
}
t.prototype.start = function() {
this._gls = this.node.getChildByName("draw").getComponent(cc.Graphics);
};
t.prototype.onEnable = function() {
this.node.on(cc.Node.EventType.TOUCH_START, this.ontouchStart, this);
};
t.prototype.onDisable = function() {
this.node.off(cc.Node.EventType.TOUCH_START, this.ontouchStart, this);
};
t.prototype.ontouchStart = function(e) {
this._gls.clear();
var t = this.node.parent.convertToNodeSpaceAR(e.getLocation());
this.draw(t.x, t.y);
var n = e.getLocationInView();
r.default.ins().addPoint(n.x, n.y);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.ontouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this.ontouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.ontouchEnd, this);
};
t.prototype.ontouchEnd = function(e) {
this._gls.close();
this.node.off(cc.Node.EventType.TOUCH_MOVE, this.ontouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this.ontouchEnd, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.ontouchEnd, this);
var t = r.default.ins().checkGusture(!1);
r.default.ins().removeAllPoints();
this.resultTxt.string = "gusture is " + t.Name + "," + t.Score.toFixed(2) + "(score) ," + t.Time + "(coust)";
t.Score > .85 && window.alert(t.Name);
};
t.prototype.ontouchMove = function(e) {
var t = this.node.parent.convertToNodeSpaceAR(e.getLocation());
this.draw(t.x, t.y, this._last.x, this._last.y);
r.default.ins().addPoint(t.x, t.y);
};
t.prototype.draw = function(e, t, n, o) {
void 0 === n && (n = e);
void 0 === o && (o = t);
this._gls.moveTo(n, o);
this._gls.lineTo(e, t);
this._last = cc.v2(e, t);
this._gls.stroke();
this._gls.fill();
};
i([ c(cc.Label) ], t.prototype, "resultTxt", void 0);
return t = i([ a ], t);
}(cc.Component);
n.default = u;
cc._RF.pop();
}, {
"../Core/Utils/GustureUtils": "GustureUtils"
} ],
GustureUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8ed96t8fmtG9b/1R0sdAnJo", "GustureUtils");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./SingleBase"), r = e("../Gusturelib/gusture.js"), s = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t._testPoints = [];
return t;
}
t.prototype.checkGusture = function(e) {
return r.Gus.Recognize(this._testPoints, e);
};
t.prototype.AddGesture = function(e, t) {
return !(!e || !t.length) && r.Gus.AddGesture(e, t);
};
t.prototype.DeleteUserGestures = function() {
r.Gus.DeleteUserGestures();
};
t.prototype.addPoint = function(e, t) {
void 0 === e && (e = 0);
void 0 === t && (t = 0);
var n = new r.Point(e, t);
this._testPoints.push(n);
};
t.prototype.removeAllPoints = function() {
for (var e = this._testPoints.length - 1; e >= 0; --e) {
var t = this._testPoints[e];
this._testPoints.splice(t, 1);
}
};
t.prototype.removePoint = function(e, t) {
if (isNaN(e) || isNaN(t)) return !1;
for (var n = this._testPoints.length - 1; n >= 0; --n) {
var o = this._testPoints[n];
if (o.X === e && o.Y === t) {
this._testPoints.splice(n, 1);
return !0;
}
}
return !1;
};
t.prototype.getPointsLength = function() {
return this._testPoints.length;
};
return t;
}(i.SingleBase);
n.default = s;
cc._RF.pop();
}, {
"../Gusturelib/gusture.js": "gusture",
"./SingleBase": "SingleBase"
} ],
IEventManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "171b6nvVIZGE4qsPRgp7Eq7", "IEventManager");
cc._RF.pop();
}, {} ],
IResourceManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dfa5d+8fedMA4l5KXanhd+b", "IResourceManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IStateMachine: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ae994dWIRJBp6EKrT5VaOj/", "IStateMachine");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
return function() {};
}();
n.IStateMachine = o;
cc._RF.pop();
}, {} ],
IState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9e3d6Mf8gtD+p9dvOfa9gMP", "IState");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
ITimerManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ced6avpvXtC7rMSLE1PrOwE", "ITimerManager");
cc._RF.pop();
}, {} ],
KeepHouseState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4a4515XtMpLU73O7B3pvVCh", "KeepHouseState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./GotoToiletState"), i = function() {
function e() {}
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开家务，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.onEnter = function(e) {
console.log(e.EntityName + "准备开始做家务，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.Execute = function(e) {
e.isWannaToilet && e.StateMachine.ChangeState(o.GotoToiletState.Instance);
console.log(e.EntityName + "正在做家务，当前状态：", "\n 当前想上厕所程度: " + e.GotoToiletDeg);
};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.KeepHouseState = i;
cc._RF.pop();
}, {
"./GotoToiletState": "GotoToiletState"
} ],
KeyCode: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "505f5vqs1BA8Yobs0qj4EYd", "KeyCode");
Object.defineProperty(n, "__esModule", {
value: !0
});
(function(e) {
e[e.BackSpace = 8] = "BackSpace";
e[e.Tab = 9] = "Tab";
e[e.Clear = 12] = "Clear";
e[e.Enter = 13] = "Enter";
e[e.Shift_L = 16] = "Shift_L";
e[e.Control_L = 17] = "Control_L";
e[e.Alt_L = 18] = "Alt_L";
e[e.Pause = 19] = "Pause";
e[e.Caps_Lock = 20] = "Caps_Lock";
e[e.Esc = 27] = "Esc";
e[e.Space = 32] = "Space";
e[e.Page_Up = 33] = "Page_Up";
e[e.A = 65] = "A";
e[e.B = 66] = "B";
e[e.C = 67] = "C";
e[e.D = 68] = "D";
e[e.E = 69] = "E";
e[e.F = 70] = "F";
e[e.G = 71] = "G";
e[e.H = 72] = "H";
e[e.I = 73] = "I";
e[e.J = 74] = "J";
e[e.K = 75] = "K";
e[e.L = 76] = "L";
e[e.M = 77] = "M";
e[e.N = 78] = "N";
e[e.O = 79] = "O";
e[e.P = 80] = "P";
e[e.Q = 81] = "Q";
e[e.R = 82] = "R";
e[e.S = 83] = "S";
e[e.T = 84] = "T";
e[e.U = 85] = "U";
e[e.V = 86] = "V";
e[e.W = 87] = "W";
e[e.X = 88] = "X";
e[e.Y = 89] = "Y";
e[e.Z = 90] = "Z";
})(n.KeyCode || (n.KeyCode = {}));
cc._RF.pop();
}, {} ],
Launcher: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3e119nrnxRPHruFh/vvps4L", "Launcher");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./Game/Map/MapMgr"), s = e("./Game/Obj/RoleMgr"), a = e("./Core/Manager/SceneManager"), c = cc._decorator, u = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._Assets = "Prefab/Guester";
return t;
}
t.prototype.start = function() {
a.default.ins().Init();
r.default.Ins.InizalizeMaze();
s.default.Ins.Init();
};
return t = i([ u ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"./Core/Manager/SceneManager": "SceneManager",
"./Game/Map/MapMgr": "MapMgr",
"./Game/Obj/RoleMgr": "RoleMgr"
} ],
LogUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "87213Rs4TFHNIUQ2W5q/4CO", "LogUtils");
(function() {
function e() {}
e.Log = function() {};
})();
cc._RF.pop();
}, {} ],
LoncationType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "228b55fky5AoKJCf0w5YAaC", "LoncationType");
Object.defineProperty(n, "__esModule", {
value: !0
});
(function(e) {
e[e.Mineral_Estate = 0] = "Mineral_Estate";
e[e.Bank = 1] = "Bank";
e[e.Home = 2] = "Home";
e[e.Bar = 3] = "Bar";
})(n.LoncationType || (n.LoncationType = {}));
cc._RF.pop();
}, {} ],
MakeDinnerState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "66003nxGIRPppIXfhmWl9NO", "MakeDinnerState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Message/MessageDispatcher"), i = e("../../Config/EntityConfig"), r = e("../../Message/MessageType"), s = e("../CommonState/DinnerState"), a = function() {
function e() {}
e.prototype.onExit = function(e) {
console.log(e.EntityName + "做好了晚饭~");
};
e.prototype.onEnter = function(e) {
console.log(e.EntityName + "准备做晚饭了~");
o.MessageDispatcher.Instance.DispatchMessage(e.EntityId, e.EntityId, r.MessageType.Eat_Dinner, null, 2);
};
e.prototype.Execute = function(e) {
console.log(e.EntityName + "正在做晚饭~");
};
e.prototype.onMessage = function(e, t) {
if (t && t.MsgType === r.MessageType.Eat_Dinner) {
e.StateMachine.ChangeState(s.DinnerState.Instance);
o.MessageDispatcher.Instance.DispatchMessage(e.EntityId, i.EntityConfig.Miner, r.MessageType.Eat_Dinner, null, -1);
return !0;
}
};
e.Instance = new e();
return e;
}();
n.MakeDinnerState = a;
cc._RF.pop();
}, {
"../../Config/EntityConfig": "EntityConfig",
"../../Message/MessageDispatcher": "MessageDispatcher",
"../../Message/MessageType": "MessageType",
"../CommonState/DinnerState": "DinnerState"
} ],
MapConfig: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "401e7R5GzZMOYRzouPORuPV", "MapConfig");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.MapWidth = 91;
e.MapHeight = 71;
e.GirdWidth = 32;
e.GirdHeight = 32;
e.Group_UI = "UI";
e.Group_Map = "Map";
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
MapMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cc50c2Yzw9C/7uLggot2roa", "MapMgr");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Astar/A_star_2.0"), i = e("./Map"), r = e("./MapConfig"), s = e("../../Core/Manager/ResourceManager"), a = e("../Obj/RoleMgr"), c = e("../../Core/Dungeon/DungeonFactory"), u = e("../../Core/Manager/SceneManager"), l = function() {
function e() {
this._Map = new i.Map();
this._Astar = o.default.ins();
this.loadMapRes();
}
Object.defineProperty(e.prototype, "Map", {
get: function() {
return this._Map;
},
enumerable: !0,
configurable: !0
});
e.prototype.loadMapRes = function() {
var e = this;
s.default.ins().loadResByDir("Map/1001", s.loadingType.None, function(t) {
for (var n = [], o = 0, i = t; o < i.length; o++) {
var r = i[o];
r instanceof cc.Prefab && n.push(r);
}
e._Map.GirdType = n;
});
};
e.prototype.UnInit = function() {
this._Map.off(cc.Node.EventType.TOUCH_START, this.clickMap, this);
this._Map.UnInit();
};
e.prototype.InizalizeMaze = function() {
var e = r.default.MapWidth, t = r.default.MapHeight;
r.default.MapWidth % 2 == 0 && (e = r.default.MapWidth - 1);
r.default.MapWidth % 2 == 0 && (t = r.default.MapHeight - 1);
this._SourceData = c.DungeonFactory.Ins.genertor(e, t);
this._Map.Init(this._SourceData);
u.default.ins().BattleLayer.addChild(this._Map);
this._Map.on(cc.Node.EventType.TOUCH_END, this.clickMap, this);
};
e.prototype.clickMap = function(e) {
var t = e.getLocation(), n = u.default.ins().ConverToMapPos(t), o = Math.floor(n.x / r.default.GirdWidth), i = Math.floor(n.y / r.default.GirdHeight), s = this._Astar.Search(a.default.Ins.nowPos, cc.v2(o, i));
0 !== s.length ? a.default.Ins.EnterState(a.RoleState.Move, s) : cc.error("can't find road.");
};
e.Ins = new e();
return e;
}();
n.default = l;
cc._RF.pop();
}, {
"../../Astar/A_star_2.0": "A_star_2.0",
"../../Core/Dungeon/DungeonFactory": "DungeonFactory",
"../../Core/Manager/ResourceManager": "ResourceManager",
"../../Core/Manager/SceneManager": "SceneManager",
"../Obj/RoleMgr": "RoleMgr",
"./Map": "Map",
"./MapConfig": "MapConfig"
} ],
Map: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "452ccXNpjhO7pGFw1kxHWVh", "Map");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../../Core/Utils/GameUtils"), r = e("./MapConfig"), s = e("../Obj/BaseObj"), a = e("../../Core/Dungeon/DungeonFactory"), c = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.name = "Map";
t.anchorX = 0;
t.anchorY = 1;
t.x = 0;
t.y = 0;
return t;
}
t.prototype.Init = function(e, t) {
t && t.length && (this._GirdType = t);
for (var n, o = e[0].length, i = e.length, s = 0; s < i; s++) for (var c = 0; c < o; c++) if (null !== e[s][c]) {
if ((n = e[s][c].type) === a.Tile.blank) continue;
this.addChild(this.createGird(n, c, s));
}
this.setContentSize(cc.size(e[0].length * r.default.GirdWidth, e.length * r.default.GirdHeight));
};
Object.defineProperty(t.prototype, "GirdType", {
set: function(e) {
(e || e.length) && (this._GirdType = e);
},
enumerable: !0,
configurable: !0
});
t.prototype.createGird = function(e, t, n) {
var o;
(o = cc.instantiate(this._GirdType[0])).position = i.default.TransGirdPosition(t, n, r.default.GirdWidth, r.default.GirdHeight);
return o;
};
t.prototype.UnInit = function() {
this.destroy();
};
return t;
}(s.BaseObj);
n.Map = c;
cc._RF.pop();
}, {
"../../Core/Dungeon/DungeonFactory": "DungeonFactory",
"../../Core/Utils/GameUtils": "GameUtils",
"../Obj/BaseObj": "BaseObj",
"./MapConfig": "MapConfig"
} ],
MathUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1510cScwuJN3pEVLd+Inuj7", "MathUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.randomQueue = function(e) {
var t = Math.round(this.getSameRandom(this.seed, e.length - 1, 0));
return e.splice(t, 1)[0];
};
e.getPosition = function(e, t, n, o, i, r, s, a) {
var c = r + a % e * (o + t), u = -(s + Math.floor(a / e) * (i + n));
return cc.v2(c, u);
};
e.getSameRandom = function(e, t, n) {
void 0 === t && (t = 1);
void 0 === n && (n = 0);
return n + (9301 * e + 49297) % 233280 / 233280 * (t - n);
};
e.decimalsToFractional = function(e) {
var t = 100, n = 100 * e.toFixed(2), o = function() {
for (var e = t > n ? t : n; e > 1; e--) if (Number.isInteger(n / e) && Number.isInteger(t / e)) {
n /= e;
t /= e;
o();
}
};
o();
return n + "/" + t;
};
e.berzierRadio = function(e, t, n, o) {
var i = t.x, r = n.x, s = o.x, a = t.y, c = n.y, u = o.y, l = this.bezierAt(0, i, r, s, e), p = this.bezierAt(0, a, c, u, e);
return cc.v2(l, p);
};
e.bezierAt = function(e, t, n, o, i) {
return Math.pow(1 - i, 3) * e + 3 * i * Math.pow(1 - i, 2) * t + 3 * Math.pow(i, 2) * (1 - i) * n + Math.pow(i, 3) * o;
};
e.removeSameNumByRowAndCol = function(e, t, n, o, i) {
for (var r = 0; r < e.length; r++) for (var s = e[r], a = function(a) {
if (s[a] !== n) {
for (var c = [], u = [], l = 0; l < t; l++) {
var p = l + a, h = r + l;
p < s.length && c.push({
val: s[p],
pos: cc.v2(p, r)
});
h < e.length && u.push({
val: e[h][a],
pos: cc.v2(a, h)
});
}
var f = !c.some(function(e) {
return e.val != c[0].val;
}) && c.length >= t, d = !u.some(function(e) {
return e.val != u[0].val;
}) && u.length >= t;
if (f) {
o && i && o.call(i, c);
return {
value: void 0
};
}
if (d) {
o && i && o.call(i, u);
return {
value: void 0
};
}
}
}, c = 0; c < s.length; c++) {
var u = a(c);
if ("object" == typeof u) return u.value;
}
o && i && o.call(i, null);
};
e.sortAsc = function(e, t) {
return e < t ? -1 : e > t ? 1 : 0;
};
e.binSearch = function(t, n, o) {
void 0 === o && (o = null);
if (!t || 0 == t.length) return 0;
o || (o = e.sortAsc);
for (var i = 0, r = t.length - 1; i <= r; ) {
var s = r + i >> 1;
o(t[s], n) <= 0 ? i = s + 1 : r = s - 1;
}
return i;
};
e.resertNumberPosiv = function(e) {
return 1 + ~e;
};
e.getDouble = function(e, t) {
return cc.v2(e % t, Math.floor(e / t));
};
e.getAngleByRadius = function(e) {
return 180 * e / Math.PI;
};
e.getRadiusByAngle = function(e) {
return e * Math.PI / 180;
};
e.lerp = function(e, t, n) {
return t * n + e * (1 - n);
};
e.getAngleByDot = function(e, t) {
e = e.normalizeSelf();
t = t.normalizeSelf();
return this.getAngleByRadius(Math.acos(t.dot(e)));
};
e.getTotalNum = function(e) {
return e.length ? e.reduce(function(e, t, n, o) {
return e + t;
}) : 0;
};
e.LineIntersectRect = function(e, t, n) {
var o = function(e) {
return {
leftDown: cc.v2(e.xMin, e.yMin),
leftUp: cc.v2(e.xMin, e.yMax),
RightUp: cc.v2(e.xMax, e.yMax),
RigtDown: cc.v2(e.xMax, e.yMin)
};
}(n);
return !!this.LineIntersectLine(e, t, o.leftDown, o.leftUp) || (!!this.LineIntersectLine(e, t, o.leftUp, o.RightUp) || (!!this.LineIntersectLine(e, t, o.RightUp, o.RigtDown) || !!this.LineIntersectLine(e, t, o.RigtDown, o.leftDown)));
};
e.LineIntersectLine = function(e, t, n, o) {
return this.QuickReject(e, t, n, o) && this.Straddle(e, t, n, o);
};
e.QuickReject = function(e, t, n, o) {
var i = Math.max(e.x, t.x), r = Math.max(e.y, t.y), s = Math.min(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(n.x, o.x), u = Math.max(n.y, o.y), l = Math.min(n.x, o.x), p = Math.min(n.y, o.y);
return !(i < l || r < p || c < s || u < a);
};
e.Straddle = function(e, t, n, o) {
var i = e.x, r = t.x, s = e.y, a = t.y, c = n.x, u = o.x, l = n.y, p = o.y;
return !(((i - c) * (p - l) - (s - l) * (u - c)) * ((r - c) * (p - l) - (a - l) * (u - c)) > 0 || ((c - i) * (a - s) - (l - s) * (r - i)) * ((u - i) * (a - s) - (p - s) * (r - i)) > 0);
};
e.seed = 0;
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
MazeFactory: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f48e7eKqGBD05mIeoTKbPET", "MazeFactory");
cc._RF.pop();
}, {} ],
MessageDispatcher: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a1fb4PNNYlE04Cnsj2ONd0y", "MessageDispatcher");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./MsgInfo"), i = e("./EntityManager"), r = e("../../../Core/Manager/TimerManager"), s = function() {
function e() {}
e.prototype.m_Dispatcher = function(e, t) {
e && e.HandleMessage(t);
};
e.prototype.DispatchMessage = function(e, t, n, s, a) {
void 0 === a && (a = -1);
var c = new o.MsgInfo(e, t, n, Date.now(), s), u = i.EntityManager.Instance.GetEntityById(t);
-1 === a ? this.m_Dispatcher(u, c) : 0 === a ? r.default.ins().doNext(this.m_Dispatcher, this, [ u, c ]) : r.default.ins().doTimerDelay(Date.now(), 1e3 * a, 1, this.m_Dispatcher, this, [ u, c ]);
};
e.Instance = new e();
return e;
}();
n.MessageDispatcher = s;
cc._RF.pop();
}, {
"../../../Core/Manager/TimerManager": "TimerManager",
"./EntityManager": "EntityManager",
"./MsgInfo": "MsgInfo"
} ],
MessageType: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "203dbXKmrVMgJs12emtCiCc", "MessageType");
Object.defineProperty(n, "__esModule", {
value: !0
});
(function(e) {
e[e.Hi_Baby_IamGohome = 0] = "Hi_Baby_IamGohome";
e[e.Eat_Dinner = 1] = "Eat_Dinner";
e[e.Eat_Complete = 2] = "Eat_Complete";
})(n.MessageType || (n.MessageType = {}));
cc._RF.pop();
}, {} ],
MinerGlobalState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "47c5bcjhpND6KqlgYZo0Omb", "MinerGlobalState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.prototype.onEnter = function(e) {};
e.prototype.onExit = function(e) {};
e.prototype.Execute = function(e) {};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.MinerGlobalState = o;
cc._RF.pop();
}, {} ],
Miner: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d4edaKshKpE9riR/K2WZtDt", "Miner");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BaseGameEntity"), r = e("../Config/LoncationType"), s = e("../Config/EntityConfig"), a = e("../State/StateMachine"), c = e("../State/MinerState/EnterMineAndDigForNugget"), u = e("../State/MinerState/MinerGlobalState"), l = function(e) {
o(t, e);
function t(t) {
var n = e.call(this, t) || this;
n.m_StateMachine = new a.StateMachine(n);
n.m_StateMachine.CurrState = c.EnterMineAndDigForNugget.Instance;
n.m_StateMachine.GlobalState = u.MinerGlobalState.Instance;
n.m_GoldGarried = 0;
n.m_MoneyInBank = 0;
n.m_Thirst = 0;
n.m_Fatigue = 0;
setInterval(function() {
return n.update();
}, 1e3);
return n;
}
Object.defineProperty(t.prototype, "Location", {
get: function() {
return this.m_Location;
},
set: function(e) {
e != this.m_Location && (this.m_Location = e);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "GoldGarried", {
get: function() {
return this.m_GoldGarried;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "MoneyInBank", {
get: function() {
return this.m_MoneyInBank;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Thirst", {
get: function() {
return this.m_Thirst;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "Fatigue", {
get: function() {
return this.m_Fatigue;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "StateMachine", {
get: function() {
return this.m_StateMachine;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isInMineral", {
get: function() {
return this.m_Location === r.LoncationType.Mineral_Estate;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isInBank", {
get: function() {
return this.m_Location === r.LoncationType.Bank;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isInHome", {
get: function() {
return this.m_Location === r.LoncationType.Home;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isInBar", {
get: function() {
return this.m_Location === r.LoncationType.Bar;
},
enumerable: !0,
configurable: !0
});
t.prototype.addMinerGoldNum = function(e) {
isNaN(e) || e <= 0 || (this.m_GoldGarried += e);
};
t.prototype.updateMinerMoneyBank = function() {
this.m_MoneyInBank += this.m_GoldGarried;
this.m_GoldGarried = 0;
};
t.prototype.updateWrokingHealthy = function() {
this.m_Thirst += .2;
this.m_Fatigue += .2;
};
Object.defineProperty(t.prototype, "mineralGoldisFull", {
get: function() {
return this.m_GoldGarried >= s.MinerConfig.MaxGoldGarried;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "mineralMoneyIsFree", {
get: function() {
return this.m_MoneyInBank >= s.MinerConfig.MaxMoneyBank;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "mineralIsThirst", {
get: function() {
return this.m_Thirst >= s.MinerConfig.MaxThirst;
},
enumerable: !0,
configurable: !0
});
t.prototype.updateMineralThirst = function() {
this.m_Thirst -= 4;
};
Object.defineProperty(t.prototype, "isMineralFullThirst", {
get: function() {
return this.m_Thirst <= s.MinerConfig.MinThirst;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "mineralIsFatigue", {
get: function() {
return this.m_Fatigue >= s.MinerConfig.MaxFatigue;
},
enumerable: !0,
configurable: !0
});
t.prototype.updateMineralFatigue = function() {
this.m_Fatigue -= 1;
};
Object.defineProperty(t.prototype, "isMineralFullRelax", {
get: function() {
return this.m_Fatigue <= s.MinerConfig.MinFatigue;
},
enumerable: !0,
configurable: !0
});
t.prototype.update = function() {
this.m_Thirst += 1;
this.m_StateMachine.Update();
};
t.prototype.HandleMessage = function(e) {
return this.StateMachine.HandleMessage(e);
};
return t;
}(i.BaseGameEntity);
n.Miner = l;
cc._RF.pop();
}, {
"../Config/EntityConfig": "EntityConfig",
"../Config/LoncationType": "LoncationType",
"../State/MinerState/EnterMineAndDigForNugget": "EnterMineAndDigForNugget",
"../State/MinerState/MinerGlobalState": "MinerGlobalState",
"../State/StateMachine": "StateMachine",
"./BaseGameEntity": "BaseGameEntity"
} ],
MsgInfo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5fc1ejFb7ZNd7Ea3dimdKBY", "MsgInfo");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
return function(e, t, n, o, i) {
this.Sender = e;
this.Receiver = t;
this.MsgType = n;
this.DispatchTime = o;
this.ExtralInfo = i;
};
}();
n.MsgInfo = o;
cc._RF.pop();
}, {} ],
QuenchTirst: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4934fbW/mtARJ56kY36KqFG", "QuenchTirst");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Config/LoncationType"), i = e("./EnterMineAndDigForNugget"), r = function() {
function e() {}
e.prototype.onEnter = function(e) {
if (!e.isInHome) {
console.log(e.EntityName + "不在酒吧， 正在移动至酒吧. 处于: OnEnter");
e.Location = o.LoncationType.Home;
}
};
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开酒吧，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.Execute = function(e) {
if (!e.isInHome) {
console.log(e.EntityName + "不在酒吧， 正在移动至酒吧. 处于: OnEnter");
e.Location = o.LoncationType.Home;
}
e.isMineralFullThirst ? e.StateMachine.ChangeState(i.EnterMineAndDigForNugget.Instance) : e.updateMineralThirst();
console.log(e.EntityName + "正在酒吧喝酒，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.QuenchTirst = r;
cc._RF.pop();
}, {
"../../Config/LoncationType": "LoncationType",
"./EnterMineAndDigForNugget": "EnterMineAndDigForNugget"
} ],
RefenceTest: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c2796KirO9Dp7OMnGYt27Ty", "RefenceTest");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, s = r.ccclass, a = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.clone = null;
return t;
}
t.prototype.start = function() {
for (var e = 0; e < 1; e++) this.node.addChild(cc.instantiate(this.clone));
};
i([ a(cc.Node) ], t.prototype, "clone", void 0);
return t = i([ s ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {} ],
ResourceManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e9e82QUP1pLr6eWUR1bM7Mn", "ResourceManager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i, r = e("../Utils/SingleBase"), s = e("./TimerManager");
(function(e) {
e[e.None = 0] = "None";
e[e.Circle = 2] = "Circle";
e[e.Panel = 4] = "Panel";
})(i = n.loadingType || (n.loadingType = {}));
var a = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t._AssetsRef = {};
return t;
}
t.prototype.loadResByUrl = function(e, t, n, o) {
void 0 === t && (t = i.None);
if (e) {
o && (this._progressHandler = o);
n && (this._completeHandler = n);
this._loadUrl = e;
this._loadingType = t;
this._loadRes();
}
};
t.prototype.loadResByDir = function(e, t, n, o) {
void 0 === t && (t = i.None);
if (e) {
o && (this._progressHandler = o);
n && (this._completeHandler = n);
this._loadUrl = e;
this._loadingType = t;
this._loadDir();
}
};
t.prototype.loadGroupRes = function(e, t, n, o) {
void 0 === t && (t = i.None);
if (e.length) {
o && (this._progressHandler = o);
n && (this._completeHandler = n);
this._loadingType = t;
this._loadGroup = this._loadGroup;
this._loadingGroup();
}
};
t.prototype.destoryRes = function(e) {
var t = this;
this._updateAssetRef(e, function(e) {
--t._AssetsRef[e];
});
};
t.prototype._loadRes = function() {
cc.loader.loadRes(this._loadUrl, this._progressFunc.bind(this), this._completeFunc.bind(this));
};
t.prototype._loadDir = function() {
cc.loader.loadResDir(this._loadUrl, this._progressFunc.bind(this), this._completeFunc.bind(this));
};
t.prototype._loadingGroup = function() {
cc.loader.loadResArray(this._loadGroup, this._progressFunc.bind(this), this._completeFunc.bind(this));
};
t.prototype._progressFunc = function(e, t, n) {
this._progressHandler && this._progressHandler(e, t, n);
};
t.prototype._completeFunc = function(e, n) {
var o = this;
if (e) console.error(e); else {
this._updateAssetRef(n, function(e) {
o._AssetsRef[e] ? ++o._AssetsRef[e] : o._AssetsRef[e] = 1;
});
0 != Object.keys(this._AssetsRef).length && s.default.ins().doTimer(t.DealInterval, 0, this._dealAssets, this);
this._completeHandler && this._completeHandler(n);
this._progressHandler = this._completeHandler = null;
}
};
t.prototype._updateAssetRef = function(e, t) {
for (var n = 0, o = cc.loader.getDependsRecursively(e); n < o.length; n++) {
t(o[n]);
}
};
t.prototype._dealAssets = function() {
for (var e = 0, t = Object.keys(this._AssetsRef); e < t.length; e++) {
var n = t[e];
if (this._AssetsRef[n] <= 0) {
cc.loader.release(n);
this._AssetsRef[n] = null;
delete this._AssetsRef[n];
}
}
};
t.DealInterval = 3e4;
return t;
}(r.SingleBase);
n.default = a;
cc._RF.pop();
}, {
"../Utils/SingleBase": "SingleBase",
"./TimerManager": "TimerManager"
} ],
RewriteEngine: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8e476ksfKFKeIKYWii6Oip/", "RewriteEngine");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, s = r.ccclass, a = (r.property, function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype._updateGraphics = function() {
var e = this.getComponent(cc.PolygonCollider), t = this._graphics;
if (e && this._type == cc.Mask.Type.ELLIPSE) {
for (var n = e.points, o = 0; o < n.length; ++o) {
var i = n[o];
0 === o ? t.moveTo(i.x, i.y) : t.lineTo(i.x, i.y);
}
t.close();
}
cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ? t.stroke() : t.fill();
};
return t = i([ s ], t);
}(cc.Mask));
n.selfMask = a;
cc._RF.pop();
}, {} ],
RoleMgr: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "28ce0stm05BBboB4aZpD2cg", "RoleMgr");
var o = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i, r, s = e("../../Core/Utils/GameUtils"), a = e("../../Core/Manager/ResourceManager"), c = e("./BaseObj"), u = e("../Map/MapConfig"), l = e("../../Core/Manager/SceneManager"), p = e("../../Core/Utils/EffectUtils"), h = e("../../Core/Utils/FollowCamera"), f = cc._decorator, d = f.ccclass;
f.property;
(function(e) {
e.Idle = "Idle";
e.Move = "Move";
})(i = n.RoleState || (n.RoleState = {}));
(function(e) {
e[e.Up = 0] = "Up";
e[e.Down = 1] = "Down";
e[e.Left = 2] = "Left";
e[e.Right = 3] = "Right";
})(r = n.Dir || (n.Dir = {}));
var y = function() {
function e() {
this._nowPos = cc.v2(0, 1);
this._roleSpeed = .1;
this._roleContainer = new c.BaseObj();
this._roleContainer.anchorX = 0;
this._roleContainer.anchorY = 1;
this._roleContainer.name = "RoleContainer";
this._role = new c.BaseObj();
}
t = e;
Object.defineProperty(e.prototype, "roleContainer", {
get: function() {
return this._roleContainer;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "nowPos", {
get: function() {
return this._nowPos;
},
set: function(e) {
this._nowPos = e;
this._role.position = s.default.TransGirdPosition(this._nowPos.x, this._nowPos.y, u.default.GirdWidth, u.default.GirdHeight);
},
enumerable: !0,
configurable: !0
});
e.prototype.Init = function() {
this.loadRoleAssets();
l.default.ins().BattleLayer.addChild(this._roleContainer);
};
Object.defineProperty(e.prototype, "RoleState", {
set: function(e) {
if (this._roleState !== e) {
this._roleState = e;
this._ToggleState();
}
},
enumerable: !0,
configurable: !0
});
e.prototype.loadRoleAssets = function() {
var e = this;
a.default.ins().loadResByDir("Animation/Role/", a.loadingType.None, function(t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
if (o instanceof cc.Prefab) {
cc.instantiate(o).parent = e._role;
}
}
e.RoleState = i.Idle;
e.nowPos = e._nowPos;
e._roleContainer.addChild(e._role);
l.default.ins().MapCamera.addComponent(h.default).target = e._role;
});
};
e.prototype.EnterState = function(e, t) {
var n = this;
this.RoleState = e;
if (this._roleState === i.Move) {
this._nowPos = t.shift();
var o = function() {
var e = t.shift();
if (e) {
n._UpdateRoleDir(t[0]);
var r = s.default.TransGirdPosition(e.x, e.y, u.default.GirdWidth, u.default.GirdHeight);
p.default.moveNodeToPos(n._role, r, function() {
n._nowPos = e;
o();
}, n, n._roleSpeed);
} else n.RoleState = i.Idle;
};
this._role.stopAllActions();
o();
} else this._roleState, i.Idle;
};
e.prototype._UpdateRoleDir = function(e, t) {
if (e) {
var n;
e.x - this._nowPos.x > 0 && (n = r.Left);
e.x - this._nowPos.x < 0 && (n = r.Right);
e.y - this._nowPos.y < 0 && (n = r.Up);
e.y - this._nowPos.y > 0 && (n = r.Up);
n == r.Left || n == r.Right ? n == r.Left ? this._role.scaleX = 1 : this._role.scaleX = -1 : n != r.Up && n != r.Down || (n == r.Up ? this._role.scaleY = 1 : this._role.scaleY = -1);
}
};
e.prototype._ToggleState = function() {
for (var e = 0, t = this._role.children; e < t.length; e++) {
t[e].active = !1;
}
var n = s.default.GetNodeByPath("" + this._roleState, this._role);
s.default.Active(n, !0);
n.getComponent(cc.Animation).play();
};
var t;
e.Ins = new t();
return e = t = o([ d ], e);
}();
n.default = y;
cc._RF.pop();
}, {
"../../Core/Manager/ResourceManager": "ResourceManager",
"../../Core/Manager/SceneManager": "SceneManager",
"../../Core/Utils/EffectUtils": "EffectUtils",
"../../Core/Utils/FollowCamera": "FollowCamera",
"../../Core/Utils/GameUtils": "GameUtils",
"../Map/MapConfig": "MapConfig",
"./BaseObj": "BaseObj"
} ],
Role: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "dd521+OH9xHJYTCSTq+gdq3", "Role");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(e) {
o(t, e);
function t() {
return e.call(this) || this;
}
return t;
}(e("./BaseObj").BaseObj);
n.Role = i;
cc._RF.pop();
}, {
"./BaseObj": "BaseObj"
} ],
SceneManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ef627hxXEtBd6nAyqnPa5IA", "SceneManager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../Utils/SingleBase"), r = e("../../Game/Map/MapConfig"), s = function(e) {
o(t, e);
function t() {
return e.call(this) || this;
}
Object.defineProperty(t.prototype, "WindowSize", {
get: function() {
return this._windowSize;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "UIRoot", {
get: function() {
return this._UIRoot;
},
enumerable: !0,
configurable: !0
});
t.prototype.Init = function() {
var e = cc.director.getScene();
this._battleLayer = new cc.Node();
e.addChild(this._battleLayer, -1);
this._InitBattle();
this._InitMapCamera();
e && (this._UIRoot = e.getChildByName("Canvas"));
this._AddtoStage();
};
t.prototype._AddtoStage = function() {
this._uiLayer = new cc.Node();
this._panelLayer = new cc.Node();
this._effectLayer = new cc.Node();
this.UIRoot.addChild(this._uiLayer);
this.UIRoot.addChild(this._panelLayer);
this.UIRoot.addChild(this._effectLayer);
this._battleLayer.name = "BattleLayer";
this._uiLayer.name = "UILayer";
this._panelLayer.name = "PanelLayer";
this._effectLayer.name = "EffectLayer";
this.UIRoot.group = r.default.Group_UI;
};
t.prototype._InitMapCamera = function() {
this._mapCamera = new cc.Node();
this._mCamera = this._mapCamera.addComponent(cc.Camera);
this._mCamera.cullingMask = 1;
this._mapCamera.name = "MapCamera";
this.BattleLayer.addChild(this._mapCamera);
};
t.prototype.ConverToMapPos = function(e) {
e.x = e.x + (this._mapCamera.position.x - (this._windowSize.width >> 1)) * this._mCamera.zoomRatio;
e.y = this._windowSize.height - e.y - (this._mapCamera.position.y + (this._windowSize.height >> 1)) * this._mCamera.zoomRatio;
return e;
};
t.prototype._InitBattle = function() {
this.BattleLayer.anchorX = 0;
this.BattleLayer.anchorY = 1;
this._windowSize = cc.director.getWinSize();
this.BattleLayer.position = cc.v2(1 + ~(this._windowSize.width >> 1), this._windowSize.height >> 1);
this.BattleLayer.group = r.default.Group_Map;
};
Object.defineProperty(t.prototype, "BattleLayer", {
get: function() {
return this._battleLayer;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "UILayer", {
get: function() {
return this._uiLayer;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "PanelLayer", {
get: function() {
return this._panelLayer;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "EffectLayer", {
get: function() {
return this._effectLayer;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "MapCamera", {
get: function() {
return this._mapCamera.getComponent(cc.Camera);
},
enumerable: !0,
configurable: !0
});
return t;
}(i.SingleBase);
n.default = s;
cc._RF.pop();
}, {
"../../Game/Map/MapConfig": "MapConfig",
"../Utils/SingleBase": "SingleBase"
} ],
SingleBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "81e0048fbRKc5GUzMlsqqoW", "SingleBase");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.ins = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
if (!this._instance) {
var n = e.length;
0 == n ? this._instance = new this() : 1 == n ? this._instance = new this(e[0]) : 2 == n ? this._instance = new this(e[0], e[1]) : 3 == n ? this._instance = new this(e[0], e[1], e[2]) : 4 == n ? this._instance = new this(e[0], e[1], e[2], e[3]) : 5 == n && (this._instance = new this(e[0], e[1], e[2], e[3], e[4]));
}
return this._instance;
};
return e;
}();
n.SingleBase = o;
cc._RF.pop();
}, {} ],
SlayArrow: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e84aLuxiNDBJzGnQ5OD/Wn", "SlayArrow");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(e) {
o(t, e);
function t(t, n) {
var o = e.call(this) || this;
o._linkNums = 20;
o._tailArrows = [];
o._PI = 3.1415;
if (!t || !n) {
console.error("ctor SlayArrow error.");
return o;
}
o.createArrows(t, n);
o._headArrow.active = !1;
return o;
}
t.prototype.setArrowPos = function(e, t) {
var n = cc.v2(0, 0), o = cc.v2(0, 0);
n.x = e.x + .1 * (e.x - t.x);
n.y = t.y - .2 * (t.y - e.y);
o.y = t.y + .1 * (t.y - e.y);
o.x = e.x - .2 * (e.x - t.x);
var i = function(e, t, n) {
return cc.v2(e * (1 - n) * (1 - n) * (1 - n), t * (1 - n) * (1 - n) * (1 - n));
}, r = function(e, t, n) {
return cc.v2(e * n * (1 - n) * (1 - n), t * n * (1 - n) * (1 - n));
}, s = function(e, t, n) {
return cc.v2(e * n * n * (1 - n), t * n * n * (1 - n));
}, a = function(e, t, n) {
return cc.v2(e * n * n * n, t * n * n * n);
}, c = t.sub(e), u = 180 * Math.atan2(c.x, c.y) / this._PI + 270;
u = u % 360 > 180 ? 270 : 90;
var l = 0, p = this._tailArrows[0];
do {
var h = l / (this._tailArrows.length - 1), f = p, d = i(e.x, e.y, h), y = r(n.x, n.y, h).mulSelf(3), w = s(o.x, o.y, h).mulSelf(3), _ = a(t.x, t.y, h), g = d.addSelf(y).addSelf(w).addSelf(_), v = this.convertToNodeSpaceAR(g);
f.position = v;
f.active = !0;
if (0 === l) p.angle = 1 + ~u; else {
var m = this._tailArrows[l], M = this._tailArrows[l - 1], b = m.position.sub(M.position), S = Math.atan2(b.x, b.y);
m.angle = 1 + ~(180 * S / this._PI + 270);
}
l++;
p = this._tailArrows[l];
} while (p);
};
t.prototype.createArrows = function(e, t) {
this._headArrow = new cc.Node();
this._headArrow.addComponent(cc.Sprite).spriteFrame = e.spriteFrame;
this._headArrow.scale = 1.5;
for (var n = 0; n < this._linkNums; n++) {
var o = new cc.Node();
o.addComponent(cc.Sprite).spriteFrame = t.spriteFrame;
o.scale = n / this._linkNums + .5;
this._tailArrows.push(o);
this.addChild(o);
}
this._tailArrows.push(this._headArrow);
this.addChild(this._headArrow);
};
t.prototype.setActive = function(e) {
this.active = e;
};
return t;
}(cc.Node);
n.default = i;
cc._RF.pop();
}, {} ],
StateMachineDesignPattern: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "332d64gBbRGmLmItEeLViIW", "StateMachineDesignPattern");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function() {
return function() {};
}(), r = function() {
function e() {}
e.prototype.update = function() {
this.m_currState.Execute(this);
};
e.prototype.setCurrState = function(e) {
this.m_currState && this.m_currState.onExit(this);
if (e) {
this.m_preState = this.m_currState || e;
this.m_currState = e;
this.m_currState.onEnter(this);
}
};
return e;
}(), s = function(e) {
o(t, e);
function t() {
return e.call(this) || this;
}
t.prototype.Execute = function(e) {
e.isSafe() ? e.setCurrState(new a()) : e.MoveAwayFromEnemy();
};
t.prototype.onEnter = function(e) {};
t.prototype.onExit = function(e) {};
return t;
}(i), a = function(e) {
o(t, e);
function t() {
return e.call(this) || this;
}
t.prototype.Execute = function(e) {
e.isThreatened() ? e.setCurrState(new s()) : e.Snore();
};
t.prototype.onEnter = function(e) {};
t.prototype.onExit = function(e) {};
return t;
}(i), c = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t._threatenedCount = 0;
t.m_currState = new a();
setInterval(function() {
return t.update();
}, 1e3);
return t;
}
t.prototype.update = function() {
e.prototype.update.call(this);
++this._threatenedCount;
};
t.prototype.isSafe = function() {
return this._threatenedCount < 5 && this._threatenedCount >= 0;
};
t.prototype.isThreatened = function() {
return this._threatenedCount >= 5;
};
t.prototype.MoveAwayFromEnemy = function() {
this._threatenedCount = 0;
console.log("逃离敌人啦~");
};
t.prototype.Snore = function() {
console.log("zzzzzzz~");
};
return t;
}(r);
n.Role = c;
cc._RF.pop();
}, {} ],
StateMachine: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "66c7bNrp6JIiYycSbjgcpb2", "StateMachine");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(e) {
o(t, e);
function t(t) {
var n = e.call(this) || this;
if (!t) {
console.error("没有游戏实体.");
return n;
}
n.m_Entity = t;
return n;
}
Object.defineProperty(t.prototype, "PreState", {
set: function(e) {
this.m_PreState = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "GlobalState", {
set: function(e) {
this.m_GlobalState = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "CurrState", {
set: function(e) {
this.m_CurrState = e;
},
enumerable: !0,
configurable: !0
});
t.prototype.Update = function() {
this.m_GlobalState && this.m_GlobalState.Execute(this.m_Entity);
this.m_CurrState && this.m_CurrState.Execute(this.m_Entity);
};
t.prototype.ChangeState = function(e) {
if (this.m_CurrState) {
this.m_CurrState.onExit(this.m_Entity);
this.m_PreState = this.m_CurrState;
}
this.m_CurrState = e;
this.m_CurrState.onEnter(this.m_Entity);
};
t.prototype.RevertoPreviousState = function() {
this.ChangeState(this.m_PreState);
};
t.prototype.HandleMessage = function(e) {
return !(!this.m_CurrState || !this.m_CurrState.onMessage(this.m_Entity, e)) || !(!this.m_GlobalState || !this.m_GlobalState.onMessage(this.m_Entity, e));
};
return t;
}(e("./IStateMachine").IStateMachine);
n.StateMachine = i;
cc._RF.pop();
}, {
"./IStateMachine": "IStateMachine"
} ],
SystemUtils: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2025fr6yc1PCa65RQD9DaDW", "SystemUtils");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.isIos = function() {
return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};
e.delay = function(e) {
return new Promise(function(t) {
setTimeout(function() {
t();
}, e);
});
};
e.loadRes = function(e) {
return new Promise(function(t) {
cc.loader.load(e, function(e) {
t(e);
});
});
};
e.copyJosn = function(e) {
var t = {};
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
return t;
};
e.objectEquareValue = function(e, t) {
var n = !1;
for (var o in e) if (e.hasOwnProperty(o)) {
var i = e[o];
if (n = i instanceof Object ? this.eqalusObject(i, t) : i instanceof Array ? this.eqalusArray(i, t) : i === t) return n;
}
return n;
};
e.copyArrayJosn = function(e) {
for (var t = [], n = 0; n < e.length; n++) {
var o = e[n], i = {};
for (var r in o) o.hasOwnProperty(r) && (i[r] = o[r]);
t.push(i);
}
return t;
};
e.copyArray = function(e) {
for (var t = [], n = 0; n < e.length; n++) {
for (var o = e[n], i = [], r = 0; r < o.length; r++) {
var s = o[r];
i[r] = s;
}
t[n] = i;
}
return t;
};
e.eqalusArray = function(e, t) {
if (e.length != t.length) return !1;
for (var n = !0, o = 0; o < e.length; o++) {
var i = e[o];
-1 == t.indexOf(i) && (n = !1);
}
return n;
};
e.getNoteqalusByObjects = function(e, t) {
var n = [];
for (var o in e) e[o] !== t[o] && n.push(o);
return n;
};
e.eqalusObject = function(e, t) {
var n = Object.keys(e), o = Object.keys(t), i = this.eqalusArray(n, o);
if (i) for (var r = 0; r < n.length; r++) {
var s = n[r];
e[s] !== t[s] && (i = !1);
}
return i;
};
e.JSONStringly = function(e) {
if ("object" != typeof e || !e) return "";
var t;
try {
t = JSON.stringify(e);
} catch (e) {
t = "";
}
return t;
};
e.JSONParse = function(e) {
if (!e) return null;
var t;
try {
t = JSON.parse(e);
} catch (e) {
t = null;
}
return t;
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
TestStateMachine: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5845euBVRxIz4b5DRAa0AzQ", "TestStateMachine");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./west_world/Entity/Miner"), s = e("./west_world/Entity/Women"), a = e("./west_world/Config/EntityConfig"), c = e("./west_world/Message/EntityManager"), u = cc._decorator, l = u.ccclass, p = u.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t.text = "hello";
return t;
}
t.prototype.start = function() {
c.EntityManager.Instance.RegisterEntity(new r.Miner(a.EntityConfig.Miner));
c.EntityManager.Instance.RegisterEntity(new s.Women(a.EntityConfig.Women));
};
i([ p(cc.Label) ], t.prototype, "label", void 0);
i([ p ], t.prototype, "text", void 0);
return t = i([ l ], t);
}(cc.Component);
n.default = h;
cc._RF.pop();
}, {
"./west_world/Config/EntityConfig": "EntityConfig",
"./west_world/Entity/Miner": "Miner",
"./west_world/Entity/Women": "Women",
"./west_world/Message/EntityManager": "EntityManager"
} ],
Test: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "87c7c45ylRKHLdYN/ZVxGz4", "Test");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, s = r.ccclass, a = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.touch = null;
t.sps = null;
t.camera = null;
return t;
}
t.prototype.onEnable = function() {
var e = this;
this.touch.on(cc.Node.EventType.TOUCH_END, function(t) {
var n = t.getLocation();
console.log("w pos: ", n);
var o = e.touch.convertToNodeSpaceAR(t.getLocation());
console.log("c Pos :", o);
}, this);
};
t.prototype.update = function(e) {
var t = this.sps.getComponent(cc.Sprite).getMaterial(0);
console.log(t._props.range += .1);
};
i([ a(cc.Node) ], t.prototype, "touch", void 0);
i([ a(cc.Node) ], t.prototype, "sps", void 0);
i([ a(cc.Camera) ], t.prototype, "camera", void 0);
return t = i([ s ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {} ],
TimerManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0af55aiK4xCmaBcP5Hqpiji", "TimerManager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../Utils/GameUtils"), r = e("../Utils/MathUtils"), s = e("../Utils/SingleBase"), a = function() {
function e() {
this.delay = 0;
this.forever = !1;
this.repeatCount = 0;
this.exeTime = 0;
}
e.prototype.clear = function() {
this.method = null;
this.methodObj = null;
this.methodArgs = null;
this.onFinish = null;
this.finishObj = null;
this.forever = !1;
};
return e;
}();
n.TimerHandler = a;
var c = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t._handlers = [];
t.nexthandles = null;
t._HandlerPool = [];
t._currTime = 0;
t._currFrame = 0;
t._Timer = cc.director.getScheduler();
t._Timer.enableForTarget(t);
t._Timer.schedule(t.update, t, -1);
return t;
}
t.prototype.getFrameId = function() {
return this._currFrame;
};
t.prototype.getCurrTime = function() {
return this._currTime;
};
t.binFunc = function(e, t) {
return e.exeTime > t.exeTime ? -1 : e.exeTime < t.exeTime ? 1 : 0;
};
t.prototype._DeleteHandle = function(e) {
e.clear();
this._HandlerPool.push(e);
};
t.prototype.update = function(e) {
this._currFrame++;
this._currTime = i.default.GetTime();
var n = 0, o = this.nexthandles;
this.nexthandles = null;
if (o && o.length > 0) {
for (var s = 0, a = o; s < a.length; s++) {
var c = a[s];
c.method.apply(c.methodObj, c.methodArgs);
this._DeleteHandle(c);
}
o = null;
}
if (this._handlers.length <= 0) return !1;
for (var u = this._handlers[this._handlers.length - 1]; u.exeTime <= this._currTime; ) {
this.currHandler = u = this._handlers.pop();
u.method.apply(u.methodObj, u.methodArgs);
n = i.default.GetTime();
u.exeTime = n + u.delay;
var l = u.forever;
if (!l) if (u.repeatCount > 1) {
u.repeatCount--;
l = !0;
} else u.onFinish && u.onFinish.apply(u.finishObj);
if (l) {
var p = r.default.binSearch(this._handlers, u, t.binFunc);
this._handlers.splice(p, 0, u);
} else this._DeleteHandle(u);
if (n - this._currTime > 5) break;
if (this._handlers.length <= 0) break;
u = this._handlers[this._handlers.length - 1];
}
this.currHandler = null;
return !1;
};
t.prototype.create = function(e, n, o, i, s, c, u, l) {
void 0 === c && (c = []);
if (!(n < 0 || o < 0 || null == i)) {
var p = this._HandlerPool.pop() || new a();
p.forever = 0 == o;
p.repeatCount = o;
p.delay = n;
p.method = i;
p.methodObj = s;
p.methodArgs = c;
p.onFinish = u;
p.finishObj = l;
p.exeTime = e + n;
var h = r.default.binSearch(this._handlers, p, t.binFunc);
this._handlers.splice(h, 0, p);
}
};
t.prototype.doTimer = function(e, t, n, o, r, s, a) {
void 0 === r && (r = []);
void 0 === s && (s = null);
void 0 === a && (a = null);
this.create(i.default.GetTime(), e, t, n, o, r, s, a);
};
t.prototype.doTimerDelay = function(e, t, n, o, i, r, s, a) {
void 0 === r && (r = []);
void 0 === s && (s = null);
void 0 === a && (a = null);
this.create(e, t, n, o, i, r, s, a);
};
t.prototype.doNext = function(e, t, n) {
void 0 === n && (n = []);
var o = this._HandlerPool.pop() || new a();
o.method = e;
o.methodObj = t;
o.methodArgs = n;
this.nexthandles || (this.nexthandles = []);
this.nexthandles.push(o);
};
t.prototype.remove = function(e, t) {
var n = this.currHandler;
if (n && n.method == e && n.methodObj == t) {
n.forever = !1;
n.repeatCount = 0;
}
for (var o = this._handlers.length - 1; o >= 0; o--) {
var i = this._handlers[o];
if (i.method == e && i.methodObj == t) {
this._handlers.splice(o, 1);
this._DeleteHandle(i);
}
}
};
t.prototype.removeAll = function(e) {
var t = this.currHandler;
if (t && t.methodObj == e) {
t.forever = !1;
t.repeatCount = 0;
}
for (var n = this._handlers.length - 1; n >= 0; n--) {
var o = this._handlers[n];
if (o.methodObj == e) {
this._handlers.splice(n, 1);
this._DeleteHandle(o);
}
}
};
t.prototype.isExists = function(e, t) {
for (var n = 0, o = this._handlers; n < o.length; n++) {
var i = o[n];
if (i.method == e && i.methodObj == t) return !0;
}
return !1;
};
return t;
}(s.SingleBase);
n.default = c;
cc._RF.pop();
}, {
"../Utils/GameUtils": "GameUtils",
"../Utils/MathUtils": "MathUtils",
"../Utils/SingleBase": "SingleBase"
} ],
T: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d44a7AwvItF0Zkjp0JSUUpF", "T");
cc._RF.pop();
}, {} ],
TypeWriterComponent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "13709lqCaBPdpXXy3Fyo1Cc", "TypeWriterComponent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, s = r.ccclass, a = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.label = null;
t._typeWrite = "abcdefghijklstopqrstyzw. balabala....";
return t;
}
t.prototype.start = function() {
this.label.string = "";
this._array = this._typeWrite.split("");
};
t.prototype.lateUpdate = function() {
if (this._array.length) {
var e = this._array.shift();
this.label.string += e;
}
};
i([ a(cc.Label) ], t.prototype, "label", void 0);
return t = i([ s ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {} ],
Typewriter_Demo: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5980aicbqJBUL3+HbE0DXtM", "Typewriter_Demo");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, s = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s);
return r > 3 && s && Object.defineProperty(t, n, s), s;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = cc._decorator, s = r.ccclass, a = r.property, c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.showlabel = null;
t._isComplete = !1;
return t;
}
t.prototype.start = function() {
this.setTypestr("嘻嘻哈哈，哼哼哈嘿，嘻嘻哈哈，哼哼哈嘿嘻嘻哈哈，哼哼哈嘿嘻嘻哈哈，哼哼哈嘿");
};
t.prototype.onEnable = function() {
this.node.on(cc.Node.EventType.TOUCH_END, this.onlogic, this);
};
t.prototype.onDisable = function() {
this.node.off(cc.Node.EventType.TOUCH_END, this.onlogic, this);
};
t.prototype.setTypestr = function(e, t) {
void 0 === t && (t = 400);
var n = e;
this.node.anchorX = 0;
this.node.anchorY = 1;
this.node.width = t;
if (n) {
this._isComplete = !1;
this._str = n.split("");
this.schedule(this.updatelabelStr, .1);
} else this._isComplete = !0;
};
t.prototype.onlogic = function() {
if (this._isComplete) this.node.active = !1; else {
this.unschedule(this.updatelabelStr);
var e = this._str.join("");
this.showlabel.string += e;
this._isComplete = !0;
}
};
t.prototype.updatelabelStr = function() {
if (this._str.length) {
var e = this._str.shift();
this.showlabel.string += e;
} else {
this.unschedule(this.updatelabelStr);
this._isComplete = !0;
}
};
i([ a(cc.Label) ], t.prototype, "showlabel", void 0);
return t = i([ s ], t);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {} ],
VisitBankAndSaveGold: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8b7b2uHdf1KzZM7jBjrW7qh", "VisitBankAndSaveGold");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Config/LoncationType"), i = e("./GoHomeAndSleepReset"), r = e("./EnterMineAndDigForNugget"), s = function() {
function e() {}
e.prototype.onEnter = function(e) {
if (!e.isInBank) {
console.log(e.EntityName + "不在银行里， 正在移动至银行. 处于: OnEnter");
e.Location = o.LoncationType.Bank;
}
};
e.prototype.onExit = function(e) {
console.log(e.EntityName + "准备离开银行，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
};
e.prototype.Execute = function(e) {
if (e.isInBank) {
e.updateMinerMoneyBank();
e.mineralMoneyIsFree ? e.StateMachine.ChangeState(i.GoHomeAndSleepReset.Instance) : e.StateMachine.ChangeState(r.EnterMineAndDigForNugget.Instance);
console.log(e.EntityName + "正在银行存钱，当前状态：", "\n 手上现金数: " + e.GoldGarried, "\n 银行存款数: " + e.MoneyInBank, "\n 饥渴程度: " + e.Thirst, "\n 疲劳程度: " + e.Fatigue);
} else {
console.log(e.EntityName + "不在银行里， 正在移动至银行. 处于: Excute");
e.Location = o.LoncationType.Bank;
}
};
e.prototype.onMessage = function(e, t) {};
e.Instance = new e();
return e;
}();
n.VisitBankAndSaveGold = s;
cc._RF.pop();
}, {
"../../Config/LoncationType": "LoncationType",
"./EnterMineAndDigForNugget": "EnterMineAndDigForNugget",
"./GoHomeAndSleepReset": "GoHomeAndSleepReset"
} ],
WomenGlobalState: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "abdff93jt1MZ4DnPCbo20SV", "WomenGlobalState");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../../Message/MessageType"), i = e("./MakeDinnerState"), r = function() {
function e() {}
e.prototype.onEnter = function(e) {};
e.prototype.onExit = function(e) {};
e.prototype.Execute = function(e) {};
e.prototype.onMessage = function(e, t) {
if (t && t.MsgType === o.MessageType.Hi_Baby_IamGohome) {
console.log("老公回家了, 该去做饭啦~");
e.StateMachine.ChangeState(i.MakeDinnerState.Instance);
return !0;
}
};
e.Instance = new e();
return e;
}();
n.WomenGlobalState = r;
cc._RF.pop();
}, {
"../../Message/MessageType": "MessageType",
"./MakeDinnerState": "MakeDinnerState"
} ],
Women: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a9962xP2N9HiK34oNQsAcXy", "Women");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./BaseGameEntity"), r = e("../State/StateMachine"), s = e("../State/WomenState/KeepHouseState"), a = e("../State/WomenState/WomenGlobalState"), c = function(e) {
o(t, e);
function t(t) {
var n = e.call(this, t) || this;
n.m_GotoToiletDeg = 0;
n.m_StateMachine = new r.StateMachine(n);
n.m_StateMachine.CurrState = s.KeepHouseState.Instance;
n.m_StateMachine.GlobalState = a.WomenGlobalState.Instance;
setInterval(function() {
return n.update();
}, 1e3);
return n;
}
Object.defineProperty(t.prototype, "GotoToiletDeg", {
get: function() {
return this.m_GotoToiletDeg;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "StateMachine", {
get: function() {
return this.m_StateMachine;
},
enumerable: !0,
configurable: !0
});
t.prototype.UpdateGoToiletDet = function() {
this.m_GotoToiletDeg -= 2;
};
Object.defineProperty(t.prototype, "isWannaToilet", {
get: function() {
return this.m_GotoToiletDeg >= 10;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "isNotWannaToilet", {
get: function() {
return this.m_GotoToiletDeg <= 0;
},
enumerable: !0,
configurable: !0
});
t.prototype.update = function() {
this.m_GotoToiletDeg += 1;
this.m_StateMachine.Update();
};
t.prototype.HandleMessage = function(e) {
return this.StateMachine.HandleMessage(e);
};
return t;
}(i.BaseGameEntity);
n.Women = c;
cc._RF.pop();
}, {
"../State/StateMachine": "StateMachine",
"../State/WomenState/KeepHouseState": "KeepHouseState",
"../State/WomenState/WomenGlobalState": "WomenGlobalState",
"./BaseGameEntity": "BaseGameEntity"
} ],
dungeon: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f6d3f9bkTNNr6PjZGKDoPwK", "dungeon");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./room"), i = e("./tiles"), r = Math.floor, s = Math.random, a = Math.min, c = Math.max, u = function(e, t) {
return r(s() * (t - e) + e);
}, l = function(e) {
return e[r(s() * e.length)];
}, p = function() {
function e(e, t) {
this.size = {
x: e,
y: t
};
this.minRoomSize = 5;
this.maxRoomSize = 15;
this.maxNumRooms = 50;
this.maxRoomArea = 150;
this.addStairsUp = !0;
this.addStairsDown = !0;
this.rooms = [];
this.roomGrid = [];
}
e.prototype.getStairs = function() {
for (var e = {
up: null,
down: null
}, t = 0; t < this.rooms.length; t++) {
var n = this.rooms[t];
if (n.hasStairs()) for (var o = 0; o < n.size.y; o++) for (var r = 0; r < n.size.x; r++) n.tiles[o][r] === i.default.stairsUp ? e.up = {
x: n.pos.x + r,
y: n.pos.y + o
} : n.tiles[o][r] === i.default.stairsUp && (e.down = {
x: n.pos.x + r,
y: n.pos.y + o
});
}
return e;
};
e.prototype.generate = function() {
this.rooms = [];
this.roomGrid = Array(this.size.y);
for (var e = 0; e < this.size.y; e++) {
for (var t = Array(this.size.x), n = 0; n < this.size.x; n++) t[n] = [];
this.roomGrid[e] = t;
}
var a = this.createRandomRoom();
a.pos = {
x: r(this.size.x / 2) - r(a.size.x / 2),
y: r(this.size.y / 2) - r(a.size.y / 2)
};
this.addRoom(a);
for (var c = 5 * this.maxNumRooms; (this.maxNumRooms <= 0 || this.rooms.length < this.maxNumRooms) && c-- > 0; ) this.generateRoom();
for (var u = 0; u < this.rooms.length; u++) for (var l = this.getPotentiallyTouchingRooms(this.rooms[u]), p = 0; p < l.length; p++) o.default.areConnected(this.rooms[u], l[p]) || s() < .2 && this.addDoor(this.findNewDoorLocation(this.rooms[u], l[p]));
this.addStairsDown && this.addStairs(i.default.stairsDown);
this.addStairsUp && this.addStairs(i.default.stairsUp);
};
e.prototype.getFlattenedTiles = function() {
for (var e = Array(this.size.y), t = 0; t < this.size.y; t++) {
e[t] = Array(this.size.x);
for (var n = 0; n < this.size.x; n++) e[t][n] = null;
}
for (var o = 0; o < this.rooms.length; o++) {
var i = this.rooms[o];
for (t = 0; t < i.size.y; t++) for (n = 0; n < i.size.x; n++) 0 !== i.tiles[t][n] && (e[t + i.pos.y][n + i.pos.x] = {
type: i.tiles[t][n],
hasBeenSeen: !1
});
}
return e;
};
e.prototype.getCollisionMap = function() {
for (var e = Array(this.size.y), t = 0; t < this.size.y; t++) {
e[t] = Array(this.size.x);
for (var n = 0; n < this.size.x; n++) e[t][n] = 0;
}
for (var o = 0; o < this.rooms.length; o++) {
var r = this.rooms[o];
for (t = 0; t < r.size.y; t++) for (n = 0; n < r.size.x; n++) {
var s = 0;
switch (r.tiles[t][n]) {
case i.default.wall:
s = 1;
break;

case i.default.stairsUp:
s = 2;
break;

case i.default.stairsDown:
s = 3;
}
e[t + r.pos.y][n + r.pos.x] = s;
}
}
return e;
};
e.prototype.roomIntersect = function(e, t) {
var n = e.pos.x, o = e.pos.y, i = e.size.x, r = e.size.y, s = t.pos.x, a = t.pos.y, c = t.size.x, u = t.size.y;
return !(n + i <= s + 1 || n >= s + c - 1 || o + r <= a + 1 || o >= a + u - 1);
};
e.prototype.canFitRoom = function(e) {
if (e.pos.x < 0 || e.pos.x + e.size.x > this.size.x - 1) return !1;
if (e.pos.y < 0 || e.pos.y + e.size.y > this.size.y - 1) return !1;
for (var t = 0; t < this.rooms.length; t++) {
var n = this.rooms[t];
if (this.roomIntersect(e, n)) return !1;
}
return !0;
};
e.prototype.getPotentiallyTouchingRooms = function(e) {
for (var t = [], n = function(n, o, i) {
for (var r = i[o][n], s = 0; s < r.length; s++) if (r[s] !== e && t.indexOf(r[s]) < 0) {
var a = n - r[s].pos.x, c = o - r[s].pos.y;
(a > 0 && a < r[s].size.x - 1 || c > 0 && c < r[s].size.y - 1) && t.push(r[s]);
}
}, o = e.pos.x + 1; o < e.pos.x + e.size.x - 1; o++) {
n(o, e.pos.y, this.roomGrid);
n(o, e.pos.y + e.size.y - 1, this.roomGrid);
}
for (var i = e.pos.y + 1; i < e.pos.y + e.size.y - 1; i++) {
n(e.pos.x, i, this.roomGrid);
n(e.pos.x + e.size.x - 1, i, this.roomGrid);
}
return t;
};
e.prototype.findNewDoorLocation = function(e, t) {
var n = {
x: -1,
y: -1
}, o = -1;
e.pos.y === t.pos.y - e.size.y + 1 ? o = 0 : e.pos.x === t.pos.x - e.size.x + 1 ? o = 1 : e.pos.x === t.pos.x + t.size.x - 1 ? o = 2 : e.pos.y === t.pos.y + t.size.y - 1 && (o = 3);
switch (o) {
case 0:
n.x = u(r(c(t.pos.x, e.pos.x) + 1), r(a(t.pos.x + t.size.x, e.pos.x + e.size.x) - 1));
n.y = t.pos.y;
break;

case 1:
n.x = t.pos.x;
n.y = u(r(c(t.pos.y, e.pos.y) + 1), r(a(t.pos.y + t.size.y, e.pos.y + e.size.y) - 1));
break;

case 2:
n.x = e.pos.x;
n.y = u(r(c(t.pos.y, e.pos.y) + 1), r(a(t.pos.y + t.size.y, e.pos.y + e.size.y) - 1));
break;

case 3:
n.x = u(r(c(t.pos.x, e.pos.x) + 1), r(a(t.pos.x + t.size.x, e.pos.x + e.size.x) - 1));
n.y = e.pos.y;
}
return n;
};
e.prototype.findRoomAttachment = function(e) {
var t = l(this.rooms), n = {
x: 0,
y: 0
};
switch (u(0, 4)) {
case 0:
n.x = u(t.pos.x - e.size.x + 3, t.pos.x + t.size.x - 2);
n.y = t.pos.y - e.size.y + 1;
break;

case 1:
n.x = t.pos.x - e.size.x + 1;
n.y = u(t.pos.y - e.size.y + 3, t.pos.y + t.size.y - 2);
break;

case 2:
n.x = t.pos.x + t.size.x - 1;
n.y = u(t.pos.y - e.size.y + 3, t.pos.y + t.size.y - 2);
break;

case 3:
n.x = u(t.pos.x - e.size.x + 3, t.pos.x + t.size.x - 2);
n.y = t.pos.y + t.size.y - 1;
}
return {
position: n,
target: t
};
};
e.prototype.addRoom = function(e) {
if (!this.canFitRoom(e)) return !1;
this.rooms.push(e);
for (var t = e.pos.y; t < e.pos.y + e.size.y; t++) for (var n = e.pos.x; n < e.pos.x + e.size.x; n++) {
var o = this.roomGrid[t][n];
o.push(e);
this.roomGrid[t][n] = o;
}
return !0;
};
e.prototype.addDoor = function(e) {
for (var t = this.roomGrid[e.y][e.x], n = 0; n < t.length; n++) {
var o = t[n], r = e.x - o.pos.x, s = e.y - o.pos.y;
o.tiles[s][r] = i.default.door;
}
};
e.prototype.createRandomRoom = function() {
var e = 0, t = 0, n = 0;
do {
n = (e = u(this.minRoomSize, this.maxRoomSize)) * (t = u(this.minRoomSize, this.maxRoomSize));
} while (this.maxRoomArea > 0 && n > this.maxRoomArea);
return new o.default(e, t);
};
e.prototype.generateRoom = function() {
for (var e = this.createRandomRoom(), t = 150; t-- > 0; ) {
var n = this.findRoomAttachment(e);
e.pos = n.position;
if (this.addRoom(e)) {
this.addDoor(this.findNewDoorLocation(e, n.target));
break;
}
}
};
e.prototype.addStairs = function(e) {
var t = null;
do {
t = l(this.rooms);
} while (t.getDoorLocations().length > 1 || t.hasStairs());
for (var n = [], o = 1; o < t.size.y - 2; o++) for (var r = 1; r < t.size.x - 2; r++) t.tiles[o][r] === i.default.floor && t.tiles[o - 1][r] !== i.default.door && t.tiles[o + 1][r] !== i.default.door && t.tiles[o][r - 1] !== i.default.door && t.tiles[o][r + 1] !== i.default.door && n.push({
x: r,
y: o
});
var s = l(n);
t.tiles[s.y][s.x] = e;
};
return e;
}();
n.default = p;
cc._RF.pop();
}, {
"./room": "room",
"./tiles": "tiles"
} ],
gusture: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "787a1Ve9lZFyJnO/Vwc1gep", "gusture");
Object.defineProperty(n, "__esModule", {
value: !0
});
function o(e, t) {
this.X = e;
this.Y = t;
}
function i(e, t, n, o) {
this.X = e;
this.Y = t;
this.Width = n;
this.Height = o;
}
function r(e, t) {
this.Name = e;
this.Points = y(t, c);
var n = w(this.Points);
this.Points = _(this.Points, -n);
this.Points = g(this.Points, u);
this.Points = v(this.Points, l);
this.Vector = m(this.Points);
}
function s(e, t, n) {
this.Name = e;
this.Score = t;
this.Time = n;
}
var a = 16, c = 64, u = 250, l = new o(0, 0), p = .5 * Math.sqrt(u * u + u * u), h = P(45), f = P(2), d = .5 * (-1 + Math.sqrt(5));
function y(e, t) {
for (var n = T(e) / (t - 1), i = 0, r = new Array(e[0]), s = 1; s < e.length; s++) {
var a = O(e[s - 1], e[s]);
if (i + a >= n) {
var c = e[s - 1].X + (n - i) / a * (e[s].X - e[s - 1].X), u = e[s - 1].Y + (n - i) / a * (e[s].Y - e[s - 1].Y), l = new o(c, u);
r[r.length] = l;
e.splice(s, 0, l);
i = 0;
} else i += a;
}
r.length == t - 1 && (r[r.length] = new o(e[e.length - 1].X, e[e.length - 1].Y));
return r;
}
function w(e) {
var t = E(e);
return Math.atan2(t.Y - e[0].Y, t.X - e[0].X);
}
function _(e, t) {
for (var n = E(e), i = Math.cos(t), r = Math.sin(t), s = new Array(), a = 0; a < e.length; a++) {
var c = (e[a].X - n.X) * i - (e[a].Y - n.Y) * r + n.X, u = (e[a].X - n.X) * r + (e[a].Y - n.Y) * i + n.Y;
s[s.length] = new o(c, u);
}
return s;
}
function g(e, t) {
for (var n = R(e), i = new Array(), r = 0; r < e.length; r++) {
var s = e[r].X * (t / n.Width), a = e[r].Y * (t / n.Height);
i[i.length] = new o(s, a);
}
return i;
}
function v(e, t) {
for (var n = E(e), i = new Array(), r = 0; r < e.length; r++) {
var s = e[r].X + t.X - n.X, a = e[r].Y + t.Y - n.Y;
i[i.length] = new o(s, a);
}
return i;
}
function m(e) {
for (var t = 0, n = new Array(), o = 0; o < e.length; o++) {
n[n.length] = e[o].X;
n[n.length] = e[o].Y;
t += e[o].X * e[o].X + e[o].Y * e[o].Y;
}
var i = Math.sqrt(t);
for (o = 0; o < n.length; o++) n[o] /= i;
return n;
}
function M(e, t) {
for (var n = 0, o = 0, i = 0; i < e.length; i += 2) {
n += e[i] * t[i] + e[i + 1] * t[i + 1];
o += e[i] * t[i + 1] - e[i + 1] * t[i];
}
var r = Math.atan(o / n);
return Math.acos(n * Math.cos(r) + o * Math.sin(r));
}
function b(e, t, n, o, i) {
for (var r = d * n + (1 - d) * o, s = S(e, t, r), a = (1 - d) * n + d * o, c = S(e, t, a); Math.abs(o - n) > i; ) if (s < c) {
o = a;
a = r;
c = s;
s = S(e, t, r = d * n + (1 - d) * o);
} else {
n = r;
r = a;
s = c;
c = S(e, t, a = (1 - d) * n + d * o);
}
return Math.min(s, c);
}
function S(e, t, n) {
return x(_(e, n), t.Points);
}
function E(e) {
for (var t = 0, n = 0, i = 0; i < e.length; i++) {
t += e[i].X;
n += e[i].Y;
}
t /= e.length;
n /= e.length;
return new o(t, n);
}
function R(e) {
for (var t = Infinity, n = -Infinity, o = Infinity, r = -Infinity, s = 0; s < e.length; s++) {
t = Math.min(t, e[s].X);
o = Math.min(o, e[s].Y);
n = Math.max(n, e[s].X);
r = Math.max(r, e[s].Y);
}
return new i(t, o, n - t, r - o);
}
function x(e, t) {
for (var n = 0, o = 0; o < e.length; o++) n += O(e[o], t[o]);
return n / e.length;
}
function T(e) {
for (var t = 0, n = 1; n < e.length; n++) t += O(e[n - 1], e[n]);
return t;
}
function O(e, t) {
var n = t.X - e.X, o = t.Y - e.Y;
return Math.sqrt(n * n + o * o);
}
function P(e) {
return e * Math.PI / 180;
}
n.Gus = new function() {
this.Unistrokes = new Array(a);
this.Unistrokes[0] = new r("triangle", new Array(new o(137, 139), new o(135, 141), new o(133, 144), new o(132, 146), new o(130, 149), new o(128, 151), new o(126, 155), new o(123, 160), new o(120, 166), new o(116, 171), new o(112, 177), new o(107, 183), new o(102, 188), new o(100, 191), new o(95, 195), new o(90, 199), new o(86, 203), new o(82, 206), new o(80, 209), new o(75, 213), new o(73, 213), new o(70, 216), new o(67, 219), new o(64, 221), new o(61, 223), new o(60, 225), new o(62, 226), new o(65, 225), new o(67, 226), new o(74, 226), new o(77, 227), new o(85, 229), new o(91, 230), new o(99, 231), new o(108, 232), new o(116, 233), new o(125, 233), new o(134, 234), new o(145, 233), new o(153, 232), new o(160, 233), new o(170, 234), new o(177, 235), new o(179, 236), new o(186, 237), new o(193, 238), new o(198, 239), new o(200, 237), new o(202, 239), new o(204, 238), new o(206, 234), new o(205, 230), new o(202, 222), new o(197, 216), new o(192, 207), new o(186, 198), new o(179, 189), new o(174, 183), new o(170, 178), new o(164, 171), new o(161, 168), new o(154, 160), new o(148, 155), new o(143, 150), new o(138, 148), new o(136, 148)));
this.Unistrokes[1] = new r("x", new Array(new o(87, 142), new o(89, 145), new o(91, 148), new o(93, 151), new o(96, 155), new o(98, 157), new o(100, 160), new o(102, 162), new o(106, 167), new o(108, 169), new o(110, 171), new o(115, 177), new o(119, 183), new o(123, 189), new o(127, 193), new o(129, 196), new o(133, 200), new o(137, 206), new o(140, 209), new o(143, 212), new o(146, 215), new o(151, 220), new o(153, 222), new o(155, 223), new o(157, 225), new o(158, 223), new o(157, 218), new o(155, 211), new o(154, 208), new o(152, 200), new o(150, 189), new o(148, 179), new o(147, 170), new o(147, 158), new o(147, 148), new o(147, 141), new o(147, 136), new o(144, 135), new o(142, 137), new o(140, 139), new o(135, 145), new o(131, 152), new o(124, 163), new o(116, 177), new o(108, 191), new o(100, 206), new o(94, 217), new o(91, 222), new o(89, 225), new o(87, 226), new o(87, 224)));
this.Unistrokes[2] = new r("rectangle", new Array(new o(78, 149), new o(78, 153), new o(78, 157), new o(78, 160), new o(79, 162), new o(79, 164), new o(79, 167), new o(79, 169), new o(79, 173), new o(79, 178), new o(79, 183), new o(80, 189), new o(80, 193), new o(80, 198), new o(80, 202), new o(81, 208), new o(81, 210), new o(81, 216), new o(82, 222), new o(82, 224), new o(82, 227), new o(83, 229), new o(83, 231), new o(85, 230), new o(88, 232), new o(90, 233), new o(92, 232), new o(94, 233), new o(99, 232), new o(102, 233), new o(106, 233), new o(109, 234), new o(117, 235), new o(123, 236), new o(126, 236), new o(135, 237), new o(142, 238), new o(145, 238), new o(152, 238), new o(154, 239), new o(165, 238), new o(174, 237), new o(179, 236), new o(186, 235), new o(191, 235), new o(195, 233), new o(197, 233), new o(200, 233), new o(201, 235), new o(201, 233), new o(199, 231), new o(198, 226), new o(198, 220), new o(196, 207), new o(195, 195), new o(195, 181), new o(195, 173), new o(195, 163), new o(194, 155), new o(192, 145), new o(192, 143), new o(192, 138), new o(191, 135), new o(191, 133), new o(191, 130), new o(190, 128), new o(188, 129), new o(186, 129), new o(181, 132), new o(173, 131), new o(162, 131), new o(151, 132), new o(149, 132), new o(138, 132), new o(136, 132), new o(122, 131), new o(120, 131), new o(109, 130), new o(107, 130), new o(90, 132), new o(81, 133), new o(76, 133)));
this.Unistrokes[3] = new r("circle", new Array(new o(127, 141), new o(124, 140), new o(120, 139), new o(118, 139), new o(116, 139), new o(111, 140), new o(109, 141), new o(104, 144), new o(100, 147), new o(96, 152), new o(93, 157), new o(90, 163), new o(87, 169), new o(85, 175), new o(83, 181), new o(82, 190), new o(82, 195), new o(83, 200), new o(84, 205), new o(88, 213), new o(91, 216), new o(96, 219), new o(103, 222), new o(108, 224), new o(111, 224), new o(120, 224), new o(133, 223), new o(142, 222), new o(152, 218), new o(160, 214), new o(167, 210), new o(173, 204), new o(178, 198), new o(179, 196), new o(182, 188), new o(182, 177), new o(178, 167), new o(170, 150), new o(163, 138), new o(152, 130), new o(143, 129), new o(140, 131), new o(129, 136), new o(126, 139)));
this.Unistrokes[4] = new r("check", new Array(new o(91, 185), new o(93, 185), new o(95, 185), new o(97, 185), new o(100, 188), new o(102, 189), new o(104, 190), new o(106, 193), new o(108, 195), new o(110, 198), new o(112, 201), new o(114, 204), new o(115, 207), new o(117, 210), new o(118, 212), new o(120, 214), new o(121, 217), new o(122, 219), new o(123, 222), new o(124, 224), new o(126, 226), new o(127, 229), new o(129, 231), new o(130, 233), new o(129, 231), new o(129, 228), new o(129, 226), new o(129, 224), new o(129, 221), new o(129, 218), new o(129, 212), new o(129, 208), new o(130, 198), new o(132, 189), new o(134, 182), new o(137, 173), new o(143, 164), new o(147, 157), new o(151, 151), new o(155, 144), new o(161, 137), new o(165, 131), new o(171, 122), new o(174, 118), new o(176, 114), new o(177, 112), new o(177, 114), new o(175, 116), new o(173, 118)));
this.Unistrokes[5] = new r("caret", new Array(new o(79, 245), new o(79, 242), new o(79, 239), new o(80, 237), new o(80, 234), new o(81, 232), new o(82, 230), new o(84, 224), new o(86, 220), new o(86, 218), new o(87, 216), new o(88, 213), new o(90, 207), new o(91, 202), new o(92, 200), new o(93, 194), new o(94, 192), new o(96, 189), new o(97, 186), new o(100, 179), new o(102, 173), new o(105, 165), new o(107, 160), new o(109, 158), new o(112, 151), new o(115, 144), new o(117, 139), new o(119, 136), new o(119, 134), new o(120, 132), new o(121, 129), new o(122, 127), new o(124, 125), new o(126, 124), new o(129, 125), new o(131, 127), new o(132, 130), new o(136, 139), new o(141, 154), new o(145, 166), new o(151, 182), new o(156, 193), new o(157, 196), new o(161, 209), new o(162, 211), new o(167, 223), new o(169, 229), new o(170, 231), new o(173, 237), new o(176, 242), new o(177, 244), new o(179, 250), new o(181, 255), new o(182, 257)));
this.Unistrokes[6] = new r("zig-zag", new Array(new o(307, 216), new o(333, 186), new o(356, 215), new o(375, 186), new o(399, 216), new o(418, 186)));
this.Unistrokes[7] = new r("arrow", new Array(new o(68, 222), new o(70, 220), new o(73, 218), new o(75, 217), new o(77, 215), new o(80, 213), new o(82, 212), new o(84, 210), new o(87, 209), new o(89, 208), new o(92, 206), new o(95, 204), new o(101, 201), new o(106, 198), new o(112, 194), new o(118, 191), new o(124, 187), new o(127, 186), new o(132, 183), new o(138, 181), new o(141, 180), new o(146, 178), new o(154, 173), new o(159, 171), new o(161, 170), new o(166, 167), new o(168, 167), new o(171, 166), new o(174, 164), new o(177, 162), new o(180, 160), new o(182, 158), new o(183, 156), new o(181, 154), new o(178, 153), new o(171, 153), new o(164, 153), new o(160, 153), new o(150, 154), new o(147, 155), new o(141, 157), new o(137, 158), new o(135, 158), new o(137, 158), new o(140, 157), new o(143, 156), new o(151, 154), new o(160, 152), new o(170, 149), new o(179, 147), new o(185, 145), new o(192, 144), new o(196, 144), new o(198, 144), new o(200, 144), new o(201, 147), new o(199, 149), new o(194, 157), new o(191, 160), new o(186, 167), new o(180, 176), new o(177, 179), new o(171, 187), new o(169, 189), new o(165, 194), new o(164, 196)));
this.Unistrokes[8] = new r("left square bracket", new Array(new o(140, 124), new o(138, 123), new o(135, 122), new o(133, 123), new o(130, 123), new o(128, 124), new o(125, 125), new o(122, 124), new o(120, 124), new o(118, 124), new o(116, 125), new o(113, 125), new o(111, 125), new o(108, 124), new o(106, 125), new o(104, 125), new o(102, 124), new o(100, 123), new o(98, 123), new o(95, 124), new o(93, 123), new o(90, 124), new o(88, 124), new o(85, 125), new o(83, 126), new o(81, 127), new o(81, 129), new o(82, 131), new o(82, 134), new o(83, 138), new o(84, 141), new o(84, 144), new o(85, 148), new o(85, 151), new o(86, 156), new o(86, 160), new o(86, 164), new o(86, 168), new o(87, 171), new o(87, 175), new o(87, 179), new o(87, 182), new o(87, 186), new o(88, 188), new o(88, 195), new o(88, 198), new o(88, 201), new o(88, 207), new o(89, 211), new o(89, 213), new o(89, 217), new o(89, 222), new o(88, 225), new o(88, 229), new o(88, 231), new o(88, 233), new o(88, 235), new o(89, 237), new o(89, 240), new o(89, 242), new o(91, 241), new o(94, 241), new o(96, 240), new o(98, 239), new o(105, 240), new o(109, 240), new o(113, 239), new o(116, 240), new o(121, 239), new o(130, 240), new o(136, 237), new o(139, 237), new o(144, 238), new o(151, 237), new o(157, 236), new o(159, 237)));
this.Unistrokes[9] = new r("right square bracket", new Array(new o(112, 138), new o(112, 136), new o(115, 136), new o(118, 137), new o(120, 136), new o(123, 136), new o(125, 136), new o(128, 136), new o(131, 136), new o(134, 135), new o(137, 135), new o(140, 134), new o(143, 133), new o(145, 132), new o(147, 132), new o(149, 132), new o(152, 132), new o(153, 134), new o(154, 137), new o(155, 141), new o(156, 144), new o(157, 152), new o(158, 161), new o(160, 170), new o(162, 182), new o(164, 192), new o(166, 200), new o(167, 209), new o(168, 214), new o(168, 216), new o(169, 221), new o(169, 223), new o(169, 228), new o(169, 231), new o(166, 233), new o(164, 234), new o(161, 235), new o(155, 236), new o(147, 235), new o(140, 233), new o(131, 233), new o(124, 233), new o(117, 235), new o(114, 238), new o(112, 238)));
this.Unistrokes[10] = new r("v", new Array(new o(89, 164), new o(90, 162), new o(92, 162), new o(94, 164), new o(95, 166), new o(96, 169), new o(97, 171), new o(99, 175), new o(101, 178), new o(103, 182), new o(106, 189), new o(108, 194), new o(111, 199), new o(114, 204), new o(117, 209), new o(119, 214), new o(122, 218), new o(124, 222), new o(126, 225), new o(128, 228), new o(130, 229), new o(133, 233), new o(134, 236), new o(136, 239), new o(138, 240), new o(139, 242), new o(140, 244), new o(142, 242), new o(142, 240), new o(142, 237), new o(143, 235), new o(143, 233), new o(145, 229), new o(146, 226), new o(148, 217), new o(149, 208), new o(149, 205), new o(151, 196), new o(151, 193), new o(153, 182), new o(155, 172), new o(157, 165), new o(159, 160), new o(162, 155), new o(164, 150), new o(165, 148), new o(166, 146)));
this.Unistrokes[11] = new r("delete", new Array(new o(123, 129), new o(123, 131), new o(124, 133), new o(125, 136), new o(127, 140), new o(129, 142), new o(133, 148), new o(137, 154), new o(143, 158), new o(145, 161), new o(148, 164), new o(153, 170), new o(158, 176), new o(160, 178), new o(164, 183), new o(168, 188), new o(171, 191), new o(175, 196), new o(178, 200), new o(180, 202), new o(181, 205), new o(184, 208), new o(186, 210), new o(187, 213), new o(188, 215), new o(186, 212), new o(183, 211), new o(177, 208), new o(169, 206), new o(162, 205), new o(154, 207), new o(145, 209), new o(137, 210), new o(129, 214), new o(122, 217), new o(118, 218), new o(111, 221), new o(109, 222), new o(110, 219), new o(112, 217), new o(118, 209), new o(120, 207), new o(128, 196), new o(135, 187), new o(138, 183), new o(148, 167), new o(157, 153), new o(163, 145), new o(165, 142), new o(172, 133), new o(177, 127), new o(179, 127), new o(180, 125)));
this.Unistrokes[12] = new r("left curly brace", new Array(new o(150, 116), new o(147, 117), new o(145, 116), new o(142, 116), new o(139, 117), new o(136, 117), new o(133, 118), new o(129, 121), new o(126, 122), new o(123, 123), new o(120, 125), new o(118, 127), new o(115, 128), new o(113, 129), new o(112, 131), new o(113, 134), new o(115, 134), new o(117, 135), new o(120, 135), new o(123, 137), new o(126, 138), new o(129, 140), new o(135, 143), new o(137, 144), new o(139, 147), new o(141, 149), new o(140, 152), new o(139, 155), new o(134, 159), new o(131, 161), new o(124, 166), new o(121, 166), new o(117, 166), new o(114, 167), new o(112, 166), new o(114, 164), new o(116, 163), new o(118, 163), new o(120, 162), new o(122, 163), new o(125, 164), new o(127, 165), new o(129, 166), new o(130, 168), new o(129, 171), new o(127, 175), new o(125, 179), new o(123, 184), new o(121, 190), new o(120, 194), new o(119, 199), new o(120, 202), new o(123, 207), new o(127, 211), new o(133, 215), new o(142, 219), new o(148, 220), new o(151, 221)));
this.Unistrokes[13] = new r("right curly brace", new Array(new o(117, 132), new o(115, 132), new o(115, 129), new o(117, 129), new o(119, 128), new o(122, 127), new o(125, 127), new o(127, 127), new o(130, 127), new o(133, 129), new o(136, 129), new o(138, 130), new o(140, 131), new o(143, 134), new o(144, 136), new o(145, 139), new o(145, 142), new o(145, 145), new o(145, 147), new o(145, 149), new o(144, 152), new o(142, 157), new o(141, 160), new o(139, 163), new o(137, 166), new o(135, 167), new o(133, 169), new o(131, 172), new o(128, 173), new o(126, 176), new o(125, 178), new o(125, 180), new o(125, 182), new o(126, 184), new o(128, 187), new o(130, 187), new o(132, 188), new o(135, 189), new o(140, 189), new o(145, 189), new o(150, 187), new o(155, 186), new o(157, 185), new o(159, 184), new o(156, 185), new o(154, 185), new o(149, 185), new o(145, 187), new o(141, 188), new o(136, 191), new o(134, 191), new o(131, 192), new o(129, 193), new o(129, 195), new o(129, 197), new o(131, 200), new o(133, 202), new o(136, 206), new o(139, 211), new o(142, 215), new o(145, 220), new o(147, 225), new o(148, 231), new o(147, 239), new o(144, 244), new o(139, 248), new o(134, 250), new o(126, 253), new o(119, 253), new o(115, 253)));
this.Unistrokes[14] = new r("star", new Array(new o(75, 250), new o(75, 247), new o(77, 244), new o(78, 242), new o(79, 239), new o(80, 237), new o(82, 234), new o(82, 232), new o(84, 229), new o(85, 225), new o(87, 222), new o(88, 219), new o(89, 216), new o(91, 212), new o(92, 208), new o(94, 204), new o(95, 201), new o(96, 196), new o(97, 194), new o(98, 191), new o(100, 185), new o(102, 178), new o(104, 173), new o(104, 171), new o(105, 164), new o(106, 158), new o(107, 156), new o(107, 152), new o(108, 145), new o(109, 141), new o(110, 139), new o(112, 133), new o(113, 131), new o(116, 127), new o(117, 125), new o(119, 122), new o(121, 121), new o(123, 120), new o(125, 122), new o(125, 125), new o(127, 130), new o(128, 133), new o(131, 143), new o(136, 153), new o(140, 163), new o(144, 172), new o(145, 175), new o(151, 189), new o(156, 201), new o(161, 213), new o(166, 225), new o(169, 233), new o(171, 236), new o(174, 243), new o(177, 247), new o(178, 249), new o(179, 251), new o(180, 253), new o(180, 255), new o(179, 257), new o(177, 257), new o(174, 255), new o(169, 250), new o(164, 247), new o(160, 245), new o(149, 238), new o(138, 230), new o(127, 221), new o(124, 220), new o(112, 212), new o(110, 210), new o(96, 201), new o(84, 195), new o(74, 190), new o(64, 182), new o(55, 175), new o(51, 172), new o(49, 170), new o(51, 169), new o(56, 169), new o(66, 169), new o(78, 168), new o(92, 166), new o(107, 164), new o(123, 161), new o(140, 162), new o(156, 162), new o(171, 160), new o(173, 160), new o(186, 160), new o(195, 160), new o(198, 161), new o(203, 163), new o(208, 163), new o(206, 164), new o(200, 167), new o(187, 172), new o(174, 179), new o(172, 181), new o(153, 192), new o(137, 201), new o(123, 211), new o(112, 220), new o(99, 229), new o(90, 237), new o(80, 244), new o(73, 250), new o(69, 254), new o(69, 252)));
this.Unistrokes[15] = new r("pigtail", new Array(new o(81, 219), new o(84, 218), new o(86, 220), new o(88, 220), new o(90, 220), new o(92, 219), new o(95, 220), new o(97, 219), new o(99, 220), new o(102, 218), new o(105, 217), new o(107, 216), new o(110, 216), new o(113, 214), new o(116, 212), new o(118, 210), new o(121, 208), new o(124, 205), new o(126, 202), new o(129, 199), new o(132, 196), new o(136, 191), new o(139, 187), new o(142, 182), new o(144, 179), new o(146, 174), new o(148, 170), new o(149, 168), new o(151, 162), new o(152, 160), new o(152, 157), new o(152, 155), new o(152, 151), new o(152, 149), new o(152, 146), new o(149, 142), new o(148, 139), new o(145, 137), new o(141, 135), new o(139, 135), new o(134, 136), new o(130, 140), new o(128, 142), new o(126, 145), new o(122, 150), new o(119, 158), new o(117, 163), new o(115, 170), new o(114, 175), new o(117, 184), new o(120, 190), new o(125, 199), new o(129, 203), new o(133, 208), new o(138, 213), new o(145, 215), new o(155, 218), new o(164, 219), new o(166, 219), new o(177, 219), new o(182, 218), new o(192, 216), new o(196, 213), new o(199, 212), new o(201, 211)));
this.Recognize = function(e, t) {
for (var n = Date.now(), o = new r("", e), i = -1, a = Infinity, c = 0; c < this.Unistrokes.length; c++) {
var u;
if ((u = t ? M(this.Unistrokes[c].Vector, o.Vector) : b(o.Points, this.Unistrokes[c], -h, +h, f)) < a) {
a = u;
i = c;
}
}
var l = Date.now();
return -1 == i ? new s("No match.", 0, l - n) : new s(this.Unistrokes[i].Name, t ? 1 - a : 1 - a / p, l - n);
};
this.AddGesture = function(e, t) {
this.Unistrokes[this.Unistrokes.length] = new r(e, t);
for (var n = 0, o = 0; o < this.Unistrokes.length; o++) this.Unistrokes[o].Name == e && n++;
return n;
};
this.DeleteUserGestures = function() {
this.Unistrokes.length = a;
return a;
};
}();
var o = n.Point = o;
cc._RF.pop();
}, {} ],
key: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3e067i5U5JBZYNycn4utEdx", "key");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = {
left: 37,
up: 38,
right: 39,
down: 40
};
cc._RF.pop();
}, {} ],
level: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "349dfkvJ2hMZ4CrC9ovtiyD", "level");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./dungeon"), i = e("./key"), r = e("./tiles"), s = Math.floor, a = Math.abs, c = 16, u = function() {
function e() {
this.dungeon = new o.default(100, 100);
this.dungeon.generate();
this.collisionMap = this.dungeon.getCollisionMap();
this.tiles = this.dungeon.getFlattenedTiles();
this.player = {
pos: {
x: 0,
y: 0
},
size: {
x: 12,
y: 12
},
speed: 175,
color: "#0CED13",
onStairs: !0
};
var e = this.dungeon.getStairs();
this.player.pos.x = e.up.x * c + c / 2 - this.player.size.x / 2;
this.player.pos.y = e.up.y * c + c / 2 - this.player.size.y / 2;
}
e.prototype.width = function() {
return this.dungeon.size.x * c;
};
e.prototype.height = function() {
return this.dungeon.size.y * c;
};
e.prototype.update = function(e, t) {
var n = {
x: 0,
y: 0
};
i.default.left in t && (n.x -= this.player.speed * e);
i.default.right in t && (n.x += this.player.speed * e);
i.default.up in t && (n.y -= this.player.speed * e);
i.default.down in t && (n.y += this.player.speed * e);
this.player.pos = this.moveEntity(this.player.pos, this.player.size, n);
for (var o = s((this.player.pos.x + this.player.size.x / 2) / c), a = s((this.player.pos.y + this.player.size.y / 2) / c), u = 0, l = !1, p = this.dungeon.roomGrid[a][o], h = 0; h < p.length; h++) {
var f = p[h], d = o - f.pos.x, y = a - f.pos.y;
if (f.tiles[y][d] === r.default.stairsUp) {
l = !0;
if (!this.player.onStairs) {
u = -1;
break;
}
}
if (f.tiles[y][d] === r.default.stairsDown) {
l = !0;
if (!this.player.onStairs) {
u = 1;
break;
}
}
}
this.player.onStairs = l;
return u;
};
e.prototype.isTileVisible = function(e, t, n, o, i) {
if ("none" === e) return !0;
if ("room" === e) {
var r = this.dungeon.roomGrid[n][t];
if (null !== r) for (var s = 0; s < r.length; s++) {
var c = r[s];
if (o >= c.pos.x && o < c.pos.x + c.size.x && i >= c.pos.y && i < c.pos.y + c.size.y) return !0;
}
}
if ("los" === e) {
if (t < 0 || t >= this.dungeon.size.x || o < 0 || o >= this.dungeon.size.x || n < 0 || n >= this.dungeon.size.y || i < 0 || i >= this.dungeon.size.y) return !0;
for (var u = a(o - t), l = a(i - n), p = t < o ? 1 : -1, h = n < i ? 1 : -1, f = u - l; t !== o || n !== i; ) {
if (1 === this.collisionMap[n][t]) return !1;
var d = 2 * f;
if (d > -l) {
f -= l;
t += p;
}
if (d < u) {
f += u;
n += h;
}
}
return !0;
}
return !1;
};
e.prototype.draw = function(e, t, n, o) {
for (var i = s((this.player.pos.x + this.player.size.x / 2) / c), a = s((this.player.pos.y + this.player.size.y / 2) / c), u = s(n.x / c) - 1, l = s(n.y / c) - 1, p = (n.x % c + c) % c, h = (n.y % c + c) % c, f = -p - c, d = -h - c, y = e.width + c - p, w = e.height + c - h, _ = l, g = d; g < w; _++, 
g += c) if (!(_ < 0 || _ >= this.dungeon.size.y)) for (var v = u, m = f; m < y; v++, 
m += c) if (!(v < 0 || v >= this.dungeon.size.x)) {
var M = this.tiles[_][v];
if (null !== M) {
var b = this.isTileVisible(o, i, a, v, _);
b && (M.HasBeenSeen = !0);
if (M.HasBeenSeen) {
switch (M.type) {
case r.default.floor:
case r.default.door:
t.fillStyle = b ? "#B8860B" : "#705104";
break;

case r.default.wall:
t.fillStyle = b ? "#8B4513" : "#61300D";
break;

case r.default.stairsDown:
t.fillStyle = "#7A5A0D";
break;

case r.default.stairsUp:
t.fillStyle = "#F2CD27";
}
t.fillRect(m, g, c, c);
}
}
}
t.fillStyle = this.player.color;
t.fillRect(s(this.player.pos.x - n.x), s(this.player.pos.y - n.y), s(this.player.size.x), s(this.player.size.y));
};
e.prototype.moveEntity = function(e, t, n) {
var o = {
x: e.x + n.x,
y: e.y + n.y
};
if (n.x) {
var i = n.x > 0 ? t.x : 0, a = s((e.x + n.x + i) / c), u = s(e.y / c);
if ((p = Math.ceil((e.y + t.y) / c)) >= 0 && u < this.dungeon.size.y && a >= 0 && a < this.dungeon.size.x) for (var l = u; l < p; l++) if (this.collisionMap[l][a] === r.default.wall) {
o.x = a * c - i + (n.x < 0 ? c : 0);
break;
}
}
if (n.y) {
var p;
i = n.y > 0 ? t.y : 0, l = s((e.y + n.y + i) / c), u = s(o.x / c);
if ((p = Math.ceil((o.x + t.x) / c)) >= 0 && u < this.dungeon.size.x && l >= 0 && l < this.dungeon.size.y) for (a = u; a < p; a++) if (this.collisionMap[l][a] === r.default.wall) {
o.y = l * c - i + (n.y < 0 ? c : 0);
break;
}
}
return o;
};
return e;
}();
n.default = u;
cc._RF.pop();
}, {
"./dungeon": "dungeon",
"./key": "key",
"./tiles": "tiles"
} ],
room: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "198a1IoOplC64AxPJamXFhZ", "room");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./tiles"), i = function() {
function e(e, t) {
this.size = {
x: e,
y: t
};
this.pos = {
x: 0,
y: 0
};
this.tiles = [];
for (var n = 0; n < this.size.y; n++) {
for (var i = [], r = 0; r < this.size.x; r++) 0 === n || n === this.size.y - 1 || 0 === r || r === this.size.x - 1 ? i.push(o.default.wall) : i.push(o.default.floor);
this.tiles.push(i);
}
}
e.prototype.hasStairs = function() {
for (var e = 0; e < this.size.y; e++) for (var t = 0; t < this.size.x; t++) if (this.tiles[e][t] === o.default.stairsDown || this.tiles[e][t] === o.default.stairsUp) return !0;
return !1;
};
e.prototype.getDoorLocations = function() {
for (var e = [], t = 0; t < this.size.y; t++) for (var n = 0; n < this.size.x; n++) this.tiles[t][n] === o.default.door && e.push({
x: n,
y: t
});
return e;
};
e.areConnected = function(e, t) {
for (var n = e.getDoorLocations(), i = 0; i < n.length; i++) {
var r = n[i];
r.x += e.pos.x;
r.y += e.pos.y;
r.x -= t.pos.x;
r.y -= t.pos.y;
if (!(r.x < 0 || r.x > t.size.x - 1 || r.y < 0 || r.y > t.size.y - 1) && t.tiles[r.y][r.x] === o.default.door) return !0;
}
return !1;
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./tiles": "tiles"
} ],
tiles: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "53ea8asrNFBtpmoZFBeWmPZ", "tiles");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = {
blank: 0,
wall: 1,
floor: 2,
door: 3,
stairsUp: 4,
stairsDown: 5
};
cc._RF.pop();
}, {} ]
}, {}, [ "A_star_1.0", "A_star_2.0", "BinaryHeap", "DungeonFactory", "dungeon", "key", "level", "room", "tiles", "gusture", "EventManager", "IEventManager", "IResourceManager", "ITimerManager", "ResourceManager", "SceneManager", "TimerManager", "AudioUtils", "DiviceUtils", "DragBoneUtils", "EffectUtils", "FollowCamera", "GameUtils", "GustureUtils", "KeyCode", "LogUtils", "MathUtils", "RewriteEngine", "SingleBase", "SlayArrow", "SystemUtils", "T", "Arrow_Demo", "GustureComponent", "TypeWriterComponent", "Typewriter_Demo", "Map", "MapConfig", "MapMgr", "BaseObj", "Role", "RoleMgr", "Launcher", "MazeFactory", "RefenceTest", "Abstract_Test", "StateMachineDesignPattern", "TestStateMachine", "EntityConfig", "LoncationType", "BaseGameEntity", "Miner", "Women", "EntityManager", "MessageDispatcher", "MessageType", "MsgInfo", "DinnerState", "IState", "IStateMachine", "EnterMineAndDigForNugget", "GoHomeAndSleepReset", "MinerGlobalState", "QuenchTirst", "VisitBankAndSaveGold", "StateMachine", "GotoToiletState", "KeepHouseState", "MakeDinnerState", "WomenGlobalState", "Test" ]);