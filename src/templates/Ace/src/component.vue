<template>
  <div class="ace-container">
    <div class="ace-editor"
         ref="ace"></div>

    <div class="config-panel"
         v-show="toggle">
      <div>
        <div class="item">
          <label class="title">语言</label>
          <el-select class="value"
                     v-model="modePath"
                     @change="handleModelPathChange"
                     size="mini"
                     value-key="name"
                     disabled>
            <el-option v-for="mode in modeMap"
                       :key="mode.name"
                       :label="mode.name"
                       :value="mode.path">
            </el-option>
          </el-select>
        </div>

        <div class="item">
          <label class="title">换行</label>
          <el-select class="value"
                     v-model="wrapValue"
                     @change="handleWrapChange"
                     size="mini"
                     value-key="name"
                     disabled>
            <el-option v-for="wrap in wrapMap"
                       :key="wrap.name"
                       :label="wrap.name"
                       :value="wrap.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="bookmarklet"
         @click="toggleConfigPanel"></div>
  </div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/text'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'

const themeMap = {
  ambiance: {
    name: 'ambiance',
    path: 'ace/theme/ambiance'
  },
  chaos: {
    name: 'chaos',
    path: 'ace/theme/chaos'
  },
  chrome: {
    name: 'chrome',
    path: 'ace/theme/chrome'
  },
  cloud9_day: {
    name: 'cloud9_day',
    path: 'ace/theme/cloud9_day'
  },
  cloud9_night_low_color: {
    name: 'cloud9_night_low_color',
    path: 'ace/theme/cloud9_night_low_color'
  },
  cloud9_night: {
    name: 'cloud9_night',
    path: 'ace/theme/cloud9_night'
  },
  clouds_midnight: {
    name: 'clouds_midnight',
    path: 'ace/theme/clouds_midnight'
  },
  clouds: {
    name: 'clouds',
    path: 'ace/theme/clouds'
  },
  cobalt: {
    name: 'cobalt',
    path: 'ace/theme/cobalt'
  },
  crimson_editor: {
    name: 'crimson_editor',
    path: 'ace/theme/crimson_editor'
  },
  dawn: {
    name: 'dawn',
    path: 'ace/theme/dawn'
  },
  dracula: {
    name: 'dracula',
    path: 'ace/theme/dracula'
  },
  dreamweaver: {
    name: 'dreamweaver',
    path: 'ace/theme/dreamweaver'
  },
  eclipse: {
    name: 'eclipse',
    path: 'ace/theme/eclipse'
  },
  github: {
    name: 'github',
    path: 'ace/theme/github'
  },
  gob: {
    name: 'gob',
    path: 'ace/theme/gob'
  },
  gruvbox_dark_hard: {
    name: 'gruvbox_dark_hard',
    path: 'ace/theme/gruvbox_dark_hard'
  },
  gruvbox_light_hard: {
    name: 'gruvbox_light_hard',
    path: 'ace/theme/gruvbox_light_hard'
  },
  gruvbox: {
    name: 'gruvbox',
    path: 'ace/theme/gruvbox'
  },
  idle_fingers: {
    name: 'idle_fingers',
    path: 'ace/theme/idle_fingers'
  },
  iplastic: {
    name: 'iplastic',
    path: 'ace/theme/iplastic'
  },
  katzenmilch: {
    name: 'katzenmilch',
    path: 'ace/theme/katzenmilch'
  },
  kr_theme: {
    name: 'kr_theme',
    path: 'ace/theme/kr_theme'
  },
  kuroir: {
    name: 'kuroir',
    path: 'ace/theme/kuroir'
  },
  merbivore_soft: {
    name: 'merbivore_soft',
    path: 'ace/theme/merbivore_soft'
  },
  merbivore: {
    name: 'merbivore',
    path: 'ace/theme/merbivore'
  },
  mono_industrial: {
    name: 'mono_industrial',
    path: 'ace/theme/mono_industrial'
  },
  monokai: {
    name: 'monokai',
    path: 'ace/theme/monokai'
  },
  nord_dark: {
    name: 'nord_dark',
    path: 'ace/theme/nord_dark'
  },
  one_dark: {
    name: 'one_dark',
    path: 'ace/theme/one_dark'
  },
  pastel_on_dark: {
    name: 'pastel_on_dark',
    path: 'ace/theme/pastel_on_dark'
  },
  solarized_dark: {
    name: 'solarized_dark',
    path: 'ace/theme/solarized_dark'
  },
  solarized_light: {
    name: 'solarized_light',
    path: 'ace/theme/solarized_light'
  },
  sqlserver: {
    name: 'sqlserver',
    path: 'ace/theme/sqlserver'
  },
  terminal: {
    name: 'terminal',
    path: 'ace/theme/terminal'
  },
  textmate: {
    name: 'textmate',
    path: 'ace/theme/textmate'
  },
  tomorrow_night_blue: {
    name: 'tomorrow_night_blue',
    path: 'ace/theme/tomorrow_night_blue'
  },
  tomorrow_night_bright: {
    name: 'tomorrow_night_bright',
    path: 'ace/theme/tomorrow_night_bright'
  },
  tomorrow_night_eighties: {
    name: 'tomorrow_night_eighties',
    path: 'ace/theme/tomorrow_night_eighties'
  },
  tomorrow_night: {
    name: 'tomorrow_night',
    path: 'ace/theme/tomorrow_night'
  },
  tomorrow: {
    name: 'tomorrow',
    path: 'ace/theme/tomorrow'
  },
  twilight: {
    name: 'twilight',
    path: 'ace/theme/twilight'
  },
  vibrant_ink: {
    name: 'vibrant_ink',
    path: 'ace/theme/vibrant_ink'
  },
  xcode: {
    name: 'xcode',
    path: 'ace/theme/xcode'
  }
}

