webpackJsonp([13],{CXWy:function(t,n,i){n=t.exports=i("FZ+f")(!1),n.push([t.i,".input-container[data-v-4d76b955]{width:80px;display:inline-block;margin:0 10px}.setting-box[data-v-4d76b955]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:10px}.annotation[data-v-4d76b955]{color:#f30;margin-bottom:10px}.cost-set-container .ivu-row[data-v-4d76b955]{margin-bottom:10px}.vote-flex[data-v-4d76b955]{display:-webkit-box;display:-ms-flexbox;display:flex}.set-label[data-v-4d76b955]{display:inline-block;width:80px;text-align:right}.set-item[data-v-4d76b955]{margin-bottom:15px}.set-item>p[data-v-4d76b955]{color:#999;font-size:12px}.label-box[data-v-4d76b955]{display:inline-block;width:130px}.cost-set-box[data-v-4d76b955]{border:1px solid #999;border-radius:5px;padding:10px 0;margin:10px 0;width:900px}",""])},Cpij:function(t,n,i){"use strict";var s=i("mvHQ"),_=i.n(s),a=i("gyMJ"),E=i("Ucwc"),e=i.n(E);n.a={data:function(){return{configInfo:{}}},created:function(){var t=this;this.$Spin.show(),this.getConfig().then(function(){return setTimeout(function(){return t.$Spin.hide()},500)}).catch(function(){return t.$Spin.hide()})},methods:{getConfig:function(){var t=this;return i.i(a.d)().then(function(n){var i=n.data;i.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM=e.a.times(i.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM,100),i.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE=e.a.times(i.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE,100),i.DOUBLE_PROPOSAL_SPONSOR_PERCENT=e.a.times(i.DOUBLE_PROPOSAL_SPONSOR_PERCENT,100),i.DOUBLE_WITHDRAW_FEE_PERCENT=e.a.times(i.DOUBLE_WITHDRAW_FEE_PERCENT,100),i.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE=e.a.times(i.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE,100);for(var s in i)"STRING_WITHDRAW_DESCRIPTION_ZH_CN"!==s&&"STRING_WITHDRAW_DESCRIPTION_ZH_HK"!==s&&(i[s]=1*i[s]);t.configInfo=i})},setConfig:function(){var t=this,n=[],s=JSON.parse(_()(this.configInfo));s.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM=e.a.divide(s.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM,100),s.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE=e.a.divide(s.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE,100),s.DOUBLE_PROPOSAL_SPONSOR_PERCENT=e.a.divide(s.DOUBLE_PROPOSAL_SPONSOR_PERCENT,100),s.DOUBLE_WITHDRAW_FEE_PERCENT=e.a.divide(s.DOUBLE_WITHDRAW_FEE_PERCENT,100),s.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE=e.a.divide(s.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE,100);for(var E in s)n.push({name:E,value:s[E]});i.i(a.e)({sysconfigDTOs:_()(n)}).then(function(n){return t.$Message.success("设置成功！")})}}}},INDx:function(t,n,i){"use strict";function s(t){i("cflp")}Object.defineProperty(n,"__esModule",{value:!0});var _=i("Cpij"),a=i("IfgO"),E=i("VU/8"),e=s,o=E(_.a,a.a,!1,e,"data-v-4d76b955",null);n.default=o.exports},IfgO:function(t,n,i){"use strict";var s=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{attrs:{id:"platformSettings"}},[i("Form",[i("div",{staticClass:"com-settings-header"},[i("h4",[t._v("费用设置")])]),t._v(" "),i("div",{staticClass:"cost-set-container"},[i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n          群体智能：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("div",{staticClass:"set-item"},[i("span",{staticClass:"label-box"},[t._v("发起费用：")]),t._v(" "),i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_INTELLIGENCE_PAY_TKC,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_INTELLIGENCE_PAY_TKC",n)},expression:"configInfo.INTEGER_PROPOSAL_INTELLIGENCE_PAY_TKC"}}),t._v("\n            TKC\n          ")],1),t._v(" "),i("div",{staticClass:"set-item"},[i("span",{staticClass:"label-box"},[t._v("发起者收益比例：")]),t._v(" "),i("InputNumber",{attrs:{max:100,min:0},model:{value:t.configInfo.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE,callback:function(n){t.$set(t.configInfo,"DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE",n)},expression:"configInfo.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE"}}),t._v("\n            %\n            "),i("p",[t._v("注：此收益比例是指该提案可分配收益中发起者分配比例")])],1),t._v(" "),i("div",{staticClass:"set-item"},[i("span",{staticClass:"label-box"},[t._v("平台收取服务费比例：")]),t._v(" "),i("InputNumber",{attrs:{max:100,min:0},model:{value:t.configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE,callback:function(n){t.$set(t.configInfo,"DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE",n)},expression:"configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE"}}),t._v("\n            %\n            "),i("p",[t._v("注：此服务费比例是指该提案可分配收益中平台收取的服务费比例")])],1)])],1),t._v(" "),i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        全民公决：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("div",[i("span",{staticClass:"label-box"},[t._v("发起费用：")]),t._v(" "),i("div",{staticClass:"vote-set-container cost-set-box"},[i("div",{staticClass:"vote-flex"},[i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("布衣：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BY,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BY",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BY"}})],1),t._v(" TKC")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("百夫长：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BFZ,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BFZ",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BFZ"}})],1),t._v(" TKC")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("知府：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_ZF,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_ZF",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_ZF"}})],1),t._v(" TKC")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("刺史：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CS,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CS",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CS"}})],1),t._v(" TKC")])]),t._v(" "),i("div",{staticClass:"vote-flex"},[i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("太守：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_TS,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_TS",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_TS"}})],1),t._v(" TKC")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("国王：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_GW,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_GW",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_GW"}})],1),t._v(" TKC")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("创世：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CHS,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CHS",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CHS"}})],1),t._v(" TKC")])])])]),t._v(" "),i("div",[i("div",{staticClass:"set-item"},[i("span",{staticClass:"label-box"},[t._v("平台收取服务费比例：")]),t._v(" "),i("InputNumber",{attrs:{max:100,min:0},model:{value:t.configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM,callback:function(n){t.$set(t.configInfo,"DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM",n)},expression:"configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM"}}),t._v("\n              %\n              "),i("p",[t._v("注：此服务费比例是对每个有效全民公决参投用户收取的服务费占比。如服务费比例为20%，用户参投10TKC，则平台收取2TKC，其余退还用户余额账户。")])],1)])])],1),t._v(" "),i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        提现服务费：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("InputNumber",{attrs:{max:100,min:0},model:{value:t.configInfo.DOUBLE_WITHDRAW_FEE_PERCENT,callback:function(n){t.$set(t.configInfo,"DOUBLE_WITHDRAW_FEE_PERCENT",n)},expression:"configInfo.DOUBLE_WITHDRAW_FEE_PERCENT"}}),t._v(" %Tkc\n          "),i("p",{staticStyle:{color:"#999999"}},[t._v("注：此服务费是指用户在提现时，平台收取的提案服务费")])],1)],1),t._v(" "),i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        提现简体说明：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("Input",{staticStyle:{width:"600px"},attrs:{type:"textarea",autosize:{minRows:3,maxRows:8},placeholder:"提现简体说明"},model:{value:t.configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_CN,callback:function(n){t.$set(t.configInfo,"STRING_WITHDRAW_DESCRIPTION_ZH_CN",n)},expression:"configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_CN"}})],1)],1),t._v(" "),i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        提现繁体说明：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("Input",{staticStyle:{width:"600px"},attrs:{type:"textarea",autosize:{minRows:3,maxRows:8},placeholder:"提现繁体说明"},model:{value:t.configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_HK,callback:function(n){t.$set(t.configInfo,"STRING_WITHDRAW_DESCRIPTION_ZH_HK",n)},expression:"configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_HK"}})],1)],1)],1),t._v(" "),i("div",{staticClass:"com-settings-header"},[i("h4",[t._v("提案设置")])]),t._v(" "),i("div",{staticClass:"draft-set-container"},[i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        提案生效票数：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("div",{staticClass:"setting-box"},[t._v("全民公决 "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_EFFECTIVE,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_EFFECTIVE",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_EFFECTIVE"}})],1),t._v(" 票 ")]),t._v(" "),i("div",{staticClass:"setting-box"},[t._v("群体智能 "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_INTELLIGENCE_EFFECTIVE,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_INTELLIGENCE_EFFECTIVE",n)},expression:"configInfo.INTEGER_PROPOSAL_INTELLIGENCE_EFFECTIVE"}})],1),t._v(" 票 ")])])],1)],1),t._v(" "),i("div",{staticClass:"com-settings-header"},[i("h4",[t._v("企业用户设置")])]),t._v(" "),i("div",{staticClass:"draft-set-container"},[i("Row",[i("Col",{attrs:{span:"3"}},[t._v("\n        发起提案费用：\n        ")]),t._v(" "),i("Col",{attrs:{span:"21"}},[i("div",{staticClass:"setting-box"},[t._v("全民公决 "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_REFERENDUM_ENTERPRISE_PAY_TKC,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_REFERENDUM_ENTERPRISE_PAY_TKC",n)},expression:"configInfo.INTEGER_PROPOSAL_REFERENDUM_ENTERPRISE_PAY_TKC"}})],1),t._v(" TKC ")]),t._v(" "),i("div",{staticClass:"setting-box"},[t._v("群体智能 "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_PROPOSAL_INTELLIGENCE_ENTERPRISE_PAY_TKC,callback:function(n){t.$set(t.configInfo,"INTEGER_PROPOSAL_INTELLIGENCE_ENTERPRISE_PAY_TKC",n)},expression:"configInfo.INTEGER_PROPOSAL_INTELLIGENCE_ENTERPRISE_PAY_TKC"}})],1),t._v(" TKC ")])])],1)],1),t._v(" "),i("div",{staticClass:"com-settings-header"},[i("h4",[t._v("身份票权设置")])]),t._v(" "),i("div",{staticClass:"vote-set-container"},[i("div",{staticClass:"vote-flex"},[i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("布衣：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_BY_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_BY_TICKET",n)},expression:"configInfo.INTEGER_ROLE_BY_TICKET"}})],1),t._v(" 票权")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("百夫长：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_BFZ_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_BFZ_TICKET",n)},expression:"configInfo.INTEGER_ROLE_BFZ_TICKET"}})],1),t._v(" 票权")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("知府：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_ZF_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_ZF_TICKET",n)},expression:"configInfo.INTEGER_ROLE_ZF_TICKET"}})],1),t._v(" 票权")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("刺史：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_CS_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_CS_TICKET",n)},expression:"configInfo.INTEGER_ROLE_CS_TICKET"}})],1),t._v(" 票权")])]),t._v(" "),i("div",{staticClass:"vote-flex"},[i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("太守：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_TS_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_TS_TICKET",n)},expression:"configInfo.INTEGER_ROLE_TS_TICKET"}})],1),t._v(" 票权")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("国王：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_GW_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_GW_TICKET",n)},expression:"configInfo.INTEGER_ROLE_GW_TICKET"}})],1),t._v(" 票权")]),t._v(" "),i("div",{staticClass:"setting-box"},[i("span",{staticClass:"set-label"},[t._v("创世：")]),t._v(" "),i("div",{staticClass:"input-container"},[i("InputNumber",{attrs:{min:0},model:{value:t.configInfo.INTEGER_ROLE_CHS_TICKET,callback:function(n){t.$set(t.configInfo,"INTEGER_ROLE_CHS_TICKET",n)},expression:"configInfo.INTEGER_ROLE_CHS_TICKET"}})],1),t._v(" 票权")])])]),t._v(" "),i("div",{staticStyle:{"text-align":"center",padding:"20px 0"}},[i("Button",{staticStyle:{width:"300px"},attrs:{type:"primary"},on:{click:t.setConfig}},[t._v("保存设置")])],1)])],1)},_=[],a={render:s,staticRenderFns:_};n.a=a},Ucwc:function(t,n,i){"use strict";function s(t,n){return void 0===n&&(n=12),+parseFloat(t.toPrecision(n))}function _(t){var n=t.toString().split(/[eE]/),i=(n[0].split(".")[1]||"").length-+(n[1]||0);return i>0?i:0}function a(t){if(-1===t.toString().indexOf("e"))return Number(t.toString().replace(".",""));var n=_(t);return n>0?t*Math.pow(10,n):t}function E(t){(t>Number.MAX_SAFE_INTEGER||t<Number.MIN_SAFE_INTEGER)&&console.warn(t+" is beyond boundary when transfer to integer, the results may not be accurate")}function e(t,n){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];if(i.length>0)return e.apply(void 0,[e(t,n),i[0]].concat(i.slice(1)));var o=a(t),c=a(n),l=_(t)+_(n),R=o*c;return E(R),R/Math.pow(10,l)}function o(t,n){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];if(i.length>0)return o.apply(void 0,[o(t,n),i[0]].concat(i.slice(1)));var a=Math.pow(10,Math.max(_(t),_(n)));return(e(t,a)+e(n,a))/a}function c(t,n){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];if(i.length>0)return c.apply(void 0,[c(t,n),i[0]].concat(i.slice(1)));var a=Math.pow(10,Math.max(_(t),_(n)));return(e(t,a)-e(n,a))/a}function l(t,n){for(var i=[],s=2;s<arguments.length;s++)i[s-2]=arguments[s];if(i.length>0)return l.apply(void 0,[l(t,n),i[0]].concat(i.slice(1)));var o=a(t),c=a(n);return E(o),E(c),e(o/c,Math.pow(10,_(n)-_(t)))}function R(t,n){var i=Math.pow(10,n);return l(Math.round(e(t,i)),i)}Object.defineProperty(n,"__esModule",{value:!0});var I={strip:s,plus:o,minus:c,times:e,divide:l,round:R,digitLength:_,float2Fixed:a};n.strip=s,n.plus=o,n.minus=c,n.times=e,n.divide=l,n.round=R,n.digitLength=_,n.float2Fixed=a,n.default=I},cflp:function(t,n,i){var s=i("CXWy");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("6da1c098",s,!0)},mvHQ:function(t,n,i){t.exports={default:i("qkKv"),__esModule:!0}},qkKv:function(t,n,i){var s=i("FeBl"),_=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return _.stringify.apply(_,arguments)}}});