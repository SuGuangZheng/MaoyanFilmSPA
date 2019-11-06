/* eslint-disable */
//这部分代码其实就是在MessageBox这样的子文件夹里定义小组件，
//然后在这个根文件夹里的index.js里把这些小组件改为vue子类构造函数，
//再实例化并导出这些小组件
//不用export default就是因为这里可能有多个小组件，要分别导出，然后其他组件按需要引入
import Vue from "vue";
import MessageBox from "./MessageBox";
var defaults = {
    title: "",
    content: "",
    cancel: "",
    ok: "",
    handleCancel: null,
    handleoK: null
};
var MyComponent = Vue.extend(MessageBox);

var messageBox = function (opts) {
    // alert("gg");
    for (var attr in opts) {
        defaults[attr] = opts[attr];
    }

    var vm = new MyComponent({
        el: document.createElement("div"),
        data: {
            title: defaults.title,
            content: defaults.content,
            cancel: defaults.cancel,
            ok: defaults.ok
        },
        methods: {
            //切换城市，点击后跳转到城市选择页
            handleCancel() {
                //bind只是把handleCancel里的this绑定到外面的this，但不会执行handleCancel
                //call是立即执行handleCancel，且执行时把里面的this绑定到外面这个this。
                // defaults.handleCancel && defaults.handleCancel.bind(this);
                console.log(this);//此处的this指向当前这个vue组件(创建出来的对象，也就是vm)
                defaults.handleCancel && defaults.handleCancel.call(this);
                //如果调用者传进来了这个方法(又放在defaults里了)，就执行传进来的，再执行下面的
                document.body.removeChild(vm.$el);
            },
            handleOk() {
                defaults.handleOk && defaults.handleOk.call(this);
                document.body.removeChild(vm.$el);
            }
        } //methods结束
    });
    document.body.appendChild(vm.$el);
};

export   {messageBox};