const wrapMap = {
  open: {
    name: '开启',
    value: true
  },
  close: {
    name: '关闭',
    value: false
  }
}

const modeMap = {
  JavaScript: {
    name: 'JavaScript',
    path: 'ace/mode/javascript'
  },
  HTML: {
    name: 'HTML',
    path: 'ace/mode/html'
  },
  CSS: {
    name: 'CSS',
    path: 'ace/mode/css'
  },
  SCSS: {
    name: 'SCSS',
    path: 'ace/mode/scss'
  },
  JSON: {
    name: 'JSON',
    path: 'ace/mode/json'
  },
  Java: {
    name: 'Java',
    path: 'ace/mode/java'
  },
  Text: {
    name: 'Text',
    path: 'ace/mode/text'
  }
}

export default {
  name: 'Ace',
  props: {
    value: String,
    readOnly: Boolean,
    theme: {
      type: String,
      default: 'monokai'
    },
    mode: {
      type: String,
      default: 'JavaScript'
    },
    wrap: {
      type: String,
      default: 'open'
    }
  },
  data () {
    return {
      aceEditor: null,
      toggle: false,
      wrapValue: wrapMap[this.wrap].value,
      themePath: themeMap[this.theme].path,
      modePath: modeMap[this.mode].path,
      modeMap: modeMap,
      wrapMap: wrapMap
    }
  },
  computed: {
    disabled () {
      return this.readOnly
    }
  },
  watch: {
    value (newVal) {
      if (this.readOnly) {
        this.aceEditor.getSession().setValue(newVal)
      }
    }
  },
  mounted () {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 20,
      minLines: 10,
      fontSize: 14,
      value: this.value ? this.value : '',
      theme: this.themePath,
      mode: this.modePath,
      wrap: this.wrapValue,
      tabSize: 4,
      readOnly: this.readOnly
    })
    // 激活自动提示
    this.aceEditor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    })
    this.aceEditor.getSession().on('change', this.change)
  },
  methods: {
    toggleConfigPanel () {
      this.toggle = !this.toggle
    },
    changeTheme () {
      this.aceEditor.setTheme('ace/theme/twilight')
    },
    change () {
      this.$emit('input', this.aceEditor.getSession().getValue())
    },
    handleModelPathChange (modelPath) {
      this.aceEditor.getSession().setMode(modelPath)
    },
    handleWrapChange (wrap) {
      this.aceEditor.getSession().setUseWrapMode(wrap)
    }
  }
}
</script>

<style lang='scss' scoped>
.ace-container {
  position: relative;

  .config-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100%;
    overflow: auto;
    box-shadow: grey -5px 2px 3px;
    background-color: rgba(0, 0, 0, 0.63);
    z-index: 1;

    .item {
      margin: 10px auto;
      text-align: center;

      .title {
        color: white;
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }

  .bookmarklet {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    z-index: 2;
    cursor: pointer;
    border-width: 9px;
    border-style: solid;
    border-color: lightblue gray gray rgb(206, 173, 230);
    border-image: initial;
  }
}
</style>
