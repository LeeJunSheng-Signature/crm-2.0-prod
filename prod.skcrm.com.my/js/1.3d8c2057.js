(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"36dc":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-select",{staticClass:"q-pb-none q-ml-sm",attrs:{options:t.filteredOptions,label:t.label,outlined:"",dense:"","emit-value":"","use-input":"","input-debounce":"0","map-options":"","stack-label":"",clearable:""},on:{filter:t.filterFn,input:t.onInput},scopedSlots:t._u([t.m_val?{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"cancel"},on:{click:function(e){e.stopPropagation(),t.m_val=null}}})]},proxy:!0}:null,{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-italic text-grey"},[t._v("\n        No options available\n      ")])],1)]},proxy:!0}],null,!0),model:{value:t.m_val,callback:function(e){t.m_val=e},expression:"m_val"}})},r=[],n=(a("c975"),a("ddb0"),{props:{options:{type:Array,default:()=>[],required:!0},value:{type:String,default:"",required:!0},label:{type:String,default:"",required:!0}},data(){return{filteredOptions:[],m_val:""}},created(){this.filteredOptions=[...this.options]},methods:{filterFn(t,e){""!==t&&this.options.length?e(()=>{const e=t.toLowerCase();this.options[0].label?this.filteredOptions=this.options.filter(t=>t.label.toLowerCase().indexOf(e)>-1):this.filteredOptions=this.options.filter(t=>t.toLowerCase().indexOf(e)>-1)}):e(()=>{this.filteredOptions=this.options})},onInput(t){this.$emit("input",t)}}}),l=n,o=a("2877"),i=Object(o["a"])(l,s,r,!1,null,null,null);e["a"]=i.exports},"7ca6":function(t,e,a){"use strict";var s=a("b9d8"),r=a.n(s);r.a},b9d8:function(t,e,a){},ec95:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-gutter-md q-py-lg q-px-xl"},[a("div",{staticClass:"row"},[a("dashboard-cards-list")],1),a("div",{staticClass:"column q-mt-xl"},[a("q-card",{staticClass:"q-mb-lg"},[a("q-card-section",{staticClass:"q-pa-md"},[a("sk-sales-funnel-table-chart")],1)],1),a("q-card",[a("q-card-section",{staticClass:"q-pa-md"},[a("sk-sales-funnel-conversion-pyramid-chart")],1)],1)],1)])},r=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-card",{staticClass:"q-pt-md q-mb-lg"},[a("div",{staticClass:"row q-mr-xl q-mb-md"},[a("p",{staticClass:"q-ml-lg q-mb-md text-bold text-h6"},[t._v("\n        Quick Insights\n      ")]),a("q-space"),a("div",{staticClass:"row justify-evenly q-gutter-md items-start",staticStyle:{width:"40%"}},[a("q-select",{staticClass:"q-mb-sm col",attrs:{value:t.convertedDate(t.filter.date.from),clearable:"",dense:"",filled:"",label:"Date: From"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{options:t.startDateOptions,minimal:""},model:{value:t.filter.date.from,callback:function(e){t.$set(t.filter.date,"from",e)},expression:"filter.date.from"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("q-select",{staticClass:"col",attrs:{value:t.convertedDate(t.filter.date.to),clearable:"",dense:"",filled:"",label:"Date: To"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{minimal:"",options:t.endDateOptions},model:{value:t.filter.date.to,callback:function(e){t.$set(t.filter.date,"to",e)},expression:"filter.date.to"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("div",{staticClass:"q-mt-sm row q-gutter-sm"},t._l(["Q1","Q2","Q3","Q4"],(function(e){return a("q-btn",{key:e,staticClass:"text-bold",attrs:{round:"",outline:e!==t.selectedQuarter,size:"10px",color:"primary"},on:{click:function(a){t.selectedQuarter=t.selectedQuarter===e?"":e}}},[t._v("\n            "+t._s(e)+"\n          ")])})),1)],1)],1)]),a("div",{staticClass:"row justify-evenly q-gutter-lg"},t._l(t.cardsConfig,(function(e){return a("q-card",{key:e.name,staticClass:"q-px-xl q-py-md",staticStyle:{"min-width":"20vw"},style:{background:e.background},attrs:{square:"",dark:""}},[a("q-card-section",{attrs:{horizontal:""}},[a("q-card-section",{staticClass:"full-width"},[a("div",{staticClass:"text-overline text-center"},[t._v("\n            "+t._s(e.title)+"\n          ")]),e.multiline?a("div",{staticClass:"column q-mt-sm q-mb-xs items-center",staticStyle:{"font-size":"18px"}},t._l(Object.keys(e.data),(function(s){return a("div",{key:s},[t._v("\n              "+t._s(s)+" : "+t._s(e.data[s])+"\n            ")])})),0):a("div",{staticClass:"text-h5 q-mt-sm q-mb-xs text-center"},[t._v("\n            "+t._s(e.data)+"\n          ")])])],1)],1)})),1)],1)},l=[],o=(a("ddb0"),a("c973")),i=a.n(o),c=a("ded3"),d=a.n(c),u=(a("0481"),a("4069"),a("5f36"));const f=[{relation:"designs"},{relation:"lead"}],h={methods:{fetchFCOAmount(t){var e=this;return i()((function*(){let{data:a}=yield e.$repository.fco.listing(d()(d()({},t),{},{include:f}));return a=a.filter(t=>!!t.lead),yield u["a"].deleteAll(),yield u["a"].insert({data:a}),a.length?u["a"].query().first().calculateGrandTotal.toFixed(2):0}))()},fetchFCOCount(t){var e=this;return i()((function*(){const{data:a}=yield e.$repository.fco.listing(t);return a.length}))()},fetchProposals({where:t}){var e=this;return i()((function*(){const{data:a}=yield e.$repository.lead.listing({where:d()({state:"LD"},t),include:[{relation:"designs",scope:{where:{state:"SummaryQuotation"}}}]});return a.filter(t=>!!t.designs).map(t=>t.designs).flat()}))()},fetchCustomerCount({state:t,status:e,filter:a}){var s=this;return i()((function*(){const{data:{count:r}}=yield s.$repository.lead.count(d()({state:t,status:e},a));return r}))()}}};var m=h,p=(a("a434"),a("b178"));const{formatDate:C}=p["e"],b={data(){return{selectedQuarter:"",filter:{date:{from:"",to:""},branchId:"",userId:""},salesConsultants:[],options:{branch:[],salesConsultant:[]}}},created:function(){var t=i()((function*(){yield this.getBranchOptions(),yield this.getSalesConsultantOptions(),this.selectedQuarter=this.currentQuarter}));return function(){return t.apply(this,arguments)}}(),watch:{selectedQuarter:function(t){if(!t)return void(this.filter.date={from:void 0,to:void 0});const e={Q1:{startMonth:0,endMonth:2},Q2:{startMonth:3,endMonth:5},Q3:{startMonth:6,endMonth:8},Q4:{startMonth:9,endMonth:11}},{startMonth:a,endMonth:s}=e[t],r=(new Date).getFullYear(),n=new Date(r,a,1),l=new Date(r,s+1,0);this.filter.date={from:C(n,"YYYY/MM/DD"),to:C(l,"YYYY/MM/DD")}},"filter.branchId":function(t){this.filter.userId="",t?(this.options.salesConsultant=this.salesConsultants.filter(e=>e.branchId===t).map(t=>({label:t.name,value:t.uuid})),this.options.salesConsultant.splice(0,0,{label:"All Consultants",value:""})):this.options.salesConsultant=this.salesConsultants.map(t=>({label:t.name,value:t.uuid}))},filter:{deep:!0,handler:function(){var t=i()((function*(){yield this.populateData()}));return function(){return t.apply(this,arguments)}}()}},computed:{currentQuarter(){const t=(new Date).getMonth(),e=Math.ceil(t/3);return"Q"+e}},methods:{getFilter:function(t){const{userId:e,date:a}=t;let{branchId:s}=t;const[r]=this.$store.getters.roles,n=this.$store.getters.branchId;return s="branchManager"===r?n:s,{userId:e||void 0,branchId:s||void 0,createdAt:a.from||a.to?{gt:a.from?a.from:void 0,lt:a.to?a.to:void 0}:void 0}},getBranchOptions:function(){var t=i()((function*(){const{data:t}=yield this.$repository.branch.listing();this.options.branch=t.map(t=>({label:t.name,value:t.uuid}))}));return function(){return t.apply(this,arguments)}}(),getSalesConsultantOptions:function(){var t=i()((function*(){const{data:[{uuid:t}]}=yield this.$repository.role.listing({where:{name:"salesConsultant"}}),[e]=this.$store.getters.roles,a=this.$store.getters.branchId,{data:s}=yield this.$repository.role.users(t,{where:{branchId:"branchManager"===e?a:void 0}});this.salesConsultants=s,this.options.salesConsultant=s.map(t=>({label:t.name,value:t.uuid})),this.options.salesConsultant.splice(0,0,{label:"All Consultants",value:""})}));return function(){return t.apply(this,arguments)}}()}};var v=b,g=a("ed08"),y=a("2f62"),q={mixins:[m,v],data(){return{cardsConfig:[{title:"Proposal Amount",data:null,background:"linear-gradient(90deg, rgba(7,4,67,1) -10%, #194e7d 100%)"},{title:"Order Amount",data:null,background:"linear-gradient(135deg, #C56CD6 0%,#3425AF 100%)"},{title:"FCO Amount",data:null,background:"linear-gradient(135deg, #fa6dc1 0%,#A704FD 100%)"},{title:"Pending Order Amount",data:null,background:"linear-gradient(135deg, #2ba2f0 0%,#044cdc 100%)"},{title:"No. of Proposal",data:null,background:"linear-gradient(90deg, rgba(7,4,67,1) -10%, #194e7d 100%)"},{title:"No. of Order",data:null,background:"linear-gradient(135deg, #C56CD6 0%,#3425AF 100%)"},{title:"No. of FCO",multiline:!0,data:{Processed:null,Pending:null},background:"linear-gradient(135deg, #fa6dc1 0%,#A704FD 100%)"},{title:"Pending No. of Order",data:null,background:"linear-gradient(135deg, #2ba2f0 0%,#044cdc 100%)"}]}},computed:d()({},Object(y["b"])(["tableSelection","roles","branchId","userId"])),created(){var t=this;return i()((function*(){yield t.populateData()}))()},methods:{getCardConfig(t){return this.cardsConfig.find(e=>e.title===t)},convertedDate(t){let e=t.split("/");return e=`${e[2]}/${e[1]}/${e[0]}`,e},startDateOptions(t){return t<this.filter.date.to},endDateOptions(t){return t>this.filter.date.from},isSalesConsultant(){return"salesconsultant"===this.roles[0]},isSuperUser(){const t=["sysadmin","branchManager"];let e=!1;for(const a of t)if(this.roles[0]===a){e=!0;break}return e},populateData(){var t=this;return i()((function*(){t.filter.userId=t.userId,t.filter.branchId=t.branchId;const{createdAt:e}=t.getFilter(t.filter),a=t.getFilter(t.filter),[s]=t.roles;console.log(e),console.log("this.filter is: []",JSON.stringify(a)),console.log(`The user's role is: ${s}; user ID: ${t.userId}; branchId: ${t.branchId}`);const r=yield t.fetchProposals({where:{createdAt:e}}),n=r.reduce((t,e)=>t+e.totalPrice,0),l=yield t.fetchFCOAmount({where:{state:"FCO",createdAt:e}}),o=yield t.fetchFCOAmount({where:{createdAt:e}}),i=r.length,c=yield t.fetchFCOCount({where:{createdAt:e}}),d=yield t.fetchFCOCount({where:{state:"FCO",status:"Production",createdAt:e}}),u=yield t.fetchFCOCount({where:{state:"FCO",status:{neq:"Production"},createdAt:e}});t.getCardConfig("Proposal Amount").data="RM "+Object(g["f"])(n.toFixed(2)),t.getCardConfig("Order Amount").data="RM "+Object(g["f"])(o),t.getCardConfig("FCO Amount").data="RM "+Object(g["f"])(l),t.getCardConfig("Pending Order Amount").data="RM "+Object(g["f"])(parseFloat((o-l).toFixed(2))),t.getCardConfig("No. of Proposal").data=i,t.getCardConfig("No. of Order").data=c,t.getCardConfig("No. of FCO").data={Processed:d,Pending:u},t.getCardConfig("Pending No. of Order").data=c-(d+u)}))()}}},w=q,O=a("2877"),x=Object(O["a"])(w,n,l,!1,null,null,null),F=x.exports,D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"q-my-md"},[a("p",{staticClass:"q-ml-sm q-mb-sm text-bold text-h6"},[t._v("\n      Filter\n    ")]),a("div",{staticClass:"row justify-evenly q-gutter-md items-start"},[t.showBranchFilter()?a("select-with-filter",{staticClass:"col",attrs:{options:t.options.branch,label:"Branch"},model:{value:t.filter.branchId,callback:function(e){t.$set(t.filter,"branchId",e)},expression:"filter.branchId"}}):t._e(),t.showSalesConsultantFilter()?a("select-with-filter",{staticClass:"col",attrs:{options:t.options.salesConsultant,label:"Sales Consultant"},model:{value:t.filter.userId,callback:function(e){t.$set(t.filter,"userId",e)},expression:"filter.userId"}}):t._e(),a("q-select",{staticClass:"q-mb-sm col",attrs:{value:t.convertedDate(t.filter.date.from),clearable:"",dense:"",filled:"",color:"purple-12",label:"Date: From"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{options:t.startDateOptions,minimal:""},model:{value:t.filter.date.from,callback:function(e){t.$set(t.filter.date,"from",e)},expression:"filter.date.from"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("div",{staticClass:"col"},[a("q-select",{staticClass:"col",attrs:{value:t.convertedDate(t.filter.date.to),clearable:"",dense:"",filled:"",color:"purple-12",label:"Date: To"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{options:t.endDateOptions,minimal:""},model:{value:t.filter.date.to,callback:function(e){t.$set(t.filter.date,"to",e)},expression:"filter.date.to"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("div",{staticClass:"q-mt-sm row q-gutter-sm"},t._l(["Q1","Q2","Q3","Q4"],(function(e){return a("q-btn",{key:e,staticClass:"text-bold",attrs:{round:"",outline:e!==t.selectedQuarter,size:"10px",color:"primary"},on:{click:function(a){t.selectedQuarter=t.selectedQuarter===e?"":e}}},[t._v("\n            "+t._s(e)+"\n          ")])})),1)],1)],1)]),a("q-separator",{staticClass:"q-mb-md"}),a("p",{staticClass:"text-center text-h5 text-bold"},[t._v("\n    "+t._s(t.title)+"\n  ")]),a("div",{staticClass:"flex justify-center"},[a("q-table",{staticClass:"q-pa-xl",staticStyle:{width:"70%"},attrs:{data:t.data,columns:t.columns,"row-key":"name",pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}}})],1)],1)},$=[],Q=a("36dc"),_={components:{SelectWithFilter:Q["a"]},mixins:[v,m],data(){return{show:{fromDatePicker:!1,toDatePicker:!1},pagination:{rowsPerPage:0},columns:[{name:"name",required:!0,label:"Sales Funnel",align:"left",field:t=>t.name,sortable:!1},{name:"customerCount",required:!0,label:"Customer Count",align:"center",field:t=>t.customerCount,sortable:!0},{name:"amount",required:!0,label:"Amount",align:"center",field:t=>t.amount,sortable:!0}],data:[{name:"Online Leads",customerCount:0,amount:0},{name:"Qualified Leads",customerCount:0,amount:0},{name:"Design Proposal",customerCount:0,amount:0},{name:"Pending Decision",customerCount:0,amount:0},{name:"Lost",customerCount:0,amount:0},{name:"Order Confirmation",customerCount:0,amount:0},{name:"Final Confirmation Order",customerCount:0,amount:0}]}},computed:d()(d()({},Object(y["b"])(["roles","branchId"])),{},{title(){const t="Sales Funnel",{date:e,branchId:a,userId:s}=this.filter,r=e.from?"from "+this.convertedDate(e.from):"",n=e.to?"until "+this.convertedDate(e.to):"";let l=a?this.options.branch.find(t=>t.value===a):null;l=l?""+l.label:"";let o=s?this.options.salesConsultant.find(t=>t.value===s):null;return o=o?"for "+o.label:"",`${l} ${t} ${r} ${n} ${o}`}}),created(){var t=this;return i()((function*(){t.$q.loading.show(),yield t.populateData(),t.$q.loading.hide()}))()},methods:{populateData(){var t=this;return i()((function*(){const e=t.getFilter(t.filter),a=yield t.fetchNumCustomerSeries(e),s=yield t.fetchAmountSeries(e);for(const r in a){const e=a[r],n=s[r],l={customerCount:e,amount:"RM "+Object(g["f"])(n)};t.data[r]=d()(d()({},t.data[r]),l)}console.log(t.data),t.data=[...t.data]}))()},isUserRole(t){return this.roles[0]===t},convertedDate(t){let e=t.split("/");return e=`${e[2]}/${e[1]}/${e[0]}`,e},getUserRole(t){const e=this.roles[0];return t.includes(e)},showBranchFilter(){const t=["sysadmin","hQManager","hQAccountant","hQsalessupport"];return this.getUserRole(t)},showSalesConsultantFilter(){const t=["sysadmin","branchManager","hQManager","hQAccountant","hQsalessupport"];return this.getUserRole(t)},startDateOptions(t){return t<this.filter.date.to},endDateOptions(t){return t>this.filter.date.from},fetchNumCustomerSeries(t){var e=this;return i()((function*(){const a=yield e.fetchCustomerCount({state:"OL",filter:t}),s=yield e.fetchCustomerCount({state:"QL",filter:t}),r=yield e.fetchCustomerCount({state:"LD",filter:t}),n=yield e.fetchCustomerCount({state:"LD",status:"Pending Decision",filter:t}),l=yield e.fetchCustomerCount({state:"LD",status:"Lost",filter:t}),o=yield e.fetchFCOCount({where:t}),i=yield e.fetchFCOCount({where:d()({state:"FCO",status:"Production"},t)});return[a,s,r,n,l,o,i]}))()},fetchAmountSeries(t){var e=this;return i()((function*(){const a=yield e.fetchFCOAmount({where:d()({state:"FCO"},t)}),s=yield e.fetchFCOAmount({where:d()({state:"OC"},t)});return[0,0,0,0,0,s,a]}))()}}},k=_,I=Object(O["a"])(k,D,$,!1,null,null,null),A=I.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"q-my-md"},[a("p",{staticClass:"q-ml-sm q-mb-sm text-bold text-h6"},[t._v("\n      Filter\n    ")]),a("div",{staticClass:"row justify-evenly q-gutter-md items-start"},[t.showBranchFilter()?a("select-with-filter",{staticClass:"col",attrs:{options:t.options.branch,label:"Branch"},model:{value:t.filter.branchId,callback:function(e){t.$set(t.filter,"branchId",e)},expression:"filter.branchId"}}):t._e(),t.showSalesConsultantFilter()?a("select-with-filter",{staticClass:"col",attrs:{options:t.options.salesConsultant,label:"Sales Consultant"},model:{value:t.filter.userId,callback:function(e){t.$set(t.filter,"userId",e)},expression:"filter.userId"}}):t._e(),a("q-select",{staticClass:"q-mb-sm col",attrs:{value:t.convertedDate(t.filter.date.from),clearable:"",dense:"",filled:"",color:"purple-12",label:"Date: From"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{options:t.startDateOptions,minimal:""},model:{value:t.filter.date.from,callback:function(e){t.$set(t.filter.date,"from",e)},expression:"filter.date.from"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("div",{staticClass:"col"},[a("q-select",{staticClass:"col",attrs:{value:t.convertedDate(t.filter.date.to),clearable:"",dense:"",filled:"",color:"purple-12",label:"Date: To"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{options:t.endDateOptions,minimal:""},model:{value:t.filter.date.to,callback:function(e){t.$set(t.filter.date,"to",e)},expression:"filter.date.to"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1),a("div",{staticClass:"q-mt-sm row q-gutter-sm"},t._l(["Q1","Q2","Q3","Q4"],(function(e){return a("q-btn",{key:e,staticClass:"text-bold",attrs:{round:"",outline:e!==t.selectedQuarter,size:"10px",color:"primary"},on:{click:function(a){t.selectedQuarter=t.selectedQuarter===e?"":e}}},[t._v("\n            "+t._s(e)+"\n          ")])})),1)],1)],1)]),a("q-separator",{staticClass:"q-mb-md"}),a("p",{staticClass:"text-center text-h5 text-bold"},[t._v("\n    "+t._s(t.title)+"\n  ")]),a("div",{staticClass:"flex justify-center full-width"},[a("vue-funnel-graph",{attrs:{height:t.height,width:t.width,labels:t.labels,values:t.values,colors:t.colors,"sub-labels":t.subLabels,direction:t.direction,"gradient-direction":t.gradientDirection,animated:!0,"display-percentage":!0}})],1)],1)},M=[],P=a("3456"),L={components:{VueFunnelGraph:P["a"],SelectWithFilter:Q["a"]},mixins:[v,m],data(){return{labels:["Leads","Qualified Leads","Proposal","Lost","Order Confirmation","Final Confirmation Order"],subLabels:[],values:[],colors:["#FFB178","#FF3C8E"],direction:"horizontal",gradientDirection:"horizontal",height:500,width:1e3}},computed:d()(d()({},Object(y["b"])(["roles","branchId"])),{},{title(){const t="Sales Funnel Conversion",{date:e,branchId:a,userId:s}=this.filter,r=e.from?"from "+this.convertedDate(e.from):"",n=e.to?"until "+this.convertedDate(e.to):"";let l=a?this.options.branch.find(t=>t.value===a):null;l=l?""+l.label:"";let o=s?this.options.salesConsultant.find(t=>t.value===s):null;return o=o?"for "+o.label:"",`${l} ${t} ${r} ${n} ${o}`}}),created(){var t=this;return i()((function*(){t.$q.loading.show(),yield t.populateData(),t.$q.loading.hide()}))()},methods:{isUserRole(t){return this.roles[0]===t},convertedDate(t){let e=t.split("/");return e=`${e[2]}/${e[1]}/${e[0]}`,e},getUserRole(t){const e=this.roles[0];return t.includes(e)},showBranchFilter(){const t=["sysadmin","hQManager","hQAccountant","hQsalessupport"];return this.getUserRole(t)},showSalesConsultantFilter(){const t=["sysadmin","branchManager","hQManager","hQAccountant","hQsalessupport"];return this.getUserRole(t)},startDateOptions(t){return t<this.filter.date.to},endDateOptions(t){return t>this.filter.date.from},populateData(){var t=this;return i()((function*(){const e=t.getFilter(t.filter),a=yield t.fetchNumCustomerSeries(e);t.updateChartLabel(a),t.values=a}))()},updateChartLabel(t){const[e,a,s,r,n,l]=t,o=t=>(100*t).toFixed(2)+"%";this.labels=[`Leads (${o(1)})`,`Qualified Leads (${o(a/e)})`,`Proposal (${o(s/a)})`,`Lost (${o(r/s)})`,"Order Confirmation",`Final Confirmation Order (${o(l/n)})`]},fetchNumCustomerSeries(t){var e=this;return i()((function*(){const a=yield e.fetchCustomerCount({filter:t}),s=yield e.fetchCustomerCount({state:"QL",filter:t}),r=yield e.fetchCustomerCount({state:"LD",filter:t}),n=yield e.fetchCustomerCount({state:"LD",status:"Lost",filter:t}),l=yield e.fetchFCOCount({where:t}),o=yield e.fetchFCOCount({where:d()({state:"FCO",status:"Production"},t)});return[a,s,r,n,l,o]}))()}}},j=L,N=(a("7ca6"),Object(O["a"])(j,S,M,!1,null,null,null)),R=N.exports,B={components:{DashboardCardsList:F,skSalesFunnelTableChart:A,skSalesFunnelConversionPyramidChart:R}},U=B,Y=Object(O["a"])(U,s,r,!1,null,null,null);e["default"]=Y.exports}}]);