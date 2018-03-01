<template>
  <div class="menu">
    <Menu theme="dark" :active-name="activeName" :open-names="openName" :accordion="true" width="auto" >
      <template v-for="(item,index) in routerList">
        <!--没有子菜单-->
        <router-link v-if="item.noDropDown" :to="item.path+'/'+item.children[0].path">
          <MenuItem :key="index" :name="item.path+'/'+item.children[0].path">
            <Icon v-if="item.icon" :type="item.icon"/>
            {{item.content}}
          </MenuItem>
        </router-link>
        <!--有子菜单-->
        <Submenu v-else :name="item.meta ? item.meta.menuIndex : item.name">
          <template slot="title">
            <Icon v-if="item.icon" :type="item.icon" style="margin-right: 6px"/>
            {{item.content}}
          </template>
          <template v-for="(cItem,cIndex) in item.children">
            <!--<menu-side v-if="cItem.children&&cItem.children.length>0" :routes="cItem.children"></menu-side>-->
            <router-link v-if="!cItem.hidden" :to="item.path+'/'+cItem.path">
              <MenuItem :key="cIndex" :name="item.path+'/'+cItem.path">{{cItem.content}}</MenuItem>
            </router-link>
          </template>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>

<script>
  import _ from 'underscore'
  import {routerMap} from '../../router'

  export default {
    name: 'MenuSide',
    props: {
      routes: {
        type: Array
      },
      spanSize: {
        type: Number
      }
    },
    data() {
      return {
        routerList: [],
        activeName: this.$route.path,
        openName: [this.$route.meta.menuIndex]
      }
    },
    computed: {
      iconSize () {
        return this.spanSize == 2 ? '' : ''
      }
    },
    created() {
      var _this = this;
      routerMap.forEach(value => {
        // 判断路由是否显示
        if (!value.hidden) {
          _this.routerList.push(value)
        }
      });
    },
    watch: {
      '$route': function (val, oldval) {
        this.activeName = val.path
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .menu {
    height:100%;
  }
</style>
