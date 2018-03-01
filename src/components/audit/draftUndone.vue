<style>

</style>
<template>
  <div id="draftUndone">
    <div class="filter-container">
      <Form>
        <FormItem>
          <div class="filter-header">
            <div class="date-filter">
              <span style="padding: 10px 12px 10px 0">创建时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="startTimeChange" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span> 至 </span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="endTimeChange" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="search-filter">
              <Input placeholder="用户ID/提案名称、ID" v-model="filterReq.name" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="提案类型：" :inline="true">
          <RadioGroup type="button" v-model="typeRadio" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <template v-for="(item,index) in typeList">
              <Radio :label="item.value">{{item.name}}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <draft-table :tableData="tableData" tableType="undone"></draft-table>
    <div style="margin: 10px;text-align: right">
      <div style="display: inline-block">
        <Page :current.sync="currentPageNum" :total="tableData.total" @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) => pageChange(n,0)" :page-size-opts="[10,20,30]" show-elevator show-sizer></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import draftTable from '@/components/audit/draftTable'
  import { noneList } from '@/api'
    export default {
      components: {
        draftTable
      },
      props: {
        typeList: {
          type: Array
        }
      },
      data() {
        return {
          tableData: {},
          typeRadio: 'all',
          currentPageNum:1, //当前页数
          filterReq: {
            limit: 10, //每页条数
            offset: 0, //当前页
            sort: 'updateTime', //排序列
            order: 'desc', //排序方式
            startTime: '', //开始时间
            endTime: '', //结束时间
            name: '', //提案名称
            type: '' //提案类型
          }
        }
      },
      created () {
        this.getProposalList();
      },
      methods: {
        //提案列表
        getProposalList () {
          this.typeRadio !== 'all' ? (this.filterReq.type = this.typeRadio) : this.filterReq.type = '';
          noneList(this.filterReq).then(res => {
            this.tableData = res.data
          })
        },
        //改变页数
        pageChange (n,t) {
          t ? this.filterReq.offset = n-1  : this.filterReq.limit = n;
          this.filterReq.offset = this.filterReq.offset * this.filterReq.limit;
          this.getProposalList()
        },
        //过滤查询
        filterHandle () {
          //重置页码
          this.filterReq.offset = 0;
          this.filterReq.limit = 10;
          this.currentPageNum = 1;
          this.getProposalList();
        },
        //
        startTimeChange (date) {
          this.filterReq.startTime = date;
        },
        endTimeChange (date) {
          this.filterReq.endTime = date;
        }
      }
    }
</script>
