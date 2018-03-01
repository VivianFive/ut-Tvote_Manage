<style>
  .draft-container {
    border: 1px dashed #000000;
    padding: 10px;
    margin-bottom: 50px;
    box-sizing: border-box;
  }
  .com-wrap{
    display: flex;
    flex-wrap:wrap ;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

</style>
<template>
  <div id="draftResolution">
    <div class="draft-container">
      <Form>
        <!--<div class="com-justify-between">-->
        <FormItem>
          <div class="com-wrap">
            <div class="data-title">
              <span style="padding: 10px 12px 10px 0">创建时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data)=>{draftPrams.startTime = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span>至</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data)=>{draftPrams.endTime = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="data-search">
              <Input v-model="draftPrams.name" placeholder="用户ID/提案ID/提案名称" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="提案状态：">
          <RadioGroup type="button" v-model="statusSelect" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <template v-for="(item,index) in typeAndStatus.statusList">
              <Radio :label="item.value">{{item.name}}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
        <br>
        <FormItem label="提案类型：">
          <RadioGroup type="button" v-model="styleSelect" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <template v-for="(item,index) in typeAndStatus.typeList">
              <Radio :label="item.value">{{item.name}}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
        <br>
        <FormItem label="待佐证提案：">
          <span style="color:red;">（{{draftMngCount}}）</span>
        </FormItem>
      </Form>
    </div>
    <Table border stripe :columns="columns1" :data="draftResultList"></Table>
    <div style="margin: 20px 0 250px">
      <div style="float: right;">
        <Page :current.sync="currentPageNum" :total="pageTotal" show-total show-elevator show-sizer @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) => pageChange(n,0)"></Page>
      </div>
    </div>
    <!--平局modal-->
    <Modal v-model="dogfallModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>平局公示</span>
      </p>
      <div>
        <RadioGroup v-model="dogfallRadio" vertical>
          <template v-for="option in dogfallOptions">
            <Radio :label="option.id">
              <Icon type="android-list"></Icon>
              <span>{{option.content}}(票数：{{ option.totalTicket }})</span>
            </Radio>
          </template>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="dogfallPublicity">公示</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {draftMngListData,draftMngEvidenceCount,proposalMngStatusAndType,publicity,proposalInfo} from '@/api';
  import moment from 'moment';
  let pid, pIndex;
  export default {
    name:'draftRsoult',
    data(){
      return {
        statusSelect: 'all', //提案状态
        styleSelect: 'all', //提案类型
        typeAndStatus: {}, //类型和状态列表
        draftPrams:{
          name:'',//搜索
          status:'',//状态
          type:'',//类型
          startTime:'',
          endTime:'',
          offset:0,
          limit:10,
          sort: 'endTime',
          order: 'desc'
        },
        pageTotal:0, //总条数
        currentPageNum:1, //当前页数
        draftResultList:[],//列表
        draftMngCount:0, //待佐证
        dogfallOptions: [], // 平局选项
        dogfallModal: false,
        dogfallRadio: '',
        modal_loading: false,
        columns1: [
          {
            title: '序号',
            key: 'serialNumber',
            type:'index',
            width:'80',
          },
          {
            title: '提案ID',
            key: 'id'
          },
          {
            title: '发起用户（ID）',
            key: 'userPhone'
          },
          {
            title: '提案名称',
            key: 'title'
          },
          {
            title: '结束时间',
            key: 'endTime',
            render: (h,params) => moment(params.row.endTime).format("YYYY-MM-DD HH:mm")
          },{
            title: '提案类型',
            key: 'typeName'
          },
          {
            title: '提案状态',
            key: 'statusName'
          },
          {
            title: '操作',
            key: 'edit',
            render:(h,params) => {
              let EditArr = [];
                  EditArr.push(
                    h('router-link',{
                      props:{
                        to: '/draftResolution/draftEdit?proposalId='+params.row.id
                      },
                      style: {
                        marginRight:'5px'
                      }
                    },'编辑'),
                  );
              if(params.row.type == 1 && params.row.status == 7){
                EditArr.push(
                  h('router-link',{
                    props:{
                      to:'/draftResolution/draftProof?proposalId='+params.row.id
                    },
                    style:{
                      marginRight:'5px'
                    }
                  },'佐证'),
                );
              }
              if(params.row.type == 0 && params.row.status == 7){
                EditArr.push(
                  h('a',{
                    attrs: {
                      href: 'javascript:;'
                    },
                    style:{
                      marginRight:'5px'
                    },
                    on: {
                      'click': () => this.publicityHandle(params.row, params.index)
                    }
                  },'公示')
                )
              }
              EditArr.push(
                h('router-link',{
                  props: {
                    to:'/draftResolution/draftInfo?proposalId='+params.row.id
                  },
                  style:{
                    marginRight:'5px'
                  }
                },'查看')
              );
              return h('div',EditArr)
            }
          }
        ],
      }
    },
    created (){
      this.$Spin.show();
      //this.draftMngList();
      //带佐证信息
      //this.draftMngEvidence()
      Promise.all([this.draftMngEvidence(),this.getProposalStatus()]).then(() => {this.$Spin.hide();}).catch(() => this.$Spin.hide());
    },
    methods:{
      //提案列表
      draftMngList(){
        this.statusSelect !='all' ? (this.draftPrams.status = this.statusSelect):this.draftPrams.status ='';
        this.styleSelect !='all' ? (this.draftPrams.type = this.styleSelect) : this.draftPrams.type='';
        return draftMngListData(this.draftPrams).then(res => {
          this.draftResultList = res.data.rows;
          this.pageTotal = res.data.total;
        })
      },
      //待佐证数量
      draftMngEvidence(){
        return draftMngEvidenceCount({}).then(res => {
          this.draftMngCount = res.data.count;
        })
      },
      //提案状态
      getProposalStatus () {
        return new Promise((resolve, reject) => {
          proposalMngStatusAndType().then(res => {
            this.typeAndStatus = res.data;
            let $route = this.$route.query.status;
            if($route && $route === 'over'){
              let statusList = res.data.statusList;
              statusList.forEach((e) => {(e.name === '已结束') && (this.statusSelect = e.value)});
              this.draftMngList().then(() => resolve()).catch(err => reject(err));
            }else {
              this.draftMngList().then(() => resolve()).catch(err => reject(err));
            }
          })
        })
      },
      //分页
      pageChange(n,t){
        t ? this.draftPrams.offset = n-1 : this.draftPrams.limit = n;
        this.draftPrams.offset = this.draftPrams.offset * this.draftPrams.limit;
        this.draftMngList();
      },
      //过滤查询
      filterHandle () {
        //重置页码
        this.draftPrams.offset = 0;
        this.draftPrams.limit = 10;
        this.currentPageNum = 1;
        this.draftMngList();
      },
      // 全民公决公示
      publicityHandle (row,index) {
        let result;
        let resultPromise = proposalInfo({id: row.id}).then(res => {
          // 判断是否平局
          let maxTicket = 0, maxIndex, optionList = res.data.optionList;
          // 找出最大票数
          optionList.forEach((option, i, optionArr) => {
            if(option.totalTicket && option.totalTicket > maxTicket){
              maxTicket = option.totalTicket;
              maxIndex = i;
            }
          });
          //
          let maxOption = optionList.splice(maxIndex, 1);
          // 查找是否有与最大票数相等票数
          let sameOption =  optionList.filter(op => (op.totalTicket && op.totalTicket == maxTicket));
//          let isDogfall = optionList.some(option => (option.totalTicket && option.totalTicket == maxTicket));
          if (sameOption.length > 0) {
            this.dogfallOptions = [...sameOption, ...maxOption]
          }
          return sameOption.length > 0;
        });
        this.$Modal.confirm({
          title: '操作确认',
          content: `确认立即公示提案《${row.title}》？`,
          onOk: () => {
            resultPromise.then(result => {
              pid = row.id;
              pIndex = index;
              if(result) {
                this.dogfallModal = true;
              } else {
                this.publicity();
              }
            });
            /*publicity({proposalId: row.id, winOptionId: ''}).then(res => {
              this.$Message.success('公示成功！');
//              row.statusValue = 8;
              this.draftResultList.splice(index, 1);
            })*/
          }
        });

      },
      publicity(oId = '') {
        publicity({proposalId: pid, winOptionId: oId}).then(res => {
          this.$Message.success('公示成功！');
          this.draftResultList.splice(pIndex, 1);
        })
      },
      dogfallPublicity() {
        if (!this.dogfallRadio) {
          this.$Message.error('请选择一个选项！');
          return;
        }
        this.publicity(this.dogfallRadio);
      }
    }
  }
</script>
