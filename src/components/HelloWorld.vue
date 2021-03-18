<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <div id="example">
      <p>函数调用测试，点击：{{ game }}</p>
      <!-- v-on:click的冒号不能有空格，否则无效 -->
      <!-- v-on:click绑定事件，这里选择的是鼠标单击 -->
      <button v-on:click="btn_click('我的世界', 1)">我的世界</button>
      <button v-on:click="btn_click('魂斗罗2', 2)">魂斗罗2</button>
      <button v-on:click="btn_click('忍者神龟', 3)">忍者神龟</button>
      <!-- @ 就是 v-on: 这五个字符组合的缩写 -->
      <button @click="btn_click('蜜蜂大战', 4)">蜜蜂大战</button>
    </div>

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha"
          target="_blank"
          rel="noopener"
          >unit-mocha</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    btn_click: function (game_name, index) {
      this.game = game_name;
      // console.log(this.game);
      //调用OC已经注册好的方法
      if (index == 1) {
        this.$bridge.callhandler(
          "invokeNativeByH5",
          { methodName: "ocMethodName1", params: { name: game_name } },
          (data) => {}
        );
      }

      if (index == 2) {
        this.$bridge.callhandler(
          "invokeNativeByH5",
          { methodName: "ocMethodName2", params: { name: game_name } },
          (data) => {}
        );
      }

      //提供方法<'JS Echo'>给OC调用
      /*
                data sample :{
                            	params = {
	                              name = Tom;
                              };
	                            methodName = ocMethodName;
                              }
                */
      this.$bridge.registerhandler(
        "invokeH5ByNative",
        (data, responseCallback) => {
          responseCallback({ msg:data ,timeToEat: "饺子" });
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
