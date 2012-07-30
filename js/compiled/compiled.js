(function(){var h = void 0, i = !0, k = null, l = !1;
function q() {
  return function() {
  }
}
var r, s = this;
function t(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function aa(a) {
  var b = t(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function v(a) {
  return"string" == typeof a
}
function w(a) {
  return a[ba] || (a[ba] = ++ca)
}
var ba = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ca = 0, da = Date.now || function() {
  return+new Date
};
function x(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.t = b.prototype;
  a.prototype = new c
}
;function ea(a) {
  this.context = a;
  this.source = this.context.createGainNode()
}
ea.prototype.i = function(a) {
  this.source.connect(a)
};
function fa(a) {
  this.H = new ea(a)
}
fa.prototype.i = function(a) {
  this.H.i(a)
};
var y, ga, z, ha;
function ia() {
  return s.navigator ? s.navigator.userAgent : k
}
ha = z = ga = y = l;
var A;
if(A = ia()) {
  var ja = s.navigator;
  y = 0 == A.indexOf("Opera");
  ga = !y && -1 != A.indexOf("MSIE");
  z = !y && -1 != A.indexOf("WebKit");
  ha = !y && !z && "Gecko" == ja.product
}
var ka = y, B = ga, C = ha, D = z, la = s.navigator, ma = -1 != (la && la.platform || "").indexOf("Mac"), na;
a: {
  var E = "", F;
  if(ka && s.opera) {
    var oa = s.opera.version, E = "function" == typeof oa ? oa() : oa
  }else {
    if(C ? F = /rv\:([^\);]+)(\)|;)/ : B ? F = /MSIE\s+([^\);]+)(\)|;)/ : D && (F = /WebKit\/(\S+)/), F) {
      var pa = F.exec(ia()), E = pa ? pa[1] : ""
    }
  }
  if(B) {
    var qa, ra = s.document;
    qa = ra ? ra.documentMode : h;
    if(qa > parseFloat(E)) {
      na = String(qa);
      break a
    }
  }
  na = E
}
var sa = {};
function G(a) {
  var b;
  if(!(b = sa[a])) {
    b = 0;
    for(var c = String(na).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), e = 0;0 == b && e < f;e++) {
      var g = c[e] || "", j = d[e] || "", n = RegExp("(\\d*)(\\D*)", "g"), o = RegExp("(\\d*)(\\D*)", "g");
      do {
        var p = n.exec(g) || ["", "", ""], m = o.exec(j) || ["", "", ""];
        if(0 == p[0].length && 0 == m[0].length) {
          break
        }
        b = ((0 == p[1].length ? 0 : parseInt(p[1], 10)) < (0 == m[1].length ? 0 : parseInt(m[1], 10)) ? -1 : (0 == p[1].length ? 0 : parseInt(p[1], 10)) > (0 == m[1].length ? 0 : parseInt(m[1], 10)) ? 1 : 0) || ((0 == p[2].length) < (0 == m[2].length) ? -1 : (0 == p[2].length) > (0 == m[2].length) ? 1 : 0) || (p[2] < m[2] ? -1 : p[2] > m[2] ? 1 : 0)
      }while(0 == b)
    }
    b = sa[a] = 0 <= b
  }
  return b
}
var ta = {};
function ua() {
  return ta[9] || (ta[9] = B && !!document.documentMode && 9 <= document.documentMode)
}
;function va() {
}
var wa = 0;
r = va.prototype;
r.key = 0;
r.h = l;
r.u = l;
r.f = function(a, b, c, d, f, e) {
  if("function" == t(a)) {
    this.G = i
  }else {
    if(a && a.handleEvent && "function" == t(a.handleEvent)) {
      this.G = l
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.listener = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!f;
  this.r = e;
  this.u = l;
  this.key = ++wa;
  this.h = l
};
r.handleEvent = function(a) {
  return this.G ? this.listener.call(this.r || this.src, a) : this.listener.handleEvent.call(this.listener, a)
};
var xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function ya(a, b) {
  for(var c, d, f = 1;f < arguments.length;f++) {
    d = arguments[f];
    for(c in d) {
      a[c] = d[c]
    }
    for(var e = 0;e < xa.length;e++) {
      c = xa[e], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;!B || ua();
var za = !B || ua(), Aa = B && !G("8");
!D || G("528");
C && G("1.9b") || B && G("8") || ka && G("9.5") || D && G("528");
C && !G("8") || B && G("9");
var H = Array.prototype, Ba = H.indexOf ? function(a, b, c) {
  return H.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(v(a)) {
    return!v(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Ca = H.forEach ? function(a, b, c) {
  H.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, f = v(a) ? a.split("") : a, e = 0;e < d;e++) {
    e in f && b.call(c, f[e], e, a)
  }
};
function I() {
  this.l = l
}
I.prototype.j = function() {
  this.l || (this.l = i, this.d())
};
I.prototype.d = function() {
  this.R && Da.apply(k, this.R);
  if(this.J) {
    for(;this.J.length;) {
      this.J.shift()()
    }
  }
};
function Da(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    aa(d) ? Da.apply(k, d) : d && "function" == typeof d.j && d.j()
  }
}
;function J(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
r = J.prototype;
r.d = q();
r.j = q();
r.g = l;
r.defaultPrevented = l;
r.n = i;
r.preventDefault = function() {
  this.defaultPrevented = i;
  this.n = l
};
function Ea(a) {
  Ea[" "](a);
  return a
}
Ea[" "] = q();
function K(a, b) {
  a && this.f(a, b)
}
x(K, J);
r = K.prototype;
r.target = k;
r.relatedTarget = k;
r.offsetX = 0;
r.offsetY = 0;
r.clientX = 0;
r.clientY = 0;
r.screenX = 0;
r.screenY = 0;
r.button = 0;
r.keyCode = 0;
r.charCode = 0;
r.ctrlKey = l;
r.altKey = l;
r.shiftKey = l;
r.metaKey = l;
r.V = l;
r.C = k;
r.f = function(a, b) {
  var c = this.type = a.type;
  J.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(C) {
      var f;
      a: {
        try {
          Ea(d.nodeName);
          f = i;
          break a
        }catch(e) {
        }
        f = l
      }
      f || (d = k)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = D || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = D || a.offsetY !== h ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== h ? a.clientX : a.pageX;
  this.clientY = a.clientY !== h ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.V = ma ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.C = a;
  a.defaultPrevented && this.preventDefault();
  delete this.g
};
r.preventDefault = function() {
  K.t.preventDefault.call(this);
  var a = this.C;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = l, Aa) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
r.d = q();
var L = {}, M = {}, N = {}, O = {};
function Fa(a, b, c, d, f) {
  if(b) {
    if("array" == t(b)) {
      for(var e = 0;e < b.length;e++) {
        Fa(a, b[e], c, d, f)
      }
    }else {
      var d = !!d, g = M;
      b in g || (g[b] = {a:0, c:0});
      g = g[b];
      d in g || (g[d] = {a:0, c:0}, g.a++);
      var g = g[d], j = w(a), n;
      g.c++;
      if(g[j]) {
        n = g[j];
        for(e = 0;e < n.length;e++) {
          if(g = n[e], g.listener == c && g.r == f) {
            if(g.h) {
              break
            }
            return
          }
        }
      }else {
        n = g[j] = [], g.a++
      }
      var o = Ga, p = za ? function(a) {
        return o.call(p.src, p.key, a)
      } : function(a) {
        a = o.call(p.src, p.key, a);
        if(!a) {
          return a
        }
      }, e = p;
      e.src = a;
      g = new va;
      g.f(c, e, a, b, d, f);
      c = g.key;
      e.key = c;
      n.push(g);
      L[c] = g;
      N[j] || (N[j] = []);
      N[j].push(g);
      a.addEventListener ? (a == s || !a.w) && a.addEventListener(b, e, d) : a.attachEvent(b in O ? O[b] : O[b] = "on" + b, e)
    }
  }else {
    throw Error("Invalid event type");
  }
}
function Ha(a, b, c, d, f) {
  if("array" == t(b)) {
    for(var e = 0;e < b.length;e++) {
      Ha(a, b[e], c, d, f)
    }
  }else {
    d = !!d;
    a: {
      e = M;
      if(b in e && (e = e[b], d in e && (e = e[d], a = w(a), e[a]))) {
        a = e[a];
        break a
      }
      a = k
    }
    if(a) {
      for(e = 0;e < a.length;e++) {
        if(a[e].listener == c && a[e].capture == d && a[e].r == f) {
          P(a[e].key);
          break
        }
      }
    }
  }
}
function P(a) {
  if(L[a]) {
    var b = L[a];
    if(!b.h) {
      var c = b.src, d = b.type, f = b.proxy, e = b.capture;
      c.removeEventListener ? (c == s || !c.w) && c.removeEventListener(d, f, e) : c.detachEvent && c.detachEvent(d in O ? O[d] : O[d] = "on" + d, f);
      c = w(c);
      if(N[c]) {
        var f = N[c], g = Ba(f, b);
        0 <= g && H.splice.call(f, g, 1);
        0 == f.length && delete N[c]
      }
      b.h = i;
      if(b = M[d][e][c]) {
        b.I = i, Ia(d, e, c, b)
      }
      delete L[a]
    }
  }
}
function Ia(a, b, c, d) {
  if(!d.m && d.I) {
    for(var f = 0, e = 0;f < d.length;f++) {
      d[f].h ? d[f].proxy.src = k : (f != e && (d[e] = d[f]), e++)
    }
    d.length = e;
    d.I = l;
    0 == e && (delete M[a][b][c], M[a][b].a--, 0 == M[a][b].a && (delete M[a][b], M[a].a--), 0 == M[a].a && delete M[a])
  }
}
function Q(a, b, c, d, f) {
  var e = 1, b = w(b);
  if(a[b]) {
    a.c--;
    a = a[b];
    a.m ? a.m++ : a.m = 1;
    try {
      for(var g = a.length, j = 0;j < g;j++) {
        var n = a[j];
        n && !n.h && (e &= Ja(n, f) !== l)
      }
    }finally {
      a.m--, Ia(c, d, b, a)
    }
  }
  return Boolean(e)
}
function Ja(a, b) {
  a.u && P(a.key);
  return a.handleEvent(b)
}
function Ga(a, b) {
  if(!L[a]) {
    return i
  }
  var c = L[a], d = c.type, f = M;
  if(!(d in f)) {
    return i
  }
  var f = f[d], e, g;
  if(!za) {
    var j;
    if(!(j = b)) {
      a: {
        j = ["window", "event"];
        for(var n = s;e = j.shift();) {
          if(n[e] != k) {
            n = n[e]
          }else {
            j = k;
            break a
          }
        }
        j = n
      }
    }
    e = j;
    j = i in f;
    n = l in f;
    if(j) {
      if(0 > e.keyCode || e.returnValue != h) {
        return i
      }
      a: {
        var o = l;
        if(0 == e.keyCode) {
          try {
            e.keyCode = -1;
            break a
          }catch(p) {
            o = i
          }
        }
        if(o || e.returnValue == h) {
          e.returnValue = i
        }
      }
    }
    o = new K;
    o.f(e, this);
    e = i;
    try {
      if(j) {
        for(var m = [], X = o.currentTarget;X;X = X.parentNode) {
          m.push(X)
        }
        g = f[i];
        g.c = g.a;
        for(var u = m.length - 1;!o.g && 0 <= u && g.c;u--) {
          o.currentTarget = m[u], e &= Q(g, m[u], d, i, o)
        }
        if(n) {
          g = f[l];
          g.c = g.a;
          for(u = 0;!o.g && u < m.length && g.c;u++) {
            o.currentTarget = m[u], e &= Q(g, m[u], d, l, o)
          }
        }
      }else {
        e = Ja(c, o)
      }
    }finally {
      m && (m.length = 0)
    }
    return e
  }
  d = new K(b, this);
  return e = Ja(c, d)
}
;var R = "StopIteration" in s ? s.StopIteration : Error("StopIteration");
function S() {
}
S.prototype.next = function() {
  throw R;
};
S.prototype.o = function() {
  return this
};
function Ka(a) {
  if(a instanceof S) {
    return a
  }
  if("function" == typeof a.o) {
    return a.o(l)
  }
  if(aa(a)) {
    var b = 0, c = new S;
    c.next = function() {
      for(;;) {
        if(b >= a.length) {
          throw R;
        }
        if(b in a) {
          return a[b++]
        }
        b++
      }
    };
    return c
  }
  throw Error("Not implemented");
}
;function T(a, b) {
  this.e = {};
  this.b = [];
  var c = arguments.length;
  if(1 < c) {
    if(c % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      var f;
      if(a instanceof T) {
        d = La(a);
        Ma(a);
        f = [];
        for(c = 0;c < a.b.length;c++) {
          f.push(a.e[a.b[c]])
        }
      }else {
        var c = [], e = 0;
        for(d in a) {
          c[e++] = d
        }
        d = c;
        c = [];
        e = 0;
        for(f in a) {
          c[e++] = a[f]
        }
        f = c
      }
      for(c = 0;c < d.length;c++) {
        this.set(d[c], f[c])
      }
    }
  }
}
r = T.prototype;
r.a = 0;
r.version_ = 0;
function La(a) {
  Ma(a);
  return a.b.concat()
}
function Ma(a) {
  if(a.a != a.b.length) {
    for(var b = 0, c = 0;b < a.b.length;) {
      var d = a.b[b];
      Object.prototype.hasOwnProperty.call(a.e, d) && (a.b[c++] = d);
      b++
    }
    a.b.length = c
  }
  if(a.a != a.b.length) {
    for(var f = {}, c = b = 0;b < a.b.length;) {
      d = a.b[b], Object.prototype.hasOwnProperty.call(f, d) || (a.b[c++] = d, f[d] = 1), b++
    }
    a.b.length = c
  }
}
r.get = function(a, b) {
  return Object.prototype.hasOwnProperty.call(this.e, a) ? this.e[a] : b
};
r.set = function(a, b) {
  Object.prototype.hasOwnProperty.call(this.e, a) || (this.a++, this.b.push(a), this.version_++);
  this.e[a] = b
};
r.o = function(a) {
  Ma(this);
  var b = 0, c = this.b, d = this.e, f = this.version_, e = this, g = new S;
  g.next = function() {
    for(;;) {
      if(f != e.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if(b >= c.length) {
        throw R;
      }
      var g = c[b++];
      return a ? g : d[g]
    }
  };
  return g
};
function U(a, b) {
  this.l = l;
  this.T = b;
  this.q = [];
  if(a > this.T) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for(var c = 0;c < a;c++) {
    this.q.push(this.k())
  }
}
x(U, I);
r = U.prototype;
r.v = k;
r.A = k;
r.k = function() {
  return this.v ? this.v() : {}
};
r.z = function(a) {
  if(this.A) {
    this.A(a)
  }else {
    var b = typeof a;
    if("object" == b && a != k || "function" == b) {
      if("function" == t(a.j)) {
        a.j()
      }else {
        for(var c in a) {
          delete a[c]
        }
      }
    }
  }
};
r.d = function() {
  U.t.d.call(this);
  for(var a = this.q;a.length;) {
    this.z(a.pop())
  }
  delete this.q
};
function Na() {
  this.D = [];
  this.K = new T;
  this.$ = this.aa = this.ba = this.W = 0;
  this.L = new T;
  this.P = this.Z = 0;
  this.U = 1;
  this.S = new U(0, 4E3);
  this.S.k = function() {
    return new Oa
  };
  this.X = new U(0, 50);
  this.X.k = function() {
    return new Pa
  };
  var a = this;
  this.F = new U(0, 2E3);
  this.F.k = function() {
    return String(a.U++)
  };
  this.F.z = q();
  this.ca = 3
}
function Pa() {
  this.M = this.time = this.count = 0
}
Pa.prototype.toString = function() {
  var a = [];
  a.push(this.type, " ", this.count, " (", Math.round(10 * this.time) / 10, " ms)");
  this.M && a.push(" [VarAlloc = ", this.M, "]");
  return a.join("")
};
function Oa() {
}
function Qa(a, b, c, d) {
  var f = [];
  -1 == c ? f.push("    ") : f.push(Ra(a.B - c));
  f.push(" ", Sa(a.B - b));
  0 == a.p ? f.push(" Start        ") : 1 == a.p ? (f.push(" Done "), f.push(Ra(a.da - a.startTime), " ms ")) : f.push(" Comment      ");
  f.push(d, a);
  0 < a.Y && f.push("[VarAlloc ", a.Y, "] ");
  return f.join("")
}
Oa.prototype.toString = function() {
  return this.type == k ? this.O : "[" + this.type + "] " + this.O
};
Na.prototype.toString = function() {
  for(var a = [], b = -1, c = [], d = 0;d < this.D.length;d++) {
    var f = this.D[d];
    1 == f.p && c.pop();
    a.push(" ", Qa(f, this.W, b, c.join("")));
    b = f.B;
    a.push("\n");
    0 == f.p && c.push("|  ")
  }
  if(0 != this.K.a) {
    var e = da();
    a.push(" Unstopped timers:\n");
    d = this.K;
    b = function(b) {
      a.push("  ", b, " (", e - b.startTime, " ms, started at ", Sa(b.startTime), ")\n")
    };
    if(aa(d)) {
      try {
        Ca(d, b, h)
      }catch(g) {
        if(g !== R) {
          throw g;
        }
      }
    }else {
      d = Ka(d);
      try {
        for(;;) {
          b.call(h, d.next())
        }
      }catch(j) {
        if(j !== R) {
          throw j;
        }
      }
    }
  }
  b = La(this.L);
  for(d = 0;d < b.length;d++) {
    c = this.L.get(b[d]), 1 < c.count && a.push(" TOTAL ", c, "\n")
  }
  a.push("Total tracers created ", this.Z, "\n", "Total comments created ", this.P, "\n", "Overhead start: ", this.ba, " ms\n", "Overhead end: ", this.aa, " ms\n", "Overhead comment: ", this.$, " ms\n");
  return a.join("")
};
function Ra(a) {
  var a = Math.round(a), b = "";
  1E3 > a && (b = " ");
  100 > a && (b = "  ");
  10 > a && (b = "   ");
  return b + a
}
function Sa(a) {
  a = Math.round(a);
  return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
}
new Na;
function V() {
  this.l = l
}
x(V, I);
r = V.prototype;
r.w = i;
r.s = k;
r.addEventListener = function(a, b, c, d) {
  Fa(this, a, b, c, d)
};
r.removeEventListener = function(a, b, c, d) {
  Ha(this, a, b, c, d)
};
r.dispatchEvent = function(a) {
  var b = a.type || a, c = M;
  if(b in c) {
    if(v(a)) {
      a = new J(a, this)
    }else {
      if(a instanceof J) {
        a.target = a.target || this
      }else {
        var d = a, a = new J(b, this);
        ya(a, d)
      }
    }
    var d = 1, f, c = c[b], b = i in c, e;
    if(b) {
      f = [];
      for(e = this;e;e = e.s) {
        f.push(e)
      }
      e = c[i];
      e.c = e.a;
      for(var g = f.length - 1;!a.g && 0 <= g && e.c;g--) {
        a.currentTarget = f[g], d &= Q(e, f[g], a.type, i, a) && a.n != l
      }
    }
    if(l in c) {
      if(e = c[l], e.c = e.a, b) {
        for(g = 0;!a.g && g < f.length && e.c;g++) {
          a.currentTarget = f[g], d &= Q(e, f[g], a.type, l, a) && a.n != l
        }
      }else {
        for(f = this;!a.g && f && e.c;f = f.s) {
          a.currentTarget = f, d &= Q(e, f, a.type, l, a) && a.n != l
        }
      }
    }
    a = Boolean(d)
  }else {
    a = i
  }
  return a
};
r.d = function() {
  V.t.d.call(this);
  var a, b = 0, c = a == k;
  a = !!a;
  if(this == k) {
    var d = function(d) {
      for(var e = d.length - 1;0 <= e;e--) {
        var f = d[e];
        if(c || a == f.capture) {
          P(f.key), b++
        }
      }
    }, f;
    for(f in N) {
      d.call(h, N[f])
    }
  }else {
    if(d = w(this), N[d]) {
      d = N[d];
      for(f = d.length - 1;0 <= f;f--) {
        var e = d[f];
        if(c || a == e.capture) {
          P(e.key), b++
        }
      }
    }
  }
  this.s = k
};
function Ta(a) {
  this.source = a.createBufferSource()
}
x(Ta, V);
Ta.prototype.play = function(a) {
  this.source.noteOn(a || 0)
};
Ta.prototype.i = function(a) {
  this.source.connect(a)
};
function Ua(a, b) {
  this.source = a.createBufferSource();
  var c = this, d = new XMLHttpRequest;
  d.open("GET", b, i);
  d.responseType = "arraybuffer";
  d.onload = function() {
    a.decodeAudioData(d.response, function(a) {
      c.source.buffer = a;
      c.dispatchEvent("loaded")
    })
  };
  d.send()
}
x(Ua, Ta);
function Va() {
  var a = this;
  this.context = new webkitAudioContext;
  this.f();
  this.input.i(this.N.H.source);
  this.N.i(this.context.destination);
  Fa(this.input, "loaded", function() {
    a.input.play()
  })
}
Va.prototype.f = function() {
  this.input = new Ua(this.context, "audio/sample.mp3");
  this.N = new fa(this.context)
};
var W = ["stomp"], Y = s;
!(W[0] in Y) && Y.execScript && Y.execScript("var " + W[0]);
for(var Z;W.length && (Z = W.shift());) {
  var Wa;
  if(Wa = !W.length) {
    Wa = Va !== h
  }
  Wa ? Y[Z] = Va : Y = Y[Z] ? Y[Z] : Y[Z] = {}
}
;})()
