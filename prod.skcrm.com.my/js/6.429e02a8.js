(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"80ab":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"fullscreen column text-black"},[t._m(0),o("div",{staticClass:"col item-centers text-center q-pa-md flex flex-center"},[o("div",[o("form",{ref:"myForm",staticClass:"q-col-gutter-y-md"},[o("q-input",{ref:"loginid",attrs:{outlined:"",standout:"",label:"Login ID",error:t.$v.form.loginId.$error,"error-message":"Login ID is required."},model:{value:t.form.loginId,callback:function(e){t.$set(t.form,"loginId","string"===typeof e?e.trim():e)},expression:"form.loginId"}}),o("q-input",{ref:"password",attrs:{outlined:"",standout:"",label:"Password",color:"text-white",type:t.type,"bottom-slots":""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.login(e)}},scopedSlots:t._u([{key:"append",fn:function(){return[o("q-btn",{attrs:{round:"",flat:"",icon:"remove_red_eye"},on:{click:t.onClickShowPassword}})]},proxy:!0}]),model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),o("div",{staticClass:"q-gutter-sm"},[o("q-btn",{attrs:{color:"primary","text-color":"white",label:"Sign In","no-caps":""},on:{click:t.login}}),o("q-btn",{attrs:{color:"primary","text-color":"primary",outline:"",unelevated:"",label:"Forgot Password","no-caps":""},on:{click:t.forgot}}),o("q-icon",{staticStyle:{"font-size":"2em",color:"#ccc"},attrs:{name:"fa fa-question-circle"}},[o("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle",offset:[10,10]}},[o("div",[t._v("\n                  Admins will receive an email and will contact you for further action after you've clicked forgot password\n                ")])])],1)],1)],1)])])])])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row item-centers text-center flex flex-center"},[r("img",{attrs:{src:o("8e75")}})])}],s=o("c973"),i=o.n(s),a=o("b5ae"),l={name:"Login",data(){return{form:{loginId:"",password:""},type:"password"}},validations:{form:{loginId:{required:a["required"]},password:{required:a["required"],minLength:Object(a["minLength"])(4)}}},methods:{login(){this.$v.form.$touch(),this.$store.dispatch("Login",this.form).then(t=>{this.$router.push({path:"/"})}).catch(t=>{console.log(t),this.$notify("error","The login ID and password that you entered did not match our records. Please double check and try again")})},forgot(){var t=this;return i()((function*(){t.$v.form.$touch(),t.form.loginId.length>0?t.$store.dispatch("ForgetPassword",t.form.loginId).then(e=>{t.$notify("success","System Admin has been notified and will contact you soon")}).catch(e=>{console.log(e),t.$notify("error","No user found with login id "+t.form.loginId)}):t.$notify("error","Please insert login ID")}))()},onClickShowPassword(){"password"===this.type?this.type="text":this.type="password"}}},c=l,d=o("2877"),f=Object(d["a"])(c,r,n,!1,null,null,null);e["default"]=f.exports},"8e75":function(t,e,o){t.exports=o.p+"img/sigkit-xs.67eacf44.png"}}]);