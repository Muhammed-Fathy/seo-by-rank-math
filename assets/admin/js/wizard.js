!function(){"use strict";var t={jquery:function(t){t.exports=jQuery}},e={};function n(a){var i=e[a];if(void 0!==i)return i.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,n),r.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var a={};!function(){n.r(a);var t,e=n("jquery");(t=n.n(e)())((function(){window.rankMathSetupWizard={init:function(){rankMath.currentStep in this&&this[rankMath.currentStep](),t(document).on("cmb_init",(function(){t(".cmb-multicheck-toggle",".multicheck-checked").trigger("click")}))},compatibility:function(){t(".wizard-deactivate-plugin").on("click",(function(e){e.preventDefault();var n=t(this);if(!n.hasClass("disabled")){var a=n.closest("tr");t.ajax({url:rankMath.ajaxurl,type:"POST",data:{action:"rank_math_deactivate_plugins",security:rankMath.security,plugin:n.data("plugin")}}).always((function(t){"1"===t&&(a.find(".dashicons-warning").removeClass("dashicons-warning").addClass("dashicons-yes"),n.addClass("disabled").text(rankMath.deactivated))}))}})),t(".rank-math-setup-mode.is-free ul li:last-child").on("click",(function(t){return t.preventDefault(),window.open("//rankmath.com/pricing/?utm_source=Plugin&utm_medium=Setup%20Wizard%20Custom%20Mode&utm_campaign=WP"),!1}))},import:function(){var e=t("#import-progress"),n=t("#import-progress-bar"),a=0,i=0,r=function(t,e){var n=new Date,a=e.val()+"["+(10>n.getHours()?"0":"")+n.getHours()+":"+(10>n.getMinutes()?"0":"")+n.getMinutes()+":"+(10>n.getSeconds()?"0":"")+n.getSeconds()+"] "+t+"\n";e.text(a).scrollTop(e[0].scrollHeight-e.height()-20)},o=function(t){t>100&&(t=100),n.find(".number").html(t),n.find("#importBar").css("width",t+"%")},c=function e(n,c,u,s,p,l){if(0!==c.length){s=s||1;var d=c.shift(),h="deactivate"===d?"Deactivating "+l:"Importing "+d+" from "+l,g=Math.floor(100/i);r(h,u),t.ajax({url:rankMath.ajaxurl,type:"POST",data:{perform:d,pluginSlug:n,paged:s,action:"rank_math_import_plugin",security:rankMath.security}}).success((function(t){var i=1;t&&t.page&&t.page<t.total_pages&&(i=t.page+1,c.unshift(d)),t&&t.total_pages&&(g=Math.ceil(g/t.total_pages)),o(a+=g),r(t.success?t.message:t.error,u),e(n,c,u,i,p,l)})).error((function(t){r(t.statusText,u),e(n,c,u,null,p,l)}))}else p()};t(".button-import",".form-footer").on("click",(function(a){if(a.preventDefault(),rankMath.isConfigured&&!window.confirm(rankMath.confirm))return!1;var c=t(".import-data:checkbox:checked");if(!c.length)return window.alert("Please select plugin to import data."),!1;var s=t(this),p={},l=[];t.each(c,(function(){var e=t(this).val(),n=t(this).parents(".cmb-group-description").next().find(":checkbox:checked"),a=n.data("active"),r=t(this).data("plugin");l.push(r);var o=t.map(n,(function(t){return t.value}));0<o.length&&a&&o.push("deactivate"),i+=o.length,p[e]={plugin:r,actions:o}})),s.prop("disabled",!0),e.show(),n.show(),n.find(".plugin-from").html(l.join()),r("Import started...",e),u(p,e,(function(){o(100),s.prop("disabled",!1),t(".button",".form-footer").hide(),t(".button-continue").show()}))}));var u=function t(n,a,i){var o=Object.keys(n),u=o.length,s=n[o[0]],p=Object.keys(n)[0];if(delete n[p],0===u)return r("Import finished. Click on the button below to continue the Setup Wizard.",a),void i();c(p,s.actions,e,null,(function(){t(n,a,i)}),s.plugin)};t(".import-data").on("change",(function(){for(var e=t(this),n=this.checked,a=e.parents(".cmb-group-description").next().find(".cmb2-option"),i=0;i<a.length;i++)"checkbox"===a[i].type&&(a[i].checked=n);n&&("yoast"===e.val()?(t('.import-data[value="aioseo"]').prop("checked",!1).trigger("change"),t('.import-data[value="seopress"]').prop("checked",!1).trigger("change")):"aioseo"===e.val()?(t('.import-data[value="yoast"]').prop("checked",!1).trigger("change"),t('.import-data[value="seopress"]').prop("checked",!1).trigger("change")):"seopress"===e.val()&&(t('.import-data[value="yoast"]').prop("checked",!1).trigger("change"),t('.import-data[value="aioseo"]').prop("checked",!1).trigger("change")))})),t(".cmb-type-group .cmb2-checkbox-list .cmb2-option").on("click",(function(){var e=t(this),n=e.attr("name"),a=e.parents("ul").find('input[name="'+n+'"]:checkbox:checked'),i=e.parents("ul").find('input[name="'+n+'"]');a.length===i.length&&e.parents(".cmb-type-group").find(".import-data").prop("checked",!0).trigger("change")})),t(".button-deactivate-plugins").on("click",(function(e){var n=t(this);n.parents("form").find("input[data-active]").length&&(e.preventDefault(),n.text(n.data("deactivate-message")),t.ajax({url:rankMath.ajaxurl,type:"POST",data:{action:"rank_math_deactivate_plugins",security:rankMath.security,plugin:"all"}}).success((function(){n.parents("form").trigger("submit")})).error((function(){window.alert("Something went wrong! Please try again later.")})))}))},yoursite:function(){t("#rank-math-search-input").on("input keypress",(function(e){var n=t(this),a=n.next();if(13===e.keyCode||13===e.which){if("createEvent"in document){var i=this.ownerDocument,r=i.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,i.defaultView,1,0,0,0,0,!1,!1,!1,!1,0,null),a[0].dispatchEvent(r)}return!1}a.attr("href",a.data("href")+encodeURIComponent(n.val()))}));var e=t("#business_type");0!==parseInt(e.data("default"))&&t("#site_type").on("change",(function(){var n=t(this).val();"news"!==n&&"webshop"!==n&&"otherbusiness"!==n||e.val("Organization").trigger("change"),"business"===n&&e.val("LocalBusiness").trigger("change")}))},analytics:function(){t("#console_authorization_code").on("paste",(function(){var e=t(this).next(".button");setTimeout((function(){e.trigger("click")}),100)}))},ready:function(){t("#auto-update").on("change",(function(){t(".rank-math-auto-update-email-wrapper").toggle(t(this).is(":checked"))})),t(".rank-math-additional-options input.rank-math-modules").on("change",(function(){var e=t(this);t.ajax({url:rankMath.api.root+"rankmath/v1/autoUpdate",method:"POST",beforeSend:function(t){t.setRequestHeader("X-WP-Nonce",rankMath.api.nonce)},data:{key:e.data("key"),value:e.is(":checked")}})}))}},window.rankMathSetupWizard.init()}))}()}();