/**
    *** myCluster javascript OpenLayers plugin ***
        Author  : Mustafa Arıkan
        Version : 1.4.0
        Release : 27.08.2014
        Contact : arikan134@gmail.com
        Web     : mustafaarikan.net
        Git     : github.com/arikanmstf

    *** Requirements ***
        OpenLayers   : 2.13

    ~check sample.html

**/
OpenLayers.myCluster = OpenLayers.Class(OpenLayers.Strategy, {
    map: null,
    f: [],
    d: 30,
    cf: null,
    co: !1,
    md: [],
    id: [],
    sd: [],
    ll: null,
    init: function() {
        var self = this;
        OpenLayers.Layer.Markers.prototype.clearMarkersMc = function() {
            this.clearMarkers(), self.cfs()
        };
        if (!self.ll) {
            self.ll = new OpenLayers.Layer.Vector("Lines", {
                eventListeners: {
                    click: function() {
                        self.reset()
                    }
                }
            });
        };
        var r = function() {
                return !0
            },
            t = new OpenLayers.Control.SelectFeature(self.ll, {
                hover: !0,
                highlightOnly: !0,
                renderIntent: "temporary",
                eventListeners: {
                    beforefeaturehighlighted: r,
                    featureunhighlighted: r,
                    featurehighlighted: r
                }
            });
        self.map.addControl(t), t.activate(), self.map.addLayer(self.ll), self.ll.setZIndex(330);
        self.reset(), self.map.events.register("zoomend", self.map, function() {
            self.reset()
        });
    },
    afs: function(e) {
        var r = this;
        if (!e.cing) return !1;
        r.cf = e;
        var t = r.f;
        if (t.length <= 1) return !1;
        r.co = !0;
        var a = e.marker,
            n = [],
            o = [],
            s = [];
        for (i = 0; i <= t.length - 1; i++) {
            var p = t[i],
                l = p.marker;
            t[i].cdi = r.m2p(r.dbp(a.lonlat, l.lonlat)), t[i].popup.hide(), t[i].popup2.hide(), p.rl = p.marker.lonlat, r.idis(t[i].cdi) ? (p.ctd = !0, n.push(p), r.hr(p)) : r.icirc(t[i].cdi) ? (p.ctd = !1, l.icon.setOpacity(0), p.am && p.am.icon.setOpacity(0), p.popup.hide(), s.push(p)) : (p.ctd = !1, o.push(p))
        }
        r.md = n, r.sd = o, r.id = s, r.mfs(n)
    },
    mc: function(e) {
        var r = this,
            t = r.co,
            a = e.popup;
        t ? e.cing ? e.ctd ? a.toggle() : (r.reset(), r.afs(e)) : a.toggle() : e.cing ? r.afs(e) : a.toggle()
    },
    mfs: function(e) {
        if (e.length <= 1) return !1;
        var r = 2 * Math.PI,
            t = 50,
            a = r / 1,
            n = t * e.length,
            o = n / r,
            s = r / e.length,
            p = this.cf,
            r = 2 * Math.PI,
            t = 80,
            a = r / 1,
            n = t * e.length,
            o = n / r,
            s = r / e.length,
            p = this.cf;
        for (i = 0; i <= e.length - 1; i++) {
            var l = this.map.getLayerPxFromLonLat(p.marker.lonlat.transform(new OpenLayers.Projection("EPSG:4326")));
            ang = a + i * s, l.x += o * Math.cos(ang), l.y += o * Math.sin(ang), e[i].marker.draw(l), e[i].am && e[i].am.draw(l);
            var c = this.map.getLonLatFromLayerPx(l).transform(new OpenLayers.Projection("EPSG:4326"));
            e[i].popup.lonlat = c, e[i].popup.updatePosition(), e[i].popup2.lonlat = c, e[i].popup2.updatePosition(), this.dl(p.marker.lonlat, c)
        }
    },
    af: function(e) {
        var r = this;
        if(typeof e.popup2 == 'undefined')e.popup2 = e.createPopup(false);
        if(typeof e.popup == 'undefined')e.popup = e.createPopup(false);
        r.f.push(e), e.marker.events.register("mousedown", e, function() {
            r.mc(e)
        }), e.marker.events.register("touchend", e, function() {
            r.mc(e);
            return true
        }), e.am && e.am.events.register("mousedown", e, function() {
            r.mc(e);
            return true
        }), e.am && e.am.events.register("touchend", e, function() {
            r.mc(e)
        })
    },
    idis: function(e) {
        return e <= this.d
    },
    icirc: function(e) {
        return e <= this.d + 50
    },
    dbp: function(e, r) {
        var t = new OpenLayers.Geometry.Point(e.lon, e.lat),
            a = new OpenLayers.Geometry.Point(r.lon, r.lat);
        return t.distanceTo(a)
    },
    dl: function(e, r) {
        OpenLayers.Feature.Vector.style["default"].strokeColor = "#0000ff", OpenLayers.Feature.Vector.style["default"].strokeWidth = 3, OpenLayers.Feature.Vector.style.temporary.strokeColor = "#ff0000", ll = this.ll, m = this.map;
        var t = new Array(new OpenLayers.Geometry.Point(e.lon, e.lat), new OpenLayers.Geometry.Point(r.lon, r.lat)),
            a = new OpenLayers.Geometry.LineString(t),
            n = new OpenLayers.Feature.Vector(a);
        ll.addFeatures([n])
    },
    sfs: function() {
        for (var e = this, r = e.f, t = [], a = 0; a <= r.length - 1; a++) r[a].cing = !1;
        for (var a = 0; a <= r.length - 1; a++) {
            var n = r[a],
                o = n.lonlat;
            n.popup.hide(), n.popup2.hide(), n.popup.lonlat = n.popup2.lonlat = n.marker.lonlat, n.popup.updatePosition(), n.popup2.updatePosition(), n.marker.icon.setOpacity(1), n.am && n.am.icon.setOpacity(1);
            for (var i = 0; a > i; i++) {
                var s = r[i],
                    p = s.lonlat,
                    l = e.m2p(e.dbp(o, p));
                e.idis(l) && (n.cing = !0, s.cing = !0, t.push([a, i]))
            }
        }
        for (var c = e.da(t, r.length - 1), a = 0; a <= c.length - 1; a++) {
            var u = c[a];
            r[u].popup2.show(), r[u].marker.events.remove("mouseout")
        }
    },
    da: function(e, r) {
        for (var t = [], a = [], n = this, o = 0; o <= e.length - 1; o++) {
            var i = e[o][0],
                s = e[o][1];
            n.as(t, i) || t.push(i), n.as(t, s) || t.push(s)
        }
        for (var o = 0; r >= o; o++) n.as(t, o) || a.push(o);
        return a.sort()
    },
    as: function(e, r) {
        for (var t = 0; t <= e.length - 1; t++)
            if (e[t] == r) return !0;
        return !1
    },
    reset: function() {
        var e = this;
        for (e.co = !1, e.sfs(), e.ll.destroyFeatures(), md = e.md, i = 0; i <= md.length - 1; i++) {
            var r = e.map.getLayerPxFromLonLat(md[i].rl.transform(new OpenLayers.Projection("EPSG:4326")));
            md[i].marker.draw(r), md[i].am && md[i].am.draw(r), md[i].popup.lonlat = md.rl, md[i].popup.updatePosition(), md[i].popup2.lonlat = md.rl, md[i].popup2.updatePosition(), md[i].marker.events.remove("mouseover")
        }
    },
    cfs: function() {
        for (var e = this, r = 0; r <= e.f.length - 1; r++) e.f[r].popup.destroy(), e.f[r].popup2.destroy();
        e.ll.destroyFeatures(), e.f = []
    },
    hr: function(e) {
        e.marker.events.register("mouseover", e.marker, function() {
            e.popup2.show()
        }), e.marker.events.register("mouseout", e.marker, function() {
            e.popup2.hide()
        })
    },
    m2p: function(e) {
        var r, t = this.map.getZoom();
        switch (t) {
            case 0:
                r = e / 156412;
                break;
            case 1:
                r = e / 78206;
                break;
            case 2:
                r = e / 39103;
                break;
            case 3:
                r = e / 19551;
                break;
            case 4:
                r = e / 9776;
                break;
            case 5:
                r = e / 4888;
                break;
            case 6:
                r = e / 2444;
                break;
            case 7:
                r = e / 1222;
                break;
            case 8:
                r = e / 610.984;
                break;
            case 9:
                r = e / 305.492;
                break;
            case 10:
                r = e / 152.746;
                break;
            case 11:
                r = e / 76.373;
                break;
            case 12:
                r = e / 38.187;
                break;
            case 13:
                r = e / 19.093;
                break;
            case 14:
                r = e / 9.547;
                break;
            case 15:
                r = e / 4.773;
                break;
            case 16:
                r = e / 2.387;
                break;
            case 17:
                r = e / 1.193;
                break;
            case 18:
                r = e / .596;
                break;
            case 19:
                r = e / .298
        }
        return r
    },
    destroy: function() {
        var e = this;
        e.f = []
    }
});