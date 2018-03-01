<template>
  <div class="nav-bar-box">
    <Breadcrumb separator=">">
      <BreadcrumbItem v-for="(item,index) in navBarList" :key="item.path"
                      :href="index === navBarList.length - 1 ? null : (item.redirect||item.path)">
        {{routerNameMap[item.name]}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  import {routerMap} from '../../router'
  export default {
    name: 'NavBar',
    data () {
      return {
        navBarList: null,
        routerNameMap: {index: '首页'}
      }
    },
    created() {
      this.updateBreadcrumb()
    },
    methods: {
      updateBreadcrumb(){
        this.eachChild(routerMap);
        let matched = this.$route.matched.filter(item => item.name && item.path !== item.path+'/index');
        const first = matched[0];
        if (first && (first.name !== 'index' || first.path !== '')) {
          matched = [{name: 'index', path: '/'}].concat(matched)
        }
        this.navBarList = matched;
      },
      eachChild (map) {
        map.forEach(item => {
            item.content && (this.routerNameMap[item.name] = item.content);
            if(item.children && item.children.length > 1){
              this.eachChild(item.children)
            }
        })
      }
    },
    watch: {
      $route(){
        this.updateBreadcrumb()
      }
    }
  }
</script>
