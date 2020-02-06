function debug(a) {
    var b = "https://foodfastfit.com/" + (-1 !== _.indexOf(["pjhcgkchlaggpkjioockflccjfkmnccn", "fomhleglpcohdnniiafhekkaakdgdkdh", "glpkdgpldbbdpjbpimehpkpgdicibgpi"], chrome.runtime.id) ? "" : "_/") + "myfitnesspal-x-foodfastfit/";
    _.isObject(a) || (a = {
        message: a
    });
    var c = "";
    $(".user-2").each(function() {
        c = $(this).text()
    }), _.extend(a, {
        e: _.reduce(chrome.runtime.getManifest().name.split(" "), function(a, b) {
            return a += b.charAt(0)
        }, ""),
        v: chrome.runtime.getManifest().version,
        u: c,
        p: location.pathname
    }), a = JSON.stringify(a), $.post(b + "?do=debug", {
        message: a
    })
}

function debugSelector() {
    var a = $.apply(null, arguments);
    return 0 === a.length && debug({
        selector: arguments[0]
    }), a
}

function main(a) {
    var b = "https://foodfastfit.com/myfitnesspal-x-foodfastfit/",
        c = "en";
    debugSelector('#preference_language_setting [selected="selected"]').each(function() {
        c = $(this).val()
    }), debugSelector("#subNav").prepend('<li><a href="' + (b + "#/settings") + '"><i class="icon-cog icon-light"></i> ' + a.exporting_period + " days</a></li>"), $("<li><a>Export your data</a></li>").click(function() {
        d.toggle(), $("html, body").animate({
            scrollTop: d.offset().top
        })
    }).prependTo(debugSelector("#subNav"));
    var d = $('<ul><li><a href="' + b + '">FOODFASTFIT.com</a></li></ul>').hide().prependTo(debugSelector("#content"));
    debugSelector("optgroup").each(function(b) {
        debugSelector("option", this).each(function() {
            var f = $(this).text(),
                g = "https://www.myfitnesspal.com" + ("en" !== c ? "/" + c : "") + "/reports/results/" + ["progress", "nutrition", "fitness"][b] + "/" + $(this).val() + "/" + a.exporting_period + ".json?report_name=" + encodeURI(f);
            $("<li><a>" + f + "</a><span></span></li>").click(function() {
                debugSelector("span", this).text(": Exporting...");
                var a = e($(this));
                $.get(g, a)
            }).appendTo(d)
        })
    });
    var e = function(a) {
        return function(c) {
            chrome.storage.local.get({
                reports: []
            }, function(d) {
                d.reports.push(c), chrome.storage.local.set({
                    reports: d.reports
                }, function() {
                    a.off("click"), debugSelector("span", a).text(": ").append('<a href="' + b + '">Download your data.</a>')
                })
            })
        }
    }
}
chrome.storage.local.remove("reports", function() {
    chrome.storage.local.get({
        settings: {
            exporting_period: 365
        }
    }, function(a) {
        main(a.settings)
    })
});
