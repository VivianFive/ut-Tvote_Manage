webpackJsonp([15],{ED7H:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"user-container"}},[a("div",{staticClass:"filter-container"},[a("Form",[a("FormItem",[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"用户ID"},model:{value:t.parameterList.name,callback:function(e){t.$set(t.parameterList,"name",e)},expression:"parameterList.name"}}),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.filterHandle}},[t._v("查询")])],1),t._v(" "),a("FormItem",{attrs:{label:"状态："}},[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":t.filterHandle},model:{value:t.statusRadio,callback:function(e){t.statusRadio=e},expression:"statusRadio"}},[a("Radio",{attrs:{label:"all"}},[t._v("全部")]),t._v(" "),a("Radio",{attrs:{label:"0"}},[t._v("禁用")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("正常")])],1)],1)],1)],1),t._v(" "),a("Table",{ref:"currentRowTable",attrs:{border:"",stripe:"","highlight-row":"",columns:t.columns,data:t.userTableList}}),t._v(" "),a("div",{staticStyle:{margin:"20px 0 200px"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{current:t.currentPageNum,total:t.pageTotal,"show-total":"","show-elevator":"","show-sizer":""},on:{"update:current":function(e){t.currentPageNum=e},"on-change":function(e){return t.pageChange(e,1)},"on-page-size-change":function(e){return t.pageChange(e,0)}}})],1)])],1)},i=[],s={render:r,staticRenderFns:i};e.a=s},GSAv:function(t,e,a){var r=a("NzH1");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("740a5870",r,!0)},JCUO:function(t,e,a){"use strict";var r=a("gyMJ");e.a={data:function(){var t=this;return{pageTotal:0,currentPageNum:1,statusRadio:"all",parameterList:{offset:0,limit:10,name:"",state:""},columns:[{title:"序号",key:"num",type:"index",width:"80"},{title:"用户ID",key:"phone"},{title:"充值TKC",key:"rechargeTkc"},{title:"投入TKC",key:"costTkc"},{title:"提现TKC",key:"withdrawTkc"},{title:"当前余额",key:"availableTkc"},{title:"身份",key:"userRole",render:function(t,e){return e.row.userRole||"-"}},{title:"发起提案",key:"proposalCount"},{title:"参投提案",key:"costCount"},{title:"状态",key:"state",width:"80",render:function(t,e){return 1==e.row.state?t("span",{style:{color:"#259B24"}},"正常"):t("span",{style:{color:"red"}},"禁用")}},{title:"操作",key:"id",render:function(e,a){return e("div",[e("span",{style:{color:1==a.row.state?"red":"#19be6b",cursor:"pointer"},props:{type:"text"},on:{click:function(){t.userUpdataStatus(a.row)}}},1==a.row.state?"禁用":"启用")])}},{title:"查看",key:"id",render:function(t,e){return t("router-link",{props:{to:"/user/userInfo?userId="+e.row.id}},"查看详情")}}],userTableList:[]}},created:function(){var t=this;this.$Spin.show(),this.userIndexList().then(function(){return setTimeout(function(){return t.$Spin.hide()},500)}).catch(function(){return t.$Spin.hide()})},methods:{userIndexList:function(){var t=this;return"all"!=this.statusRadio?this.parameterList.state=this.statusRadio:this.parameterList.state="",a.i(r.J)(this.parameterList).then(function(e){t.userTableList=e.data.rows,t.pageTotal=e.data.total})},userUpdataStatus:function(t){this.$Modal.confirm({title:"操作确认",content:"确定"+(1==t.state?"禁用":"启用")+"该用户？",onOk:function(){a.i(r.K)({id:t.id,state:1==t.state?0:1}).then(function(e){t.state=1==t.state?0:1})}})},pageChange:function(t,e){e?this.parameterList.offset=t-1:this.parameterList.limit=t,this.parameterList.offset=this.parameterList.offset*this.parameterList.limit,this.userIndexList()},filterHandle:function(){this.parameterList.offset=0,this.parameterList.limit=10,this.currentPageNum=1,this.userIndexList()}}}},NzH1:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,"",""])},md3T:function(t,e,a){"use strict";function r(t){a("GSAv")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("JCUO"),s=a("ED7H"),n=a("VU/8"),o=r,u=n(i.a,s.a,!1,o,"data-v-18f0e84b",null);e.default=u.exports}});