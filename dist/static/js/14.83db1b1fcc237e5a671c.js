webpackJsonp([14],{"W++L":function(t,e,a){var r=a("yx58");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("349539a6",r,!0)},k1Wt:function(t,e,a){"use strict";function r(t){a("W++L")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("tvAM"),s=a("obIO"),n=a("VU/8"),o=r,l=n(i.a,s.a,!1,o,"data-v-e715a6ba",null);e.default=l.exports},mvHQ:function(t,e,a){t.exports={default:a("qkKv"),__esModule:!0}},obIO:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"enterprise-user-container"}},[a("div",{staticClass:"filter-container"},[a("Form",[a("FormItem",[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"用户ID"},model:{value:t.parameterList.name,callback:function(e){t.$set(t.parameterList,"name",e)},expression:"parameterList.name"}}),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.filterHandle}},[t._v("查询")])],1),t._v(" "),a("FormItem",{attrs:{label:"状态："}},[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":t.filterHandle},model:{value:t.disabledRadio,callback:function(e){t.disabledRadio=e},expression:"disabledRadio"}},[a("Radio",{attrs:{label:"all"}},[t._v("全部")]),t._v(" "),a("Radio",{attrs:{label:"0"}},[t._v("禁用")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("正常")])],1)],1)],1)],1),t._v(" "),a("Table",{ref:"currentRowTable",attrs:{border:"",stripe:"","highlight-row":"",columns:t.columns,data:t.userTableList}}),t._v(" "),a("div",{staticStyle:{margin:"20px 0 200px"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{current:t.currentPageNum,total:t.pageTotal,"show-total":"","show-elevator":"","show-sizer":""},on:{"update:current":function(e){t.currentPageNum=e},"on-change":function(e){return t.pageChange(e,1)},"on-page-size-change":function(e){return t.pageChange(e,0)}}})],1)]),t._v(" "),a("Modal",{attrs:{width:"360"},model:{value:t.disabledModal,callback:function(e){t.disabledModal=e},expression:"disabledModal"}},[a("p",{staticStyle:{color:"#f90","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"help-circled"}}),t._v(" "),a("span",[t._v("确认操作")])],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[0==t.currentRow.disabled?a("div",[a("Input",{attrs:{type:"textarea",maxlength:200,rows:4,placeholder:"请输入禁用原因..."},model:{value:t.disabledReason,callback:function(e){t.disabledReason=e},expression:"disabledReason"}})],1):a("div",[t._v("\n        确认启用该用户？\n      ")])]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:t.modal_loading},on:{click:t.submitOperate}},[t._v("确认")])],1)])],1)},i=[],s={render:r,staticRenderFns:i};e.a=s},qkKv:function(t,e,a){var r=a("FeBl"),i=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},tvAM:function(t,e,a){"use strict";var r=a("mvHQ"),i=a.n(r),s=a("gyMJ");e.a={data:function(){var t=this;return{pageTotal:0,currentPageNum:1,disabledRadio:"all",disabledModal:!1,disabledReason:"",currentRow:"",modal_loading:!1,parameterList:{offset:0,limit:10,userId:"",disabled:""},columns:[{title:"序号",key:"num",type:"index",width:"80"},{title:"用户ID",key:"userId"},{title:"充值TKC",key:"recharge"},{title:"提现TKC",key:"withdraw"},{title:"当前余额",key:"balance"},{title:"企业全称",key:"name"},{title:"发起提案",key:"launchNum"},{title:"参投提案",key:"voteNum"},{title:"状态",key:"disabled",width:"80",render:function(t,e){return 0==e.row.disabled?t("span",{style:{color:"#259B24"}},"正常"):t("span",{style:{color:"red"}},"禁用")}},{title:"操作",key:"id",render:function(e,a){return e("div",[e("span",{style:{color:0==a.row.disabled?"red":"#19be6b",cursor:"pointer"},props:{type:"text"},on:{click:function(){t.userUpdateStatus(a.row)}}},0==a.row.disabled?"禁用":"启用")])}},{title:"查看",key:"id",render:function(e,a){return e("a",{attrs:{href:"javascript:;"},on:{click:function(){return t.toEnterpriseInfo(a.row)}}},"查看详情")}}],userTableList:[]}},created:function(){this.$Spin.show(),this.userIndexList()},methods:{userIndexList:function(){var t=this;return"all"!=this.disabledRadio?this.parameterList.disabled=this.disabledRadio:this.parameterList.disabled="",a.i(s.E)(this.parameterList).then(function(e){t.userTableList=e.data.rows,t.pageTotal=e.data.total})},userUpdateStatus:function(t){this.disabledModal=!0,this.currentRow=t},pageChange:function(t,e){e?this.parameterList.offset=t-1:this.parameterList.limit=t,this.parameterList.offset=this.parameterList.offset*this.parameterList.limit,this.userIndexList()},filterHandle:function(){this.parameterList.offset=0,this.parameterList.limit=10,this.currentPageNum=1,this.userIndexList()},toEnterpriseInfo:function(t){localStorage.setItem("eInfo",i()(t)),this.$router.push("/user/enterpriseInfo?userId="+t.id)},submitOperate:function(){var t=this;if(0==this.currentRow.disabled&&!this.disabledReason)return void this.$Message.error("请输入禁用原因！");a.i(s.F)({id:this.currentRow.id,disabled:0==this.currentRow.disabled?1:0,reason:this.disabledReason}).then(function(e){t.currentRow.disabled=0==t.currentRow.disabled?1:0,1==t.currentRow.disabled&&(t.currentRow.reason=t.disabledReason),t.disabledModal=!1})}}}},yx58:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"",""])}